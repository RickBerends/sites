---
name: lovable-page
description: >-
  Structure and write a one-page local-business site that visitors actually
  trust and act on — the required sections (hero, trust strip, services, about,
  social proof, location, opening hours, contact), the copy formulas for each,
  and a conversion checklist. Use this whenever you're deciding what goes on a
  business one-pager and how it's phrased (orchestration.md Phase 5, feeding the
  content model in build-part-1 §5). It turns the intake-research brief into
  section-by-section content. Trigger it any time someone asks what sections a
  site needs, how to word a hero/CTA, or wants the page to convert rather than
  just exist — even if they don't say "lovable page". Pairs with the
  visual-identity skill, which owns the look; this skill owns structure and copy.
---

# Lovable local-business landing page

Create a one-page site that feels **trustworthy, human, professional, local, and
easy to contact** — a modern digital business card that also convinces visitors
to become customers.

A visitor should answer three questions **within 5 seconds**:

1. What is this business?
2. Why should I trust them?
3. How do I contact them?

**Where this fits:** run at **orchestration.md Phase 5**, taking the
`intake-research` brief as raw material and deciding the sections + copy for
`src/content/home.md` (**build-part-1 §5**). It pairs with `visual-identity`
(look and feel) — this skill owns *structure and words*.

## Core philosophy

People don't buy services — they buy **confidence**. The page should make a
visitor feel: *"This person knows what they're doing," "I'd be comfortable
working with them," "Contacting them seems easy."*

**Every section must increase trust. If a section doesn't increase trust, remove
it.** (Same rule as the visual-identity skill, applied to content.)

---

## Required sections

### 1. Hero
Communicate **who / what / where / why choose them**, immediately.

- Small label: `Hairdresser • Tilburg`
- Headline (benefit-led, not just the name): *"A hairdresser who actually
  listens"*
- One supporting sentence describing the experience.
- Primary CTA: `Call now` · Secondary CTA: `View opening hours`.
- At least one **authentic** image — owner portrait, owner working, or interior.
  Avoid generic stock and AI-generated people.

*Visitor feeling:* "I already understand what this business is."

### 2. Trust strip
Directly below the hero. Max **4** short, scannable items:
`✓ 20+ years experience` · `✓ Specialist in curly hair` · `✓ Personal
appointments` · `✓ Biological products`.

### 3. Services
Cards, each: icon + service title + **one-sentence benefit**. Focus on
**outcomes, not features**.

- Bad: "Uses scissors and clippers."
- Good: "You leave with a haircut that suits you."

### 4. About the owner
For local businesses the owner is usually the brand.

- Owner photo.
- Headline: *"You're not just another appointment."*
- Short story = **experience + personality + customer benefit** (why they
  started, what they care about, how they work).

*Visitor feeling:* "This seems like a good person."

### 5. Social proof
**Mandatory whenever available.** Preferred order: Google reviews → Facebook
reviews → testimonials. Show 3–6, each with name, rating, short quote.

> **Use real reviews. Never invent testimonials or ratings.** If none are
> available via a compliant path, leave it as a flagged gap — see the
> `intake-research` skill §2b (live embed / client-permissioned quotes / fresh
> testimonials).

### 6. Location & accessibility
Address, embedded map, parking info, public-transport info; optional storefront
photo. *Visitor feeling:* "I know exactly where to go."

### 7. Opening hours
Simple table; highlight **open now / closed now** if possible. Add a helpful
note like *"Appointments recommended."*

### 8. Contact — the most important section
Phone, WhatsApp (if available), email (if available), address. One large, clear
CTA (`Book an appointment`). **Never hide contact details; never require multiple
clicks.**

---

## Design principles

- **Human before corporate.** Real photos, real stories, real language. Avoid
  corporate jargon and marketing buzzwords.
- **Visual hierarchy.** A visitor should understand the whole page by reading
  only the headlines: Hero → Trust → Services → About → Reviews → Contact.
- **White space.** Local sites look amateur because they're crowded — when in
  doubt, add space. (Matches visual-identity's spacing tokens.)
- **Typography.** One display font + one body font (Inter / Instrument Sans /
  Manrope). Headlines confident; body text disappears.
- **Colour.** Start from the business personality; **one** accent colour, not
  three. (Defer to the chosen `visual-identity`.)

## Imagery priority

1. Owner portrait → 2. Owner working → 3. Storefront → 4. Interior →
5. Customers (with permission). Avoid stock imagery and fake smiling models.
Authenticity beats perfection.

## Microinteractions

Subtle hover states, smooth scrolling, button feedback, section-reveal
animations. Avoid fancy page transitions, autoplaying video, heavy motion —
**trust comes from calmness.**

## Mobile first

Most visitors arrive on mobile. Call button always visible; address easy to
copy; map easy to open; opening hours easy to scan.

---

## Conversion checklist (verify before publishing)

- [ ] Visitor understands the business within 5 seconds.
- [ ] Contact info visible without scrolling too far.
- [ ] A real owner photo exists.
- [ ] At least one trust signal exists.
- [ ] At least one review exists (or it's an explicit, flagged gap).
- [ ] CTA appears multiple times.
- [ ] Mobile experience feels effortless.
- [ ] Page loads fast.
- [ ] No unnecessary pages.

## Success metric

A successful page makes a visitor think: *"This looks professional. This person
seems trustworthy. I'll contact them."*

---

## How this maps to the build

| Section here | `home.md` field(s) (build-part-1 §5) |
|---|---|
| Hero | `hero_heading`, `hero_sub` + hero image |
| Trust strip | `trust[]` (short strings) |
| Services | `services[]` (`title`, `body`) |
| About | `about` + owner photo |
| Social proof | `testimonials[]` — only via a compliant `intake-research` path |
| Location | address / map / transport in the contact-facts block |
| Opening hours | `hours` table |
| Contact | `phone`, `whatsapp?`, `contact_email?`, `address` |

Fields the intake brief couldn't source stay as **flagged gaps** (never
invented) and are confirmed with the client at Phase 6.
