#!/usr/bin/env node
// Build-time internal link checker.
// Crawls dist/ HTML files, extracts internal href/src attributes, and fails
// (non-zero exit) if any resolve to a file that doesn't exist in dist/.
// External links, mailto:, tel:, and hash-only anchors are skipped.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');

if (!existsSync(distDir)) {
  console.error(`check-links: no dist/ directory found at ${distDir}. Run "npm run build" first.`);
  process.exit(1);
}

// Read the configured `base` from astro.config.mjs so absolute links that
// include it can be resolved back to files under dist/.
const configSrc = readFileSync(join(projectRoot, 'astro.config.mjs'), 'utf8');
const baseMatch = configSrc.match(/base:\s*['"]([^'"]*)['"]/);
let base = baseMatch ? baseMatch[1] : '';
if (base && !base.startsWith('/')) base = `/${base}`;
if (base.endsWith('/')) base = base.slice(0, -1); // normalize, re-add below

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk(distDir);
if (htmlFiles.length === 0) {
  console.error('check-links: no HTML files found in dist/.');
  process.exit(1);
}

const attrPattern = /\s(?:href|src)\s*=\s*["']([^"']+)["']/gi;
let brokenCount = 0;
let checkedCount = 0;

function isExternal(link) {
  return (
    /^[a-z][a-z0-9+.-]*:/i.test(link) && !link.startsWith('/') // scheme:... (http:, mailto:, tel:, data:, etc.)
  ) || link.startsWith('//');
}

function resolveToDistPath(link) {
  // Strip hash and query.
  let clean = link.split('#')[0].split('?')[0];
  if (clean === '') return null; // pure hash/query-only link, nothing to check

  let relative = clean;
  if (base && relative.startsWith(base)) {
    relative = relative.slice(base.length);
  }
  if (!relative.startsWith('/')) {
    // Relative link — treat as unsupported for this simple checker; skip.
    return null;
  }
  // Directory-style (trailingSlash: 'always') → index.html
  if (relative.endsWith('/')) {
    relative = `${relative}index.html`;
  }
  return join(distDir, relative);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  let match;
  while ((match = attrPattern.exec(html)) !== null) {
    const link = match[1];
    if (!link || link.startsWith('#') || isExternal(link)) continue;

    const targetPath = resolveToDistPath(link);
    if (!targetPath) continue;

    checkedCount += 1;
    const exists = existsSync(targetPath) && statSync(targetPath).isFile();
    if (!exists) {
      brokenCount += 1;
      const relFile = file.slice(distDir.length + 1);
      console.error(`Broken internal link in ${relFile}: "${link}" -> missing ${targetPath.slice(distDir.length + 1)}`);
    }
  }
}

console.log(`check-links: checked ${checkedCount} internal link(s) across ${htmlFiles.length} file(s).`);

if (brokenCount > 0) {
  console.error(`check-links: ${brokenCount} broken internal link(s) found.`);
  process.exit(1);
}

console.log('check-links: all internal links resolve. OK.');
