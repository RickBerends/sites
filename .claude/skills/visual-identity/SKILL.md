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
visitors **trust the business within seconds**. Every visual decision reinforces
the personality of the business. When in doubt, remove decoration.

**Where this fits:** run this at **orchestration.md Phase 5**, right after the
`intake-research` brief and alongside the `lovable-page` skill. `lovable-page`
decides *what sections exist and what they say*; this skill decides *how they
look*. The output is a small set of design tokens (colours, two fonts, radii,
motion) that go straight into `src/styles/global.css` and the section components
in **build-part-1 §5**.

## Workflow

When generating a website:

1. **Determine the business category** (from the intake brief).
2. **Select the matching identity** (A, B, or C below).
3. **Adapt the accent colour** to the business only if there's a real reason
   (e.g. an existing logo colour). Keep the rest of the palette.
4. **Never mix identities.** Pick one and commit.
5. **Keep the design restrained** — authenticity beats decoration.

If a business spans two categories, pick the one that matches the *feeling the
owner wants a visitor to have*, not the literal trade.

---

## Identity A — Crafted Masculine

**Best for:** barber · tattoo artist · car detailing · mechanic · electrician ·
carpenter · personal trainer · bike shop · plumber · contractor.

**Personality:** confident, craftsmanship, honest, reliable, premium without
being flashy. Visitors should think: *"This person knows exactly what they're
doing."*

**Palette**

| Role | Hex |
|---|---|
| Background | `#F7F5F2` |
| Surface | `#FFFFFF` |
| Primary text | `#191919` |
| Secondary text | `#6D6D6D` |
| Primary accent | `#5B7C6F` |
| Optional accent | `#243446` |

Never use saturated blues. Never use bright reds.

**Typography:** display **General Sans** (alt: Clash Display); body **Inter**.
Weights: display 700–800, body 400–500.

**Imagery:** craftsmanship — hands, tools, materials, the owner working, the
workshop, close-up details. Avoid posed smiling photos, stock imagery, fake
office pictures.

**Components:** cards 16px radius; dark filled buttons; minimal borders; subtle
shadows only.

**Decorative style:** steel, concrete, wood, leather, paper texture, subtle
grain. No gradients. No glassmorphism.

**Motion:** small fade + slide-up, ~200ms, calm easing.

**Overall feeling:** Apple × Japanese craftsmanship × modern workshop.

---

## Identity B — Soft Boutique

**Best for:** hairdresser · beautician · nail salon · midwife · yoga studio ·
florist · photographer · wedding planner · interior stylist · massage therapist.

**Personality:** warm, elegant, human, comfortable — premium through calmness.
Visitors should feel: *"I'll enjoy spending time here."*

**Palette**

| Role | Hex |
|---|---|
| Background | `#FFFDF9` |
| Surface | `#FFFFFF` |
| Primary text | `#2C2C2C` |
| Secondary text | `#6B6B6B` |
| Accent | `#B8827A` |
| Alt accent | `#AAB39B` |
| Alt accent | `#D5A6A0` |

Never use bright pink. Never use purple gradients.

**Typography:** display **Instrument Serif** (alt: Cormorant Garamond); body
**Inter** or **Manrope**.

**Imagery:** natural daylight, plants, fabric, wood, real customers, soft depth
of field. Everything should feel authentic.

**Components:** cards 20px radius; soft borders; tiny shadows; large white space.

**Decorative style:** organic line illustrations, botanical drawings, subtle
textures. Nothing ornamental.

**Motion:** fade, gentle scaling, slide. Never bounce.

**Overall feeling:** Aesop × boutique hotel × modern wellness studio.

---

## Identity C — Editorial Food

**Best for:** restaurant · bakery · lunchroom · wine bar · café · delicatessen ·
food truck · catering · cheesemonger · coffee roastery.

**Personality:** delicious, crafted, authentic, inviting. Food is the hero;
visitors should become hungry.

**Palette**

| Role | Hex |
|---|---|
| Background | `#FBF8F3` |
| Primary text | `#202020` |
| Secondary text | `#555555` |
| Olive | `#334238` |
| Terracotta | `#BB6842` |
| Gold | `#D5B16B` |

Never use bright red, bright yellow, or orange gradients.

**Typography:** display **Fraunces** (alt: Instrument Serif); body **Inter**.
Menu prices slightly heavier.

**Photography:** large, editorial, close-up, natural — steam, ingredients, hands
preparing food. Food should occupy lots of screen space.

**Components:** large imagery, minimal cards, editorial layouts, generous
spacing, thin dividers.

**Decorative style:** paper textures, recipe notes, ingredient sketches, tiny
imperfections.

**Motion:** image fades, subtle parallax only, section transitions. Never flashy.

**Overall feeling:** Kinfolk magazine × modern restaurant × independent coffee
roastery.

---

## Universal design language (2026)

These rules apply **regardless of identity**.

- **White space is a feature.** Desktop sections: 120–180px vertical spacing;
  mobile: 64–96px. Never overcrowd — when in doubt, add space.
- **Typography:** max two font families — one expressive display, one clean
  sans-serif. Hierarchy comes from size, spacing, and weight, **not** from
  excessive colour.
- **Buttons:** one primary style, one secondary. Rounded 14px or pill. Never
  gradients.
- **Cards:** light borders, very subtle shadows, 16–20px radius.
- **Images:** real photography always beats illustration. Priority: 1) owner,
  2) business, 3) customers, 4) products, 5) details. Never obvious stock photos.
- **Icons:** thin outline, consistent stroke width, never colourful.
- **Colour discipline:** use only background, surface, primary text, secondary
  text, and **one** accent. Every extra colour reduces quality.
- **Motion:** animations reassure, never entertain. 180–300ms, ease-out, fade /
  slide / subtle scale.
- **Layout hierarchy** (default order, unless a strong reason not to):
  Hero → Trust → Services → About → Gallery → Reviews → Location →
  Opening Hours → Contact. *(This mirrors the `lovable-page` section order.)*

---

## Design principle

The website should never *feel* designed — it should feel **inevitable**.
Visitors shouldn't notice the interface; they should notice the business.

Every design decision must answer one question:

> "Does this make the business feel more trustworthy?"

If the answer is no, remove it.

---

## Output of this skill (what to hand to the build)

- **Chosen identity:** A / B / C, with a one-line reason tied to the category.
- **Token block for `src/styles/global.css`:** the palette hexes as CSS custom
  properties, the two font families, the radius and motion values.
- **Imagery direction:** the priority list and the "avoid" list for this
  identity, so real photos (or clearly-labelled placeholders) are sourced right.
- **One accent, two fonts, restrained motion** — every component in build-part-1
  §5 inherits these tokens rather than inventing its own.
