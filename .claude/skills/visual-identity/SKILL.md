---
name: visual-identity
description: >-
  Select and apply a complete, restrained visual identity for a one-page local
  business website — colours, typography, imagery direction, components, motion,
  and a universal 2026 design language. Use this whenever you are designing or
  styling a business site (orchestration.md Phase 5, before writing section
  components in build-part-1 §5) and need to decide the look and feel. It maps a
  business category (barber, salon, restaurant, coach, dentist…) to one of three
  identities and gives concrete tokens to put into the site's global CSS. Trigger
  it any time someone asks how a site should look, what colours/fonts to use, or
  wants the design to feel trustworthy rather than trendy — even if they don't
  say "visual identity". Pairs with the lovable-page skill, which owns structure
  and copy; this skill owns the visual system.
---

# Visual identity: category → a complete, restrained look

The objective is **not** to make the site look trendy. The objective is to make
visitors **trust the business within seconds**. When in doubt, remove decoration.

**This skill is now one decision, not a token table.** The palettes, fonts,
radii and motion values live in real CSS:

- `templates/one-pager/src/styles/identity-a.css`
- `templates/one-pager/src/styles/identity-b.css`
- `templates/one-pager/src/styles/identity-c.css`
- `templates/one-pager/src/styles/identity-d.css`
- `templates/one-pager/src/styles/identity-e.css`

Those files **are** the identities — read them if you need a value. They are the
single source of truth, so a value cannot be mistyped into a site by hand.
Token *names* are shared and live in `tokens.css`; identity files set values only.

## Workflow

1. **Determine the business category** from the intake brief.
2. **Pick A, B, C, D or E** from the table below.
3. **Pass it to the generator:** `node scripts/new-site.mjs <slug> --identity=B …`
   That copies the identity CSS in, fonts included. Do not hand-write tokens.
4. **Adapt the accent only if there is a real reason** — an existing logo colour,
   or a signal the business genuinely trades on. Use
   `--accent=#RRGGBB --accent-reason="…"`; the generator requires the reason and
   writes it into the CSS as a comment. Across the first five sites built, exactly
   one override was justified (a fair-trade shop taking the sage alt accent).
5. **Never mix identities.** Pick one and commit.

If a business spans two categories, pick the one that matches the *feeling the
owner wants a visitor to have*, not the literal trade. That judgement is the only
genuinely hard part of this skill.

## The three identities

| | Best for | Feels like | Never |
|---|---|---|---|
| **A — Crafted Masculine** | barber · tattoo artist · car detailing · mechanic · electrician · carpenter · personal trainer · bike shop · plumber · contractor | Apple × Japanese craftsmanship × modern workshop. *"This person knows exactly what they're doing."* | saturated blues · bright reds · gradients · glassmorphism |
| **B — Soft Boutique** | hairdresser · beautician · nail salon · midwife · yoga studio · florist · photographer · wedding planner · interior stylist · massage therapist | Aesop × boutique hotel × modern wellness studio. *"I'll enjoy spending time here."* | bright pink · purple gradients · bouncy motion |
| **C — Editorial Food** | restaurant · bakery · lunchroom · wine bar · café · delicatessen · food truck · catering · cheesemonger · coffee roastery | Kinfolk × modern restaurant × independent roastery. Food is the hero. | bright red · bright yellow · orange gradients |
| **D — Premium Natural** | hovenier · tuinarchitect · tuinaannemer (premium segment) | Calm, expensive-feeling, natural. *"Rust, vakmanschap en natuur — de tuin is de ster."* Large full-width garden photography, the site design stays out of the way. | bright/saturated green · playful icons · a busy layout · stock photos of someone holding a rake |
| **E — Warm Regional** | hovenier (buurt-/familiebedrijf) · klusbedrijf · groenvoorziening | A trusted local tradesperson, not a design agency. *"De vakman uit de buurt die trots is op zijn naam."* Owner/team-first imagery, generously rounded shapes, thin lines over shadow. | a cold corporate look · sharp diagonals · heavy drop shadows · stock models |

D and E both fit "hovenier", but for opposite reasons — the deciding question is
whether the owner wants to read as a **premium showroom** (D: full-bleed garden
photography, calm luxury, "uw droomtuin vakkundig aangelegd") or as the
**familiar neighbourhood business** (E: the owner's own face in the hero, a
family-run feel, "al meer dan 25 jaar dé hovenier voor de regio"). Ask which
feeling the client wants a visitor to have before defaulting to D just because
the trade is the same.

## Imagery direction (the part no CSS file can carry)

Priority order, always: **1)** the owner, **2)** the business, **3)** customers,
**4)** products, **5)** details. Real photography beats a stock fallback every
time — a real photo, even an imperfect one, builds more trust than a stock shot.

Per identity:

- **A** — craftsmanship: hands, tools, materials, the owner working, the
  workshop, close-up detail. Avoid posed smiles and fake office shots.
- **B** — natural daylight, plants, fabric, wood, real customers, soft depth of
  field. Everything should feel authentic.
- **C** — large, editorial, close-up: steam, ingredients, hands preparing food.
  Food occupies a lot of screen space.
- **D** — full-bleed, luxe achtertuinen, strakke bestrating, houten veranda's,
  groene borders, detailfoto's van materialen, medewerkers aan het werk. Never
  a stock photo of a smiling model gesturing at a plant.
- **E** — the owner or team first, then the van/logo, then real project photos
  with the location named ("Tuinrenovatie — Tilburg"). Warm and a little
  imperfect beats polished and generic.

**The Hero and About image slots are required — they must never render empty.**
`content.config.ts`'s `hero_image`/`about_image` fields are optional precisely
because a client's own photo is frequently not sourced yet, but Hero.astro and
About.astro always render *something*: the real photo if `home.md` has it,
otherwise the identity's bundled stock fallback (`templates/one-pager/src/assets/stock/{a,b,c}/`).
When the fallback is showing, the component renders a visible caption saying so
— the "flag the gap" instinct survives, it just no longer leaves white space.

Choosing the fallback stock photo is the same discipline as choosing a real
one: match the identity's imagery direction above and this specific business,
not a generic smiling-model shot. Swap it for a real photo the moment one
exists — the fallback is a placeholder, not a destination.

## Universal design language (2026)

These hold regardless of identity, and `tokens.css` already encodes most of them.

- **White space is a feature.** Desktop sections 120–180px, mobile 64–96px.
- **Max two font families** — one display, one clean sans. Hierarchy comes from
  size, spacing and weight, not colour.
- **One accent.** Background, surface, primary text, secondary text, and *one*
  accent. Every extra colour reduces quality.
- **Buttons:** one primary, one secondary. Never gradients.
- **Icons:** thin outline, consistent stroke, never colourful.
- **Motion reassures, never entertains.** 180–300ms, ease-out, fade/slide/subtle
  scale. `tokens.css` honours `prefers-reduced-motion`.

## Design principle

The website should never *feel* designed — it should feel **inevitable**.
Visitors shouldn't notice the interface; they should notice the business.

Every decision answers one question:

> "Does this make the business feel more trustworthy?"

If the answer is no, remove it.
