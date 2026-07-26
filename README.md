# Sites monorepo — client one-pagers + the framework that builds them

One git repo holds **the framework** (playbooks + skills) and **every client
site** (`projects/<slug>/`). One GitHub Action builds only the projects that
changed and publishes each to its own subpath. Nothing lives outside git.

## Layout

```
.github/workflows/deploy.yml   # builds only changed projects → gh-pages branch
.claude/
  settings.json                # pre-authorized build tooling (gh/git/npm/node…)
  skills/
    orchestration/             # the top-level engagement runbook (SKILL → md)
    intake-research/           # business name → sourced content brief
    visual-identity/           # category → colours/fonts/motion (the look)
    lovable-page/              # sections + trust-building copy (the structure)
BUILD.md                       # the build hot path — start here
orchestration.md               # full engagement pipeline (Phases 0–10)
build-part-1-mvp.md            # the *why* behind the build (layout, quality bar)
build-part-2-live.md           # custom domain (Cloudflare Pages) + Decap CMS
templates/
  one-pager/                   # the master project every site is copied from
scripts/
  new-site.mjs                 # templates/one-pager → projects/<slug>
projects/
  <slug>/                      # a full, independent Astro one-pager
README.md
```

## Two operating rules

1. **Monorepo, not one repo per client.** Add a site as `projects/<slug>/`. The
   shared workflow (`.github/workflows/deploy.yml`) detects the change, builds
   only that project, and keeps the others live (`keep_files: true`).
2. **Only in git.** The working copy is a clone of this repo; commit and push
   everything. No loose local project folders outside version control.

## URLs

- **MVP (Part 1):** `https://<owner>.github.io/<sites-repo>/<slug>/`
- **Live (Part 2):** a per-project **Cloudflare Pages** project (root directory
  `projects/<slug>`) on the client's own `<domain>`.

## Build a new site

```bash
node scripts/new-site.mjs <slug> --identity=<A|B|C> --name="Business Name"
```

Then write `projects/<slug>/src/content/home.md` — that's the only file that
carries the business's words. See **`BUILD.md`** for the five-step path.

Every site is a *copy* of `templates/one-pager/`, so after generation the project
is entirely yours: rewrite any component you like. The template exists so nobody
retypes a link checker, a CSS reset and a content schema for the sixth time.

For a full client engagement (not just the build), follow `orchestration.md`:
intake-research → **visual-identity + lovable-page** → build (Phase 5c) → review
→ build-part-2 (launch) → handoff → invoice.

## Placeholders

`<owner>` GitHub account · `<sites-repo>` this repo's name · `<slug>` project
folder · `<domain>` client domain. Fill per engagement.
