# Stock fallback images

`c/hero.png` and `c/about.png`
fill the Hero/About image slots when this project's own
`hero_image`/`about_image` isn't set in `src/content/home.md` yet — see
`content.config.ts`.

These start as gradient placeholders for identity C. Overwrite them
in place with a real photo (same filename, or update the glob pattern in
`Hero.astro`/`About.astro` if you change the extension) once one is sourced,
per the `visual-identity` skill's imagery priority order.
