#!/usr/bin/env node
/**
 * build-index.mjs — generate the repo-root directory page listing every
 * project under projects/<slug>/, linking to its deployed subpath.
 *
 * Run as part of the deploy workflow (writes into the gh-pages publish dir,
 * never committed to main — it's a derived build artifact, same treatment
 * as dist/). Scans the full projects/ tree each run, not just whatever the
 * workflow rebuilt this time, so it always reflects everything live.
 *
 * Usage: node scripts/build-index.mjs > site/index.html
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(repoRoot, 'projects');

const IDENTITY_LABEL = {
  A: 'Crafted Masculine',
  B: 'Soft Boutique',
  C: 'Editorial Food',
  D: 'Premium Natural',
  E: 'Warm Regional',
};

function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

async function loadProject(slug) {
  const dir = path.join(projectsDir, slug);
  const configPath = path.join(dir, 'site.config.json');
  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    const cfg = JSON.parse(raw);
    return {
      slug,
      name: cfg.name || titleCaseFromSlug(slug),
      identity: cfg.identity || null,
      draft: cfg.draft !== false,
    };
  } catch {
    // Older projects that predate site.config.json — list them anyway.
    return { slug, name: titleCaseFromSlug(slug), identity: null, draft: null };
  }
}

async function main() {
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });
  const slugs = entries
    .filter((e) => e.isDirectory() && e.name !== 'one-pager-template' && e.name !== 'test-site-tmp')
    .map((e) => e.name)
    .sort();

  const projects = await Promise.all(slugs.map(loadProject));
  projects.sort((a, b) => a.name.localeCompare(b.name, 'nl'));

  const liveCount = projects.filter((p) => p.draft === false).length;

  const rows = projects
    .map((p, i) => {
      const idx = String(i + 1).padStart(3, '0');
      const category = p.identity ? IDENTITY_LABEL[p.identity] || p.identity : '—';
      const status =
        p.draft === false
          ? '<span class="dot dot-live"></span>live'
          : p.draft === true
            ? '<span class="dot dot-draft"></span>concept'
            : '<span class="dot dot-unknown"></span>—';
      return `      <tr data-name="${p.name.toLowerCase()}">
        <td class="c-idx">${idx}</td>
        <td class="c-status">${status}</td>
        <td class="c-name"><a href="./${p.slug}/">${p.name}</a></td>
        <td class="c-cat">${category}</td>
        <td class="c-slug">${p.slug}</td>
      </tr>`;
    })
    .join('\n');

  const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>sites — manifest</title>
<style>
  :root {
    color-scheme: dark light;
    --bg: #10130f; --surface: #171b17; --surface-2: #1d221d; --border: #2a302a;
    --text: #e7ebe6; --muted: #8b9389; --faint: #5b6259;
    --accent: #6fbf9e; --accent-ink: #06140d;
    --live: #6fbf9e; --draft: #d7b56a; --unknown: #6a6f68;
    --mono: ui-monospace, "Cascadia Code", "SF Mono", Consolas, "Liberation Mono", monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #f3f5f1; --surface: #ffffff; --surface-2: #edf0ea; --border: #d9ddd3;
      --text: #14170f; --muted: #565e51; --faint: #8a9083;
      --accent: #2f8f68; --accent-ink: #ffffff;
      --live: #2f8f68; --draft: #97701f; --unknown: #9aa093;
    }
  }
  :root[data-theme="dark"] {
    --bg: #10130f; --surface: #171b17; --surface-2: #1d221d; --border: #2a302a;
    --text: #e7ebe6; --muted: #8b9389; --faint: #5b6259;
    --accent: #6fbf9e; --accent-ink: #06140d;
    --live: #6fbf9e; --draft: #d7b56a; --unknown: #6a6f68;
  }
  :root[data-theme="light"] {
    --bg: #f3f5f1; --surface: #ffffff; --surface-2: #edf0ea; --border: #d9ddd3;
    --text: #14170f; --muted: #565e51; --faint: #8a9083;
    --accent: #2f8f68; --accent-ink: #ffffff;
    --live: #2f8f68; --draft: #97701f; --unknown: #9aa093;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--bg); color: var(--text); font-family: var(--sans);
    padding: 56px 20px 96px;
  }
  .wrap { max-width: 920px; margin: 0 auto; }

  .masthead { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-bottom: 1px solid var(--border); padding-bottom: 18px; margin-bottom: 6px; }
  .masthead h1 {
    font-family: var(--mono); font-size: 1.05rem; font-weight: 600; letter-spacing: 0.04em;
    text-transform: uppercase; margin: 0; color: var(--text);
  }
  .masthead .tally { font-family: var(--mono); font-size: 0.85rem; color: var(--muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .masthead .tally b { color: var(--accent); font-weight: 600; }
  p.sub { color: var(--muted); font-size: 0.92rem; margin: 14px 0 28px; max-width: 62ch; line-height: 1.55; }

  .toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
  .toolbar label { font-family: var(--mono); font-size: 0.72rem; color: var(--faint); text-transform: uppercase; letter-spacing: 0.06em; }
  input#filter {
    flex: 1; padding: 10px 12px; font-size: 0.88rem; font-family: var(--mono);
    border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text);
  }
  input#filter:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
  input#filter::placeholder { color: var(--faint); }

  table { width: 100%; border-collapse: collapse; margin-top: 22px; font-size: 0.92rem; }
  thead th {
    text-align: left; font-family: var(--mono); font-size: 0.68rem; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--faint); font-weight: 500; padding: 0 10px 10px;
    border-bottom: 1px solid var(--border);
  }
  tbody tr { border-bottom: 1px solid var(--border); transition: background 120ms ease; }
  tbody tr:hover { background: var(--surface-2); }
  tbody td { padding: 11px 10px; vertical-align: middle; }
  .c-idx { font-family: var(--mono); color: var(--faint); font-variant-numeric: tabular-nums; width: 3em; }
  .c-status { font-family: var(--mono); font-size: 0.8rem; color: var(--muted); white-space: nowrap; width: 6.5em; }
  .c-name a { color: var(--text); text-decoration: none; font-weight: 500; }
  .c-name a:hover { color: var(--accent); text-decoration: underline; }
  .c-cat { color: var(--muted); font-size: 0.85rem; white-space: nowrap; }
  .c-slug { font-family: var(--mono); color: var(--faint); font-size: 0.78rem; text-align: right; white-space: nowrap; }

  .dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 7px; vertical-align: middle; position: relative; top: -1px; }
  .dot-live { background: var(--live); box-shadow: 0 0 0 2px color-mix(in srgb, var(--live) 25%, transparent); }
  .dot-draft { background: var(--draft); }
  .dot-unknown { background: var(--unknown); }

  .empty { display: none; color: var(--faint); font-family: var(--mono); font-size: 0.85rem; padding: 32px 0; text-align: center; }

  @media (max-width: 640px) {
    .c-cat, .c-slug { display: none; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="masthead">
      <h1>sites // manifest</h1>
      <span class="tally"><b>${projects.length}</b> shipped · <b>${liveCount}</b> live</span>
    </div>
    <p class="sub">Elke rij is een losstaande one-pager in deze monorepo, gebouwd via <code>new-site.mjs</code> en gedeployed naar zijn eigen subpad. Concept = MVP-link, nog niet door de klant bevestigd.</p>
    <div class="toolbar">
      <label for="filter">grep</label>
      <input id="filter" type="text" placeholder="filter op naam…" autocomplete="off" />
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>status</th>
          <th>project</th>
          <th>categorie</th>
          <th>slug</th>
        </tr>
      </thead>
      <tbody id="rows">
${rows}
      </tbody>
    </table>
    <p class="empty" id="empty">geen resultaten</p>
  </div>
  <script>
    const input = document.getElementById('filter');
    const rows = Array.from(document.querySelectorAll('#rows tr'));
    const empty = document.getElementById('empty');
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      let visible = 0;
      for (const row of rows) {
        const match = row.dataset.name.includes(q);
        row.style.display = match ? '' : 'none';
        if (match) visible++;
      }
      empty.style.display = visible === 0 ? '' : 'none';
    });
  </script>
</body>
</html>
`;

  process.stdout.write(html);
}

main();
