# Stock fallback images

`hero.png` and `about.png` fill the Hero/About image slots when this
project's own `hero_image`/`about_image` isn't set in `src/content/home.md`
yet — see `content.config.ts`.

**Right now these are gradient placeholders, not real photos.** This session
could not download binary image files (outbound network is restricted to
package registries only), so each file is a generated blush-pink/sage
gradient — enough for the build/layout/fallback logic to be real and
testable, but not a finished look.

## Replacing a placeholder with a real photo

Overwrite `hero.png` / `about.png` in place — same filename, same folder. A
`.jpg`/`.webp` works too as long as you also update the one `import` line
that names the file in `Hero.astro`/`About.astro`.

## Candidate real photos (unverified — confirm licence before using)

Found via search, not downloaded or licence-checked. Per the
`visual-identity` imagery direction for this business (natural daylight,
real flowers/product, soft depth of field — never an obvious "stock" look):
search Unsplash/Pexels/Openverse for "florist shop natural light",
"flower bouquet close up soft light", "florist arranging flowers hands".
Openverse (openverse.org) shows the licence per photo directly on the result,
which makes checking usability faster.

Once the client's own shop photos exist, prefer those over any stock image —
set `hero_image`/`about_image` in `home.md` and this fallback stops being used.
