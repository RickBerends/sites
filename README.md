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
orchestration.md               # full engagement pipeline (Phases 0–10)
build-part-1-mvp.md            # scaffold + deploy an MVP under projects/<slug>/
build-part-2-live.md           # custom domain (Cloudflare Pages) + Decap CMS
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

Follow `orchestration.md` (or run the `/build-site` command / the `orchestration`
skill). The pipeline: intake-research → **visual-identity + lovable-page** →
build-part-1 (MVP) → review → build-part-2 (launch) → handoff → invoice.

## Placeholders

`<owner>` GitHub account · `<sites-repo>` this repo's name · `<slug>` project
folder · `<domain>` client domain. Fill per engagement.
