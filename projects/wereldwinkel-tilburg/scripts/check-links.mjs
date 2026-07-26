#!/usr/bin/env node
/**
 * Build-time internal link checker.
 *
 * Crawls every .html file in dist/, extracts internal href/src references,
 * and fails (non-zero exit) if any resolve to a missing file on disk.
 * External links (http/https to another host, mailto:, tel:) are skipped.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

// Root-relative links are emitted with the configured `base` prefix (e.g.
// /sites/wereldwinkel-tilburg/...), but dist/ itself is unprefixed — strip it
// before resolving against disk.
const { default: astroConfig } = await import(
  pathToFileURL(path.resolve(__dirname, '..', 'astro.config.mjs')).href
);
const base = (astroConfig.base ?? '/').replace(/\/+$/, ''); // no trailing slash

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function extractLinks(html) {
  const links = [];
  const attrRegex = /\s(?:href|src)=["']([^"']+)["']/g;
  let match;
  while ((match = attrRegex.exec(html))) {
    links.push(match[1]);
  }
  return links;
}

function isInternal(link) {
  if (!link) return false;
  if (link.startsWith('#')) return false; // in-page anchor
  if (link.startsWith('mailto:') || link.startsWith('tel:')) return false;
  if (link.startsWith('//')) return false; // protocol-relative external
  if (/^[a-z][a-z0-9+.-]*:/i.test(link)) return false; // any other scheme (http:, https:, javascript:, data:)
  return true; // root-relative or relative path
}

function resolveTarget(link, htmlFilePath) {
  // Strip query string / hash fragment from a path-based link.
  const clean = link.split(/[?#]/)[0];
  if (clean === '') return null;

  let targetPath;
  if (clean.startsWith('/')) {
    const withoutBase = base && clean.startsWith(base + '/')
      ? clean.slice(base.length)
      : base && clean === base
        ? '/'
        : clean;
    targetPath = path.join(distDir, withoutBase);
  } else {
    targetPath = path.resolve(path.dirname(htmlFilePath), clean);
  }
  return targetPath;
}

async function resolves(targetPath) {
  if (existsSync(targetPath)) {
    const s = await stat(targetPath);
    if (s.isDirectory()) {
      // Directory: Astro with trailingSlash 'always' emits index.html inside.
      return existsSync(path.join(targetPath, 'index.html'));
    }
    return true;
  }
  // Trailing-slash-less internal links to a page directory (e.g. /foo -> /foo/index.html)
  if (existsSync(targetPath + '.html')) return true;
  if (existsSync(path.join(targetPath, 'index.html'))) return true;
  return false;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error(`check-links: dist/ not found at ${distDir}. Run "npm run build" first.`);
    process.exit(1);
  }

  const htmlFiles = await findHtmlFiles(distDir);
  if (htmlFiles.length === 0) {
    console.error('check-links: no .html files found in dist/.');
    process.exit(1);
  }

  const broken = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const links = extractLinks(html).filter(isInternal);

    for (const link of links) {
      const target = resolveTarget(link, file);
      if (!target) continue;
      if (!(await resolves(target))) {
        broken.push({ file: path.relative(distDir, file), link });
      }
    }
  }

  if (broken.length > 0) {
    console.error(`check-links: found ${broken.length} broken internal link(s):\n`);
    for (const b of broken) {
      console.error(`  ${b.file}  ->  ${b.link}`);
    }
    process.exit(1);
  }

  console.log(`check-links: OK — scanned ${htmlFiles.length} HTML file(s), no broken internal links.`);
}

main().catch((err) => {
  console.error('check-links: unexpected error', err);
  process.exit(1);
});
