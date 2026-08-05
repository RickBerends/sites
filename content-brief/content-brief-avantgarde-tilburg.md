# Content brief — Avantgarde (Tilburg)
Researched: 2026-08-05 · Source: Google Places API JSON record (`kappers_clean.json`,
entry `"name": "Avantgarde"`, Google displayName "Avantgarde Hairdressers
Tilburg"). Treated with the same evidentiary weight as a WebSearch citation
per the framework owner's instruction — every field below traces directly to
that record.

Identity **B** (Soft Boutique) was applied per explicit override: every
business in this Tilburg hairdressers/barbers batch uses identity B for this
engagement, regardless of the usual barber→A vs salon→B split.

## Hero
- label: 'Kapper · Tilburg'
- heading: 'Avantgarde — kapper aan het NS-Plein in Tilburg'
- sub: 'Dames- en herenkapper in het centrum van Tilburg, met een sterke
  beoordeling van klanten op Google.'
- Status: **draft**, unratified. `site.config.json` has `draft: true`.

## About
No sourced owner story, founding date, or specific narrative exists — only
name, category (hairdresser), address, rating and hours from the Places
record. The about copy is written generically and explicitly states this is a
first-draft based on public information, pending confirmation from the
owner. No owner name, years-of-experience claim, or story detail has been
invented.

## Services
No sourced service list exists for this business. The three services drafted
for `home.md` (Knippen / Kleuren / Föhnen & stylen) are the baseline
offering essentially every hairdresser provides — **generic-industry
language, not a claim specific to this business** — flagged accordingly and
phrased as outcomes per the lovable-page copy formula.

## Contact & facts
- phone: 013 542 6218 (source: Google Places API record)
- address: NS-Plein 11, 5014 DA Tilburg, Netherlands (source: Google Places
  API record)
- rating: 4.6★, 97 reviews (source: Google Places API record)
- website: http://www.avantgarde.nu/ — noted as a source only, **not linked**
  from the built site per instructions
- hours (source: Google Places API record, `weekdayDescriptions`):
  - Maandag: 12:00 – 17:30
  - Dinsdag: 09:00 – 17:30
  - Woensdag: 09:00 – 17:30
  - Donderdag: 09:00 – 20:00
  - Vrijdag: 09:00 – 17:30
  - Zaterdag: 08:00 – 16:00
  - Zondag: Gesloten
- maps_url: built from sourced `lat`/`lon`/`place_id`:
  `https://www.google.com/maps/search/?api=1&query=51.5602149,5.0920662&query_place_id=ChIJZaY_Ic2_xkcRZUT9lzEcmTA`
- contact_email: not sourced — omitted. [CONFIRM WITH CLIENT]
- place_id: ChIJZaY_Ic2_xkcRZUT9lzEcmTA

## Testimonials
No compliant path to reproduce review content exists (scraped Google review
text is not permitted per intake-research §2b, and no live embed or
client-permissioned quotes were obtained). The `testimonials` field is
omitted entirely; only the aggregate rating/count is surfaced in the trust
strip as a sourced statistic, not as quoted review text.

## Brand & assets
- logo / colours / fonts / real photos: not sourced this session. Using the
  identity-B bundled stock fallback for `hero_image`/`about_image` — neither
  field is set in `home.md`, so the template's own fallback renders.

## Sources
- Google Places API JSON record, `kappers_clean.json`, entry "Avantgarde"
  (dated 2026-08-05) — phone, address, rating, review_count, website,
  weekday hours, place_id, lat/lon.

## Confirm with client
- Owner name, business story, years of operation
- Actual service menu and pricing (current services are generic-industry
  placeholders, not sourced)
- Real photos (interior, work, team) to replace the stock fallback
- A compliant path for testimonials (live Google review widget, or
  client-permissioned quotes)
- contact_email, if the business wants one listed
- Sign-off to flip `draft: false` in `site.config.json`

## Missing
- Owner name, story, years of experience — none invented
- Specific service list/pricing — none invented; generic placeholders used
  and flagged
- contact_email — not sourced
- Logo, brand colours, real photos
- Reviews/testimonials — no compliant source this session (rating/count
  stat used instead, which is a Places API fact, not quoted review text)
