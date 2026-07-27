# Stock fallback images

**Looking for real photos to prototype a specific business type (hairdresser,
tattoo, makeup, florist)?** See `mock/README.md` — a small library of real,
category-tagged photos for demo builds. This file below covers the separate
identity-fallback system (A/B/C, currently gradient placeholders).

`a/`, `b/`, `c/` each hold `hero.png` and `about.png` — the image that fills a
site's Hero/About slot when the client's own `hero_image`/`about_image` isn't
in `home.md` yet (see `content.config.ts` and the `visual-identity` skill).

**Right now these are gradient placeholders, not real photos.** This session
could not download binary image files (outbound network is restricted to
package registries only), so each file is a generated two-tone gradient in
the identity's accent colours — enough for the build/layout/fallback logic to
be real and testable, but not a finished look.

## Replacing a placeholder with a real photo

Overwrite the file in place — same filename, same folder:

- `a/hero.png`, `a/about.png` — identity A, Crafted Masculine
- `b/hero.png`, `b/about.png` — identity B, Soft Boutique
- `c/hero.png`, `c/about.png` — identity C, Editorial Food

`npm run build` (or `new-site.mjs` at generation time) reads whatever file is
there, so a `.jpg`/`.webp` works too as long as you also update the one
`import` line in `Hero.astro`/`About.astro` that names the file.

## Candidate real photos (unverified — confirm licence before using)

Found via search, not downloaded or licence-checked. Look for the largest
size, non-watermarked, and check the site's current licence terms before use:

- **A — Crafted Masculine** (hands, tools, workshop): search Unsplash/Pexels/
  Openverse for "barber tools workshop", "craftsman hands close up", "leather
  workshop natural light".
- **B — Soft Boutique** (daylight, plants, fabric, soft depth of field):
  search "boutique interior natural light", "wellness studio plants",
  "hairdresser salon soft light".
- **C — Editorial Food** (steam, ingredients, hands preparing food): search
  "editorial food photography close up", "bakery ingredients hands",
  "restaurant plating close up".

Sites worth checking first (free-to-use tiers, but verify current terms per
photo): unsplash.com, pexels.com, openverse.org (openverse aggregates
CC-licensed images and shows the licence per photo directly on the result).
