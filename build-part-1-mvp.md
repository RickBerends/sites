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
  BUILD.md                    # the build hot path — start here
  orchestration.md            # the playbooks live at the repo root
  build-part-1-mvp.md
  build-part-2-live.md
  templates/
    one-pager/                # the master project every site is copied from
  scripts/
    new-site.mjs              # templates/one-pager → projects/<slug>
  projects/
    amigos-shop-tilburg/      # a full, independent Astro project
      site.config.json
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
- [ ] The **identity letter** (A/B/C) chosen from the business category —
      `visual-identity` skill. The generator takes it as `--identity`.
- [ ] The **section list** for the one page decided — `lovable-page` skill,
      seeded by the `intake-research` brief. It's now a `sections` array in
      `site.config.json` rather than something that shapes the schema, so it is
      cheap to change later.

Not needed yet (Part 2): a domain, a registrar, a Cloudflare account, Decap.

**Automation mechanism (no GitHub MCP server needed).** There is no GitHub MCP
connector installed; the repo/Pages steps run through the **authenticated `gh`
CLI** (`gh auth status` should show a logged-in account — currently
`RickBerends`). An autonomous run needs no per-command approval because the build
tooling is pre-authorized in [`.claude/settings.json`](./.claude/settings.json):
`defaultMode: acceptEdits` plus an allow-list for `gh`, `git`, `npm`, `npx`,
`node`, `mkdir`, `WebSearch`, `WebFetch`, and the browser tools. Its
`additionalDirectories` is `["."]` — the monorepo clone itself, whatever machine
it sits on — so all writes land in-repo and the file travels with the repo. If you
clone this framework elsewhere, verify `gh` is authenticated, Node is installed,
and the run is prompt-free.
(One residual: the in-app browser may still show a one-time per-origin card the
first time it visits a new domain, e.g. Google Maps during intake — that's a
browsing-policy gate, not a settings permission.)

---

## 3. Scaffold a new project inside the monorepo

**This is now one command.** `templates/one-pager/` is a complete, buildable
Astro project; `scripts/new-site.mjs` copies it into `projects/<slug>/` and
rewrites the handful of things that differ per site.

```bash
# from the monorepo root
node scripts/new-site.mjs <slug> --identity=B --name="Business Name"
```

See [`./BUILD.md`](./BUILD.md) for the flags and the full five-step path. Do not
hand-scaffold with `npm create astro` any more — the five sites built that way
each re-derived the same ~1,100 lines and drifted on all of them (different token
names, five separate link checkers, five different schemas, and two sites that
silently shipped without their webfonts).

Per-project layout, for orientation:

```
projects/<slug>/
  site.config.json    # slug · name · lang · identity · draft · sections · strings
  astro.config.mjs
  package.json
  src/
    content/home.md   # THE file you write — the business's words
    content.config.ts # the canonical schema (§5)
    config.ts         # hasSection(), telHref(), whatsappHref()
    layouts/BaseLayout.astro
    pages/            # index.astro · 404.astro
    components/       # one per section
    styles/           # tokens.css + identity-<a|b|c>.css + global.css
  scripts/check-links.mjs
  public/robots.txt
```

(`public/admin/` for the CMS is added in Part 2 — leave it out for now.)

### The two-segment `base` gotcha (why the generator writes that line)

GitHub Pages serves the monorepo under `https://<owner>.github.io/<sites-repo>/`,
and each project lives one level deeper at `/<slug>/`. So `base` **must** be
`/<sites-repo>/<slug>` — *both* segments. A standalone repo only needed
`/<repo-name>`. Forgetting the second segment produces broken asset paths and
404s on the live link even though `npm run dev` looked fine.

This was the #1 cause of broken MVP links, which is exactly why
`scripts/new-site.mjs` generates it rather than trusting anyone to type it. It is
written as a literal string because `scripts/check-links.mjs` reads it back with a
regex to resolve root-relative links against `dist/`.

(In Part 2, when a per-project custom domain is wired via Cloudflare Pages,
`base` flips to `/` and both segments go away.)

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

## 5. Design + content model

A one-pager is **one page made of sections**, and both the sections and the
schema now ship with the template.

- **`visual-identity` skill** → picks identity A/B/C for the category. The
  palettes, fonts, radii and motion live in
  `templates/one-pager/src/styles/identity-a|b|c.css` — those files *are* the
  identities. Pass the letter to the generator (`--identity=B`); never hand-write
  tokens. Token *names* are shared and live in `tokens.css`.
- **`lovable-page` skill** → writes the copy. All eight sections exist already;
  `sections` in `site.config.json` decides which render, so "if a section doesn't
  increase trust, remove it" is a config edit, not a code edit.

**The schema is canonical — don't fork it.** It lives at
`templates/one-pager/src/content.config.ts` and is a superset of the five
hand-written schemas that preceded it. Adding a field for a genuine business need
is fine; renaming an existing one is not. Decap (Part 2) writes this same
`home.md`, so one stable schema means one CMS config instead of one per client.

At MVP there are **two** places to keep in sync (Part 2 adds a third — the CMS
config): the schema, and `src/content/home.md` itself.

**Never invent a field value.** Testimonials, ratings, `contact_email`, `phone`
and `address` are optional precisely because they are frequently unavailable —
delete the field and flag the gap rather than fabricating. `testimonials` also
carries a `testimonials_source` field: if you cannot name a compliant path (live
embed / client-permissioned quotes / fresh testimonials, per `intake-research`
§2b), you should not be publishing the quotes.

**Growth path (out of scope):** a blog or catalog later is where folder-based
collections and extra pages come in — quote it as a follow-on, not part of the
one-pager.

---

## 6. Deploy the monorepo to GitHub Pages (build only what changed)

The whole monorepo shares **one** workflow, already live at
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). Read that file
rather than a copy of it here — a YAML block duplicated into a playbook is a
YAML block that goes stale.

What it does: on a push to `main` it diffs `projects/` to find which `<slug>`
changed, builds only those (`npm ci && npm run build && node
scripts/check-links.mjs`), and publishes them into the **`gh-pages` branch** under
`<slug>/` with `keep_files: true`, so untouched projects survive from prior
deploys. `workflow_dispatch` with `all=true` forces a full rebuild.

Because `templates/` and `scripts/` sit **outside** `projects/`, changing the
template never triggers a rebuild of any client site.

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

The template already carries most of this — these come free with a generated
project and only need re-checking if you've edited the relevant file:

- **A real 404** (`src/pages/404.astro`), on-brand, not the default.
- **Basic `<head>`:** `<title>`, meta description, mobile viewport meta.
- **Internal link checker** (`scripts/check-links.mjs`) crawls built `dist/` and
  fails the build on broken internal links.
- **`robots.txt`** Disallow-all + `noindex` while `draft: true` in
  `site.config.json`, plus the `@astrojs/sitemap` integration.
- **Identity tokens applied** — one accent, two fonts, and the fonts actually
  load, because the `@import` ships inside the identity CSS file.

What still needs your eyes:

- **Build clean:** `npm run build` and `npm run check-links` pass locally and in CI.
- **Conversion sanity:** the `lovable-page` checklist passes at a glance — the
  hero answers who/what/where, and a CTA appears more than once.
- **Nothing invented:** every fact on the page traces to the intake brief. This is
  the one check no script can do for you.

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
