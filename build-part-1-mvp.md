# Build — Part 1: MVP as a project in the sites monorepo

**Goal of this part:** go from nothing to a **working, public URL a client can
click** — `https://<owner>.github.io/<sites-repo>/<slug>/` — as fast as possible.
It's the cheapest way to turn a conversation into something real: a one-page
Astro site, deployed by CI on every push, that renders the agreed sections.

**Two structural rules that changed the framework (read first):**

1. **Monorepo, not one repo per client.** Every site is a folder under
   `projects/<slug>/` inside a single **sites monorepo**. One repo, one
   `.github/` workflow, one GitHub Pages deployment; each project gets its own
   subpath URL. (Layout in §1.)
2. **Only in git — never scattered local folders.** The working copy *is* a clone
   of the monorepo. Everything you create lives inside that repo and is committed
   and pushed. Do **not** build sites in loose `Desktop/<something>` folders that
   aren't tracked. If it isn't in git, it doesn't exist.

**What Part 1 deliberately leaves out** (all of it lives in
[`./build-part-2-live.md`](./build-part-2-live.md)):
- No custom domain (the `github.io/<sites-repo>/<slug>/` link *is* the deliverable
  here).
- No Cloudflare (no CDN, SSL config, security headers, or analytics yet).
- **No CMS.** Content is committed in git and edited by a developer. Letting a
  non-technical client edit is Part 2's job (Decap CMS).

Think of Part 1 as the **proof of concept the client signs off on** at the review
step, and Part 2 as **launch + handoff**. Server-side/LLM features are out of
scope in both.

Placeholders: `<owner>` (GitHub account, e.g. `RickBerends`), `<sites-repo>` (the
monorepo, e.g. `sites`), `<slug>` (kebab-case project folder).

---

## 1. The monorepo layout

One repo holds the framework *and* every client site:

```
<sites-repo>/                 # the git repo — clone it, work inside it, push
  .github/
    workflows/
      deploy.yml              # ONE workflow; builds only changed projects (§6)
  .claude/
    settings.json
    skills/                   # orchestration · intake-research ·
                              # visual-identity · lovable-page
  orchestration.md            # the playbooks live at the repo root
  build-part-1-mvp.md
  build-part-2-live.md
  projects/
    amigos-shop-tilburg/      # a full, independent Astro project
      package.json
      package-lock.json
      astro.config.mjs
      src/
      scripts/check-links.mjs
    <next-client>/
  README.md
```

- **Each `projects/<slug>/` is independent** — its own `package.json`, its own
  `node_modules`, its own build. You can `cd projects/<slug>` and develop it in
  isolation exactly like a standalone repo.
- **A single GitHub Action** (§6) detects which projects changed on a push and
  **builds only those**, publishing them into the `gh-pages` branch under
  `<slug>/` — untouched projects stay live.
- **Each project gets its own URL:** `https://<owner>.github.io/<sites-repo>/<slug>/`.
  (On a custom domain later: `https://<domain>/<slug>/`, or a per-project domain —
  see build-part-2.)

**When this stack fits** (unchanged): a **single-page presence** (hero → a few
sections → contact) as a fast proof of concept; near-zero budget (free GitHub +
Pages); no live server yet. Multi-page sites, blogs, and catalogs are a
*follow-on* upsell, not part of this playbook.

---

## 2. Prerequisites

- [ ] The **sites monorepo** cloned locally (`git clone` of
      `<owner>/<sites-repo>`). All work happens **inside this clone** — nothing
      lives outside git (rule #2 above). If the monorepo doesn't exist yet, create
      it once: scaffold the layout in §1, `git init`, and
      `gh repo create <sites-repo> --private --source=. --push`.
- [ ] Node.js LTS installed locally.
- [ ] The **section list** for the one page decided — normally the output of the
      `lovable-page` skill (which sections) + `visual-identity` skill (the look),
      both seeded by the `intake-research` brief. This drives the content model in
      §5; you can't write the schema without it.

Not needed yet (Part 2): a domain, a registrar, a Cloudflare account, Decap.

**Automation mechanism (no GitHub MCP server needed).** There is no GitHub MCP
connector installed; the repo/Pages steps run through the **authenticated `gh`
CLI** (`gh auth status` should show a logged-in account — currently
`RickBerends`). An autonomous run needs no per-command approval because the build
tooling is pre-authorized in [`.claude/settings.json`](./.claude/settings.json):
`defaultMode: acceptEdits` plus an allow-list for `gh`, `git`, `npm`, `npx`,
`node`, `mkdir`, `WebSearch`, `WebFetch`, and the Claude Browser tools. Its
`additionalDirectories` points at the **monorepo clone** (not `Desktop`), so all
writes land in-repo. If you clone this framework elsewhere, that file travels with
it — verify `gh` is authenticated, Node is installed, and the run is prompt-free.
(One residual: the in-app browser may still show a one-time per-origin card the
first time it visits a new domain, e.g. Google Maps during intake — that's a
browsing-policy gate, not a settings permission.)

---

## 3. Scaffold a new project inside the monorepo

Create the site **as a folder in `projects/`**, never as a loose top-level
project:

```bash
# from the monorepo root
npm create astro@latest projects/<slug> -- --template minimal --no-git --yes
cd projects/<slug>
npm install @astrojs/sitemap
```

(`--no-git` matters — the monorepo is already a git repo; a nested repo would
break it.)

Recommended `package.json` scripts (per project):

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check-links": "node scripts/check-links.mjs"
  }
}
```

Per-project layout (content-collection driven; one component per section):

```
projects/<slug>/
  astro.config.mjs
  package.json
  src/
    content/            # home.md — the single page's content (edited in git for now)
    content.config.ts   # zod schema for the one page (see §5)
    pages/
      index.astro       # the one-pager; renders sections from home.md
      404.astro
    components/          # one component per section (Hero, Trust, Services…)
    styles/global.css    # design tokens from the visual-identity skill
  scripts/              # build-time helpers (link checker, etc.)
  public/
    robots.txt
```

(`public/admin/` for the CMS is added in Part 2 — leave it out for now.)

`astro.config.mjs` for the monorepo Pages URL:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://<owner>.github.io',
  base: '/<sites-repo>/<slug>',   // BOTH segments — repo AND project. See gotcha.
  trailingSlash: 'always',
  integrations: [sitemap()],
});
```

**Gotcha (the #1 cause of broken MVP links):** GitHub Pages serves the monorepo
under `https://<owner>.github.io/<sites-repo>/`, and each project lives one level
deeper at `/<slug>/`. So `base` **must** be `/<sites-repo>/<slug>` — *both*
segments. A standalone repo only needed `/<repo-name>`; the monorepo needs the
project slug too. Forgetting the second segment produces broken asset paths and
404s on the live link even though `npm run dev` looked fine. (In Part 2, when a
per-project custom domain is wired via Cloudflare Pages, `base` flips to `/` and
both segments go away.)

---

## 4. Navigation & images (MVP level)

- **Navigation** is smooth-scroll anchors to section IDs on the same page — no
  routing, so no extra `base`-subpath surprises beyond §3.
- **Images:** use Astro's built-in `astro:assets` (`<Image>` / `<Picture>` on
  files in `src/assets/`) for responsive sizes + modern formats at build time.
  For the MVP, images are committed to the repo like any other content. Source
  them per the `visual-identity` and `lovable-page` imagery priority (owner →
  business → customers → products → details; never obvious stock).

---

## 5. Design + content model (where the two design skills land)

A one-pager is **one page made of sections**. Before writing the schema, settle
*look* and *structure*:

- **`visual-identity` skill** → picks identity A/B/C for the business category and
  emits the design tokens (palette, two fonts, radii, motion) into
  `src/styles/global.css`. Every component inherits these — one accent, two fonts,
  restrained motion.
- **`lovable-page` skill** → decides which sections exist and writes the copy
  (hero, trust strip, services as outcomes, about, social proof, location, hours,
  contact), seeded from the `intake-research` brief. Its section list *is* the
  schema below.

Model the whole page as **one data file** rather than folder collections. (The
copy is seeded from the intake brief, shaped by `lovable-page`, then confirmed
with the client.) At MVP there are **two** places to keep in sync (Part 2 adds a
third — the CMS config):

1. **Astro's schema** (`src/content.config.ts`) — validates the page's data.
   Extend it to the lovable-page sections (trust, hours, phone, testimonials):

   ```ts
   import { defineCollection, z } from 'astro:content';
   import { glob } from 'astro/loaders';

   const page = defineCollection({
     loader: glob({ pattern: 'home.md', base: './src/content' }),
     schema: z.object({
       hero_heading: z.string(),
       hero_sub: z.string(),
       trust: z.array(z.string()).max(4).optional(),
       about: z.string(),
       services: z.array(z.object({ title: z.string(), body: z.string() })),
       testimonials: z.array(z.object({
         name: z.string(), rating: z.number().optional(), quote: z.string(),
       })).optional(),                    // only via a compliant intake path
       hours: z.array(z.object({ day: z.string(), open: z.string() })).optional(),
       phone: z.string().optional(),
       whatsapp: z.string().optional(),
       contact_email: z.string().email().optional(),  // often a gap — keep optional
       address: z.string().optional(),
     }),
   });

   export const collections = { page };
   ```

2. **The markdown file** (`src/content/home.md`) — the content that
   `src/pages/index.astro` reads to render each section. For the MVP a developer
   edits this directly; it's committed to git.

**Never invent a field value.** Testimonials, ratings, and `contact_email` are
frequently unavailable — keep them **optional** and leave a flagged gap rather
than fabricating (mirrors the `intake-research` and `lovable-page` rules).

**Design the schema now so Part 2's CMS attaches without reshaping it.** Decap
(Part 2) just writes the same `home.md` a developer would — a clean schema here
means the CMS drops in later with no data migration.

**Growth path (out of scope):** a blog or catalog later is where folder-based
collections and extra pages come in — quote it as a follow-on, not part of the
one-pager.

---

## 6. Deploy the monorepo to GitHub Pages (build only what changed)

The whole monorepo shares **one** workflow. It detects which `projects/<slug>`
changed on a push, builds only those, and publishes them into a **`gh-pages`
branch** under `<slug>/`. Untouched projects are preserved (`keep_files: true`),
so shipping one client never rebuilds or risks the others.

**One-time repo setup** (Pages served from the `gh-pages` branch, not the Actions
artifact — the branch model is what lets us keep unchanged projects):

```bash
# from the monorepo root, after the first commit is pushed to main
gh repo create <sites-repo> --private --source=. --remote=origin --push   # once
# point Pages at the gh-pages branch root.
# NOTE: on Git Bash / MSYS, DROP the leading slash on the API path or the shell
# rewrites it into a Windows path ("invalid API endpoint C:/Program Files/...").
gh api --method POST repos/<owner>/<sites-repo>/pages \
  -f 'source[branch]=gh-pages' -f 'source[path]=/' \
  || gh api --method PUT repos/<owner>/<sites-repo>/pages \
       -f 'source[branch]=gh-pages' -f 'source[path]=/'
```

(The `gh-pages` branch is created by the first successful deploy run; you may need
to run the workflow once before the `pages` API accepts that branch.)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy changed sites to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      all:
        description: 'Rebuild every project (ignore change detection)'
        type: boolean
        default: false
permissions:
  contents: write          # peaceiris pushes to the gh-pages branch
concurrency:
  group: pages-deploy
  cancel-in-progress: false
jobs:
  detect:
    runs-on: ubuntu-latest
    outputs:
      slugs: ${{ steps.set.outputs.slugs }}
      any: ${{ steps.set.outputs.any }}
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - id: set
        run: |
          if [ "${{ github.event_name }}" = "workflow_dispatch" ] && [ "${{ inputs.all }}" = "true" ]; then
            slugs=$(ls -d projects/*/ 2>/dev/null | sed 's#projects/##; s#/##' \
              | jq -R . | jq -sc 'map(select(length>0))')
          else
            base='${{ github.event.before }}'
            if [ -z "$base" ] || ! git cat-file -e "${base}^{commit}" 2>/dev/null; then
              base=$(git rev-list --max-parents=0 HEAD | tail -1)   # first push
            fi
            slugs=$(git diff --name-only "$base" '${{ github.sha }}' -- projects/ \
              | awk -F/ 'NF>=2 {print $2}' | sort -u \
              | jq -R . | jq -sc 'map(select(length>0))')
          fi
          echo "slugs=$slugs" >> "$GITHUB_OUTPUT"
          if [ "$slugs" = "[]" ] || [ -z "$slugs" ]; then
            echo "any=false" >> "$GITHUB_OUTPUT"
          else
            echo "any=true"  >> "$GITHUB_OUTPUT"
          fi
  build-deploy:
    needs: detect
    if: needs.detect.outputs.any == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - name: Build each changed project
        run: |
          mkdir -p site
          for slug in $(echo '${{ needs.detect.outputs.slugs }}' | jq -r '.[]'); do
            echo "::group::build $slug"
            ( cd "projects/$slug" \
              && npm ci \
              && npm run build \
              && node scripts/check-links.mjs )
            mkdir -p "site/$slug"
            cp -r "projects/$slug/dist/." "site/$slug/"
            echo "::endgroup::"
          done
      - name: Publish to gh-pages (keep untouched projects)
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
          keep_files: true         # projects not in ./site survive from prior deploys
```

Notes:
- **`keep_files: true`** is what makes "build only changed" safe on a single Pages
  site — the deploy overlays the changed `<slug>/` folders onto whatever is
  already on `gh-pages`.
- **Force a full rebuild** (e.g. after a shared change) with
  `gh workflow run "Deploy changed sites to GitHub Pages" -f all=true`, then
  `gh run watch "$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status`.
- When CI goes green, the changed site is live at
  `https://<owner>.github.io/<sites-repo>/<slug>/`. **That URL is the Part 1
  deliverable** — share it for review.

---

## 7. MVP quality bar (keep it lean)

Enough polish that the link doesn't embarrass you at review — no more. The full
SEO/a11y/security gate is Part 2.

- **Build clean:** `npm run build` runs with no errors locally and in CI.
- **A real 404** (`src/pages/404.astro`), on-brand, not the default.
- **Basic `<head>`:** a `<title>`, a meta description, and the mobile viewport
  meta so it looks right on a phone.
- **Internal link checker** (`scripts/check-links.mjs`) crawls built `dist/` and
  fails the build on broken internal links.
- **`robots.txt`** + the `@astrojs/sitemap` integration from §3. While a project
  is an unratified draft, keep `robots.txt` Disallow-all + a `noindex` meta.
- **Design + conversion sanity:** the `visual-identity` tokens are actually
  applied (one accent, two fonts) and the `lovable-page` conversion checklist
  passes at a glance (hero answers who/what/where, a CTA appears more than once).

Deferred to Part 2: Open Graph/Twitter cards, JSON-LD, security headers, and the
Lighthouse/pa11y performance+accessibility budget.

---

## 8. Part 1 verification checklist

- [ ] Everything lives under `projects/<slug>/` in the monorepo — no loose local
      folders outside git.
- [ ] `npm run build` is clean locally, no errors.
- [ ] Push to `main` → the workflow detects `<slug>` as changed → CI green
      end-to-end.
- [ ] `https://<owner>.github.io/<sites-repo>/<slug>/` loads (no broken assets —
      if assets 404, re-check the two-segment `base` in §3).
- [ ] Other projects in the monorepo are still live (change detection +
      `keep_files` did their job).
- [ ] Every section renders from `home.md`; anchor links scroll correctly.
- [ ] Looks right on desktop **and** mobile viewport; identity tokens applied.
- [ ] 404 page is on-brand.

Meet these and you have a workable GitHub link to share.

---

## Handoff to Part 2 (what changes when going live)

When the client signs off on the MVP and you move to
[`./build-part-2-live.md`](./build-part-2-live.md), these things change:
- **`base` flips** from `/<sites-repo>/<slug>` to `/` and `site` becomes the real
  domain — done per-project by graduating that project onto **Cloudflare Pages**
  (root directory = `projects/<slug>`), which is how a monorepo gives one client
  their own custom domain (build-part-2 §5/§8).
- **Cloudflare** goes in front for DNS, SSL, CDN, security headers, analytics.
- **Decap CMS** is added (`public/admin/`) so the client edits `home.md`
  themselves — this is where the two-file sync of §5 becomes a **three-file**
  sync rule.
- The quality bar is raised to the **full** SEO/a11y/security gate.
