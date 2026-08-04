# BUILD — make a new one-pager

The hot path. Read this instead of `build-part-1-mvp.md` unless something goes
wrong; that file is now the *why*, this is the *how*.

## 1. Research (the expensive part — keep it)

```
/intake-research <business-name> <city>
```

Returns a sourced content brief. Every fact on the site comes from here.

## 2. Pick an identity

One lookup against the category. `.claude/skills/visual-identity/SKILL.md` has
the "best for" lists.

| | Identity | Categories |
|---|---|---|
| `A` | Crafted Masculine | barber · tattoo · detailing · mechanic · electrician · carpenter · trainer · bike shop · plumber · contractor |
| `B` | Soft Boutique | hairdresser · beautician · nail salon · midwife · yoga · florist · photographer · wedding planner · stylist · massage |
| `C` | Editorial Food | restaurant · bakery · lunchroom · wine bar · café · deli · food truck · catering · cheesemonger · roastery |
| `D` | Premium Natural | hovenier · tuinarchitect · tuinaannemer (premium segment) |
| `E` | Warm Regional | hovenier (buurt-/familiebedrijf) · klusbedrijf · groenvoorziening |

## 3. Generate

```bash
node scripts/new-site.mjs <slug> --identity=B --name="Business Name"
```

Options: `--lang=nl|en` · `--sections=hero,services,about,contact` ·
`--accent=#RRGGBB --accent-reason="…"` · `--no-install`

You get a project that already builds, already has the right `base`, already
loads its fonts, and already has all eleven sections wired (hero · trust ·
services · projects · highlights · about · process · testimonials · location ·
hours · contact) — `projects`, `highlights` and `process` render nothing until
`home.md` gives them content.

## 4. Write the words

Open `projects/<slug>/src/content/home.md`. **This is the only file you have to
write.** It is commented field by field.

Three rules that are not negotiable:

- **Never invent a fact.** Address, hours, phone, services, reviews — sourced or
  deleted. An empty field is honest; a plausible guess is a lie with the
  client's name on it.
- **Never publish a review you don't have a compliant path for.** Live embed,
  client-permissioned quotes, or fresh testimonials. Not scraped Google text.
  (`intake-research` §2b.)
- **Unratified copy stays labelled draft.** `draft: true` in `site.config.json`
  renders the banner and adds `noindex`. Turn it off at sign-off, not before.

Copy formulas — hero as benefit, services as outcomes, the owner story — are in
`.claude/skills/lovable-page/SKILL.md`.

## 5. Ship

```bash
cd projects/<slug>
npm run build && npm run check-links
```

Commit and push. CI detects the changed project, builds only it, and leaves
every other site alone. Live at
`https://rickberends.github.io/sites/<slug>/`.

---

## Dropping or reordering sections

Edit `sections` in `site.config.json`. Removing a name stops that section
rendering *and* removes it from the nav and CTA targets — no dead anchors. This
is how `lovable-page`'s "if a section doesn't increase trust, remove it" works
without touching code.

## The escape hatch

**After generation the project is yours.** Rewrite any component, add new ones,
throw away the grid, restructure the page. Nothing imports from the template at
runtime — the copy is total, so there is nothing to break.

The template exists so you don't spend your budget retyping a link checker and a
CSS reset for the fifth time. It sets the floor, not the ceiling. If a business
genuinely needs something different, build it — just don't rebuild the parts
that were never the interesting bit.

Two things are worth keeping even when you diverge hard:

- **The token names in `tokens.css`.** Values are yours to change; the names are
  what let a component dropped in from another project just work.
- **The field names in `content.config.ts`.** Part 2 attaches Decap CMS to this
  schema. One schema means one CMS config instead of one per client.
