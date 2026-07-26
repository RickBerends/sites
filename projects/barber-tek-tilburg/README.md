# Barber Tek — Tilburg (MVP one-pager)

Proof-of-concept one-page site for **Barber Tek**, a men's barbershop at
Willem II-straat 78A, Tilburg, NL. Built per this monorepo's
[`build-part-1-mvp.md`](../../build-part-1-mvp.md); see
[`../../orchestration.md`](../../orchestration.md) Appendix D for the
autonomous-build context and [`./content-brief.md`](./content-brief.md) for
sourced-vs-flagged facts.

**Status:** unratified draft — `robots.txt` disallows all crawling and every
page carries a `noindex` meta tag plus a visible draft banner until the client
confirms the copy (Phase 6).

## Structure

- `src/content/home.md` — the page's content (schema in `src/content.config.ts`).
- `src/components/` — one component per section (Hero, Trust, Services, About,
  Location, Contact, Nav, Footer, DraftBanner).
- `src/styles/global.css` — visual-identity **A "Crafted Masculine"** tokens
  (palette, two fonts, radii, motion).
- `scripts/check-links.mjs` — build-time internal link checker.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build |
| `npm run check-links` | Crawl `./dist/` and fail on broken internal links |

## Deploy

Served at `https://rickberends.github.io/sites/barber-tek-tilburg/` by the
monorepo's shared GitHub Pages workflow once merged to `main` (see
`build-part-1-mvp.md` §6). `astro.config.mjs`'s `base` is
`/sites/barber-tek-tilburg` — both segments matter (repo name + project slug).
