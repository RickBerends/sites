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
easy to contact**. A visitor should answer three questions **within 5 seconds**:

1. What is this business?
2. Why should I trust them?
3. How do I contact them?

**This skill is now about the words.** The sections, their order, and the fields
they map to are already built — `templates/one-pager/` ships all eight, and
`sections` in `site.config.json` switches them on and off. You write
`src/content/home.md`. See `BUILD.md`.

## Core philosophy

People don't buy services — they buy **confidence**. The page should make a
visitor feel: *"This person knows what they're doing," "I'd be comfortable
working with them," "Contacting them seems easy."*

**Every section must increase trust. If a section doesn't increase trust, remove
it** — drop it from `sections` in `site.config.json` rather than leaving it empty.

---

## The copy formulas

### Hero — `hero_label`, `hero_heading`, `hero_sub`

The headline is a **benefit, not the business name**. The name is in the header
already; the headline has one job, which is to make someone keep reading.

- Label: `Hairdresser • Tilburg` — category and place, nothing clever.
- Headline: *"A hairdresser who actually listens"* — not *"Salon Mariska"*.
- Supporting sentence: who it's for and what they walk away with.

*Visitor feeling:* "I already understand what this business is."

### Trust strip — `trust[]`

Max **4**, short and scannable, and only claims the business can actually back:
`20+ years experience` · `Specialist in curly hair` · `Personal appointments` ·
`Organic products`.

An unbacked claim is worse than an empty strip — it's the first thing a sceptical
visitor will test.

### Services — `services[]`

Each one sentence, and write the **outcome, not the method**:

- Bad: *"Uses scissors and clippers."*
- Good: *"You leave with a haircut that suits you."*
- Bad: *"Professional garment alteration service."*
- Good: *"That jacket you love finally fits properly."*

Three to six. More than six and none of them land.

### About — `about_heading`, `about`

For a local business the owner *is* the brand. The formula is
**experience + personality + customer benefit**: why they started, what they care
about, and what that means for the person reading.

Two to four sentences. A headline like *"You're not just another appointment."*
does more than a paragraph of history.

*Visitor feeling:* "This seems like a good person."

### Social proof — `testimonials[]`, `testimonials_source`

Show 3–6 with name, rating, short quote — **whenever a compliant path exists**.

> **Never invent a testimonial or a rating.** There are exactly three legitimate
> sources: a live embed, client-permissioned quotes, or fresh testimonials
> (`intake-research` §2b). Pasting scraped Google review text is not one of them.
> No compliant path → leave the section off and flag it for the client.

`testimonials_source` renders as an attribution line. If you can't fill it in,
that's the signal you shouldn't be publishing the quotes.

### Location & hours — `address`, `maps_url`, `hours[]`

*Visitor feeling:* "I know exactly where to go." Add a helpful human note where
it's true — *"Appointments recommended."*

### Contact — `phone`, `whatsapp`, `contact_email`, `address`

The most important section. **Never hide contact details; never require multiple
clicks.** A missing `contact_email` is extremely common and is a flagged gap, not
a field to fill with a guess.

---

## Writing principles

- **Human before corporate.** Real language. No jargon, no buzzwords, no
  "leveraging synergies to deliver excellence".
- **Headline-scannable.** Someone reading only the headings — Hero → Trust →
  Services → About → Reviews → Contact — should understand the whole business.
- **Write in the customer's words**, not the trade's. Read the business's reviews
  for the phrases customers actually use.
- **Mobile first.** Most visitors arrive on a phone: call button always reachable,
  address easy to copy, hours easy to scan.

## Imagery

Priority: **1)** owner portrait → **2)** owner working → **3)** storefront →
**4)** interior → **5)** customers (with permission).

**Never use obvious stock imagery.** A generic smiling model damages trust more
than white space does. If there's no real photograph yet, ship the section
without one and flag it — do not fill the hole with a stock placeholder.

## Conversion checklist (before publishing)

- [ ] Visitor understands the business within 5 seconds.
- [ ] Contact info visible without scrolling far.
- [ ] A real owner photo exists (or is a flagged gap).
- [ ] At least one trust signal exists.
- [ ] At least one review exists, or it's an explicit flagged gap.
- [ ] CTA appears more than once.
- [ ] Mobile experience feels effortless.
- [ ] No unnecessary pages.

## Success metric

A successful page makes a visitor think: *"This looks professional. This person
seems trustworthy. I'll contact them."*

Anything the intake brief couldn't source stays a **flagged gap** — never
invented — and is confirmed with the client at Phase 6.
