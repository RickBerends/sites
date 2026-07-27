# Mock category photos

Real photos for building **demo/mock sites** quickly — not the identity
fallback system (see `../README.md` for that; those stay gradient placeholders
until a real client photo is confirmed licensed).

Filename doubles as the category tag, so `ls` or `grep` finds what you need:

| File | Category | Orientation | Dimensions | Good for |
|---|---|---|---|---|
| `kapper-01.jpg` | hairdresser | portrait | 4141×5176 | About |
| `kapper-02.jpg` | hairdresser | landscape | 4288×2848 | Hero |
| `tattoo-01.jpg` | tattoo artist | portrait | 3456×5184 | About |
| `makeup-01.jpg` | makeup artist | square | 2500×2500 | Hero or About |
| `bloemen-01.jpg` | florist | landscape | 5705×3719 | Hero |

Two hairdresser photos exist (`kapper-01`, `kapper-02`) — one of each
orientation, so a mock kapper build can use one for Hero and one for About.

## Using one in a mock build

In the project's `src/content/home.md`, point `hero_image` / `about_image` at a
copy of the file (Astro's `<Image>` needs the source under `src/`, so copy
rather than reference across projects):

```bash
cp templates/one-pager/src/assets/stock/mock/kapper-02.jpg \
   projects/<slug>/src/assets/hero.jpg
```

```yaml
# home.md
hero_image: '../assets/hero.jpg'
```

## Licence

Four of the five are Unsplash photos (original filenames carried the
photographer credit and `unsplash` in the name before this rename) — Unsplash's
licence permits free commercial use without attribution. `makeup-01.jpg` came in
without that provenance in its filename; confirm its licence before using it on
a real (non-mock) client site.

These are for prototyping and internal demos. Before using any of them on a
paid client's live site, re-confirm the licence terms — the same rule the
identity-fallback README asks for.
