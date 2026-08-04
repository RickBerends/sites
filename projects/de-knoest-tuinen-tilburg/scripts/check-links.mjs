#!/usr/bin/env node
// Build-time internal link checker.
// Crawls dist/ for built HTML files, extracts internal href/src attributes,
// and fails the build (non-zero exit) if any resolve to a missing file.
// External links (http/https/mailto/tel), pure fragments, and data: URIs are skipped.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');

/** Read the configured Astro `base` so root-relative links resolve correctly
 * against the dist/ folder (which itself represents the site served at that
 * base path). Falls back to '/' if it can't be determined. */
async function readConfiguredBase() {
  try {
    const configPath = path.join(projectRoot, 'astro.config.mjs');
    const contents = await fs.readFile(configPath, 'utf8');
    const match = contents.match(/base\s*:\s*['"]([^'"]+)['"]/);
    if (match) {
      let base = match[1];
      if (!base.startsWith('/')) base = `/${base}`;
      if (!base.endsWith('/')) base = `${base}/`;
      return base;
    }
  } catch {
    // ignore, fall back below
  }
  return '/';
}

async function findHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
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
  while ((match = attrRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function shouldSkip(link) {
  if (!link) return true;
  if (link.startsWith('#')) return true;
  if (link.startsWith('//')) return true; // protocol-relative external
  if (/^[a-z][a-z0-9+.-]*:/i.test(link)) return true; // http(s):, mailto:, tel:, data:, javascript:
  return false;
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveCandidate(targetPath) {
  // targetPath is an absolute filesystem path with no query/fragment.
  if (await pathExists(targetPath)) {
    const stat = await fs.stat(targetPath);
    if (stat.isDirectory()) {
      return pathExists(path.join(targetPath, 'index.html'));
    }
    return true;
  }
  // No extension and doesn't exist as-is: try common fallbacks.
  if (!path.extname(targetPath)) {
    if (await pathExists(`${targetPath}.html`)) return true;
    if (await pathExists(path.join(targetPath, 'index.html'))) return true;
  }
  return false;
}

async function main() {
  if (!(await pathExists(distDir))) {
    console.error(`check-links: dist/ not found at ${distDir}. Run "npm run build" first.`);
    process.exit(1);
  }

  const base = await readConfiguredBase();
  const htmlFiles = await findHtmlFiles(distDir);

  if (htmlFiles.length === 0) {
    console.error('check-links: no HTML files found in dist/.');
    process.exit(1);
  }

  const broken = [];

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, 'utf8');
    const links = extractLinks(html);
    const fileDir = path.dirname(file);

    for (const rawLink of links) {
      if (shouldSkip(rawLink)) continue;

      // Strip query string and fragment.
      const withoutFragment = rawLink.split('#')[0];
      const withoutQuery = withoutFragment.split('?')[0];
      if (!withoutQuery) continue; // was just "#frag" or "?query"

      let candidatePath;
      if (withoutQuery.startsWith('/')) {
        // Root-relative: resolve against dist/, stripping the configured base.
        let rel = withoutQuery;
        if (base !== '/' && rel.startsWith(base)) {
          rel = rel.slice(base.length);
        } else {
          rel = rel.replace(/^\/+/, '');
        }
        candidatePath = path.join(distDir, rel);
      } else {
        // Relative to the current file's directory.
        candidatePath = path.join(fileDir, withoutQuery);
      }

      const exists = await resolveCandidate(candidatePath);
      if (!exists) {
        broken.push({
          source: path.relative(distDir, file),
          link: rawLink,
        });
      }
    }
  }

  if (broken.length > 0) {
    console.error(`check-links: found ${broken.length} broken internal link(s):\n`);
    for (const { source, link } of broken) {
      console.error(`  ${source}  ->  ${link}`);
    }
    process.exit(1);
  }

  console.log(`check-links: OK — scanned ${htmlFiles.length} HTML file(s), no broken internal links.`);
}

main().catch((err) => {
  console.error('check-links: unexpected error', err);
  process.exit(1);
});
