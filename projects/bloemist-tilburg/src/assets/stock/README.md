# Stock fallback images

`hero.jpg` and `about.jpg` fill the Hero/About image slots when this
project's own `hero_image`/`about_image` isn't set in `src/content/home.md`
yet — see `content.config.ts`.

**These are now real, licensed photos, not gradient placeholders.** They're
copied from `templates/one-pager/src/assets/stock/mock/` (`bloemen-01.jpg` →
`hero.jpg`, `bloemen-02.jpg` → `about.jpg`) — Unsplash photos, licence permits
free commercial use without attribution. They match the `visual-identity`
imagery direction for this business (natural daylight, real flowers, soft
depth of field), but they're photos of a *different* florist's flowers, not
Bloem'ist's own shop — that's why Hero.astro/About.astro still render the
"Sfeerbeeld" caption whenever a real `hero_image`/`about_image` isn't set in
`home.md`. Keep that honest disclosure until the client's own photos exist.

## Replacing with the client's own photos

Overwrite `hero.jpg` / `about.jpg` in place — same filename, same folder —
or set `hero_image`/`about_image` directly in `home.md` (preferred once real
shop photos exist, since it also drops the "Sfeerbeeld" caption). A `.png`/
`.webp` works too as long as you also update the one `import` line that names
the file in `Hero.astro`/`About.astro`.
