# Content brief — Bij Nienke (Tilburg)
Researched: 2026-08-05 · Entity confirmed via: Google Places API record
(`kappers_clean.json`, entry `"name": "Bij Nienke"`) — name, phone, formatted
address, rating, review count, weekday opening hours, place_id, lat/lon, and an
existing business website (`bijnienke.nl`, noted as a source only, not linked
from the site). Treated as sourced fact with the same evidentiary weight as a
WebSearch citation, per instruction.

**No content beyond the Google Places record was gathered this session** — no
service list, no owner name, no story, no logo, no real photos, no
testimonials. Everything below that is not a directly sourced fact (hero
copy, about paragraph, service descriptions) is flagged as draft/generic
accordingly.

## Hero
- `hero_label`: 'Kapper · Tilburg'
- `hero_heading`: 'Een kapper bij u in de buurt, aan de Oerlesestraat in Tilburg'
- `hero_sub`: 'Bij Nienke is een kapsalon in Tilburg waar u terechtkunt voor
  een knipbeurt die bij u past, vlakbij in de buurt.'
- Draft copy — benefit-first, not yet ratified by the business. `draft: true`
  is set in `site.config.json`.

## About
No sourced narrative exists for this business beyond its name, address,
rating and hours. The `about` copy in `home.md` explicitly states it is a
first-draft based on public information pending owner confirmation — no
owner name, years of experience, or founding story is claimed, because none
is sourced.

## Services
No sourced service list exists for this business beyond the Google category
"kapper" (hairdresser). The three services drafted (knippen, kleuren,
föhnen & stylen) are the baseline outcomes essentially every hairdresser
offers — generic-industry language, not a claim specific to Bij Nienke —
flagged accordingly and phrased as outcomes per the lovable-page copy
formula.

## Contact & facts
All sourced from the Google Places API record (`kappers_clean.json`):
- address: Oerlesestraat 63, 5021 TT Tilburg, Netherlands
- phone: 013 542 2797
- rating: 4.7 (155 reviews)
- hours: Monday closed; Tue–Fri 08:30–17:30; Sat 08:30–15:30; Sunday closed
  — translated to Dutch day rows (Maandag…Zondag) in `home.md`
- place_id: ChIJd2oAy06-xkcRep_2C5NtJv8
- lat/lon: 51.5471797, 5.0800952 — used to build `maps_url`
- existing website: http://www.bijnienke.nl/ — noted as a source only, not
  linked from the built site
- contact_email: not sourced — omitted, [CONFIRM WITH CLIENT]
- whatsapp: not sourced — omitted

## Testimonials
No compliant source for reviews (no live embed, no client-permissioned
quotes, no fresh testimonials collected). The sourced rating/review-count
(4.7★, 155 reviews) is surfaced only as a trust-strip stat, not as
reproduced review text, per intake-research §2b. `testimonials` section left
empty of content.

## Brand & assets
- logo / colours / fonts / real photos: not sourced this session. Using the
  identity-B bundled stock fallback for hero/about until real photos are
  supplied.
- Identity B (Soft Boutique) applied per explicit framework-owner override
  for this entire batch of Tilburg hairdressers/barbers, regardless of the
  usual barber→A vs salon→B split.

## Sources
- Google Places API record for "Bij Nienke", `kappers_clean.json`
  (place_id `ChIJd2oAy06-xkcRep_2C5NtJv8`), retrieved 2026-08-05.

## Confirm with client
- Owner name and business story
- Full service list and pricing
- Logo, brand colours, real photos
- contact_email, WhatsApp number (if any)
- Whether `bijnienke.nl` content (services, staff) should inform this site

## Missing
- Any owner name, story, or specific service detail beyond the generic
  "kapper" category
- Logo, brand colours, real photos
- Reviews (rating/count only; no compliant quote source)
- contact_email, WhatsApp
