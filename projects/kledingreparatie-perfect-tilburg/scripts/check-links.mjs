#!/usr/bin/env node
// Build-time internal link checker (build-part-1-mvp.md §7).
//
// Crawls every built HTML file in dist/, extracts internal href/src
// attributes, and fails the build (non-zero exit) if any of them resolve to
// a file that doesn't exist in dist/. External links (http(s)://, mailto:,
// tel:, protocol-relative), anchors (#...), and non-navigable schemes
// (javascript:, data:) are skipped.

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, extname, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');

if (!existsSync(distDir)) {
  console.error(`check-links: dist/ not found at ${distDir}. Run "npm run build" first.`);
  process.exit(1);
}

// dist/ only contains this project's own files, but every emitted URL is
// prefixed with astro.config.mjs's `base` (both the sites-repo segment and
// the project slug — see build-part-1-mvp.md §3). Strip that prefix before
// resolving a URL path against files on disk.
let basePrefix = '';
const configPath = join(projectRoot, 'astro.config.mjs');
if (existsSync(configPath)) {
  const configSrc = readFileSync(configPath, 'utf8');
  const match = configSrc.match(/base\s*:\s*(['"])(.*?)\1/);
  if (match) {
    basePrefix = match[2];
    if (!basePrefix.startsWith('/')) basePrefix = '/' + basePrefix;
    if (basePrefix.endsWith('/')) basePrefix = basePrefix.slice(0, -1);
  }
}

function stripBase(urlPath) {
  if (basePrefix && (urlPath === basePrefix || urlPath.startsWith(basePrefix + '/'))) {
    const stripped = urlPath.slice(basePrefix.length);
    return stripped.startsWith('/') ? stripped : '/' + stripped;
  }
  return urlPath;
}

/** Recursively collect all files under a directory. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const allFiles = walk(distDir);
const htmlFiles = allFiles.filter((f) => extname(f) === '.html');

// Build a lookup of files that exist in dist/, normalized to forward slashes,
// relative to distDir.
const existingFiles = new Set(
  allFiles.map((f) => f.slice(distDir.length).split(sep).join('/'))
);

function fileExistsForUrlPath(urlPath) {
  // urlPath begins with '/'
  let candidate = urlPath;
  if (existingFiles.has(candidate)) return true;

  // Directory-style URL (trailingSlash: 'always') -> index.html
  if (candidate.endsWith('/')) {
    if (existingFiles.has(candidate + 'index.html')) return true;
  } else {
    // Maybe it's a directory without trailing slash
    if (existingFiles.has(candidate + '/index.html')) return true;
    // Maybe it's an extensionless page that maps to candidate/index.html
    if (existingFiles.has(candidate + '.html')) return true;
  }
  return false;
}

const attrPattern = /\s(?:href|src)\s*=\s*("([^"]*)"|'([^']*)')/gi;

const broken = [];
let checkedCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const fileUrlPath = file.slice(distDir.length).split(sep).join('/');

  let match;
  attrPattern.lastIndex = 0;
  while ((match = attrPattern.exec(html)) !== null) {
    const raw = (match[2] ?? match[3] ?? '').trim();
    if (!raw) continue;

    // Skip anything that isn't an internal, navigable, path-based link.
    if (raw.startsWith('#')) continue;
    if (raw.startsWith('//')) continue; // protocol-relative external
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) continue; // has a scheme (http:, mailto:, tel:, javascript:, data:, etc.)

    checkedCount++;

    let urlPath;
    if (raw.startsWith('/')) {
      urlPath = raw;
    } else {
      // Relative link — resolve against the current file's directory.
      const currentDir = dirname(fileUrlPath);
      urlPath = resolve(currentDir, raw).split(sep).join('/');
    }

    // Strip query string / hash fragment, and the base-path prefix.
    urlPath = urlPath.split('#')[0].split('?')[0];
    if (!urlPath) continue;
    urlPath = stripBase(urlPath);

    if (!fileExistsForUrlPath(urlPath)) {
      broken.push({ file: fileUrlPath, link: raw, resolved: urlPath });
    }
  }
}

if (broken.length > 0) {
  console.error(`check-links: found ${broken.length} broken internal link(s):\n`);
  for (const b of broken) {
    console.error(`  ${b.file}  ->  "${b.link}"  (resolved: ${b.resolved})`);
  }
  process.exit(1);
}

console.log(`check-links: OK — ${checkedCount} internal link(s) checked across ${htmlFiles.length} HTML file(s), 0 broken.`);
