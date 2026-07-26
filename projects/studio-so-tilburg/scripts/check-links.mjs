#!/usr/bin/env node
// Build-time internal link checker.
// Crawls dist/**/*.html, extracts internal href/src links, and fails
// (non-zero exit) if any resolve to a missing file in dist/.
//
// "Internal" = same-origin: root-relative paths, relative paths, and
// anything under the configured `base`. External links (http(s)://, //,
// mailto:, tel:), pure in-page anchors (#foo), and data: URIs are skipped.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { globSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');

if (!existsSync(distDir)) {
  console.error(`check-links: dist/ not found at ${distDir}. Run "npm run build" first.`);
  process.exit(1);
}

// Read the configured `base` out of astro.config.mjs so root-relative
// production links (e.g. /sites/studio-so-tilburg/foo) resolve correctly
// against the dist/ folder, which is NOT nested under that base on disk.
function readBase() {
  const configPath = join(projectRoot, 'astro.config.mjs');
  const src = readFileSync(configPath, 'utf8');
  const match = src.match(/base:\s*['"`]([^'"`]+)['"`]/);
  if (!match) return '/';
  let base = match[1];
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

const base = readBase();

const htmlFiles = globSync('**/*.html', { cwd: distDir }).map((f) => join(distDir, f));

const ATTR_RE = /\s(?:href|src)=["']([^"']+)["']/gi;

/** @type {{file: string, link: string, reason: string}[]} */
const failures = [];
let checked = 0;

function isExternalOrSkippable(link) {
  if (!link) return true;
  if (link.startsWith('#')) return true; // pure in-page anchor
  if (link.startsWith('mailto:')) return true;
  if (link.startsWith('tel:')) return true;
  if (link.startsWith('data:')) return true;
  if (link.startsWith('javascript:')) return true;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(link)) return true; // http(s):// etc.
  if (link.startsWith('//')) return true; // protocol-relative
  return false;
}

function stripQueryAndHash(link) {
  return link.split('#')[0].split('?')[0];
}

/** Resolve an internal link to a file path under dist/, or null if it
 * doesn't map into dist/ cleanly (which we also treat as a failure). */
function resolveToDistPath(link, htmlFileDir) {
  let clean = stripQueryAndHash(link);
  if (clean === '') return null; // e.g. "#" or "?x=1" only

  if (clean.startsWith('/')) {
    if (base !== '/' && clean.startsWith(base)) {
      clean = clean.slice(base.length);
    } else if (base !== '/') {
      // Root-relative link that does NOT include the configured base —
      // this is exactly the "forgot the base segment" bug the build
      // playbook warns about. Treat as broken.
      return { broken: true };
    } else {
      clean = clean.slice(1);
    }
    return { path: join(distDir, clean) };
  }

  // Relative link — resolve against the directory of the HTML file that
  // contains it.
  return { path: resolve(htmlFileDir, clean) };
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const htmlFileDir = dirname(file);
  let m;
  while ((m = ATTR_RE.exec(html)) !== null) {
    const link = m[1];
    if (isExternalOrSkippable(link)) continue;

    checked += 1;
    const resolved = resolveToDistPath(link, htmlFileDir);
    if (!resolved) continue;

    if (resolved.broken) {
      failures.push({
        file: relative(distDir, file),
        link,
        reason: `root-relative link is missing the configured base "${base}"`,
      });
      continue;
    }

    let target = normalize(resolved.path);
    let exists = existsSync(target) && statSync(target).isFile();

    if (!exists && (link.endsWith('/') || !/\.[a-z0-9]+$/i.test(clean(link)))) {
      // trailingSlash: 'always' — directory-style links map to index.html
      const asIndex = join(target, 'index.html');
      if (existsSync(asIndex) && statSync(asIndex).isFile()) {
        exists = true;
      }
    }

    if (!exists) {
      failures.push({
        file: relative(distDir, file),
        link,
        reason: `resolved path not found in dist/: ${relative(distDir, target)}`,
      });
    }
  }
}

function clean(link) {
  return stripQueryAndHash(link);
}

if (failures.length > 0) {
  console.error(`check-links: ${failures.length} broken internal link(s) found (checked ${checked}):\n`);
  for (const f of failures) {
    console.error(`  - [${f.file}] "${f.link}" — ${f.reason}`);
  }
  process.exit(1);
}

console.log(`check-links: OK — ${checked} internal link(s) checked across ${htmlFiles.length} HTML file(s), 0 broken.`);
