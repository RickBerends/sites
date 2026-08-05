# Content brief — Ali's kapsalon (Tilburg)
Researched: 2026-08-05 · Entity confirmed via: Google Places API record
(`kappers_clean.json`, "Ali's kapsalon" entry) — name, phone, formatted
address, rating, review count, opening hours, place_id and lat/lon are all
API-sourced fields, same evidentiary weight as a WebSearch citation. The
existing `website` field in that record points to a Facebook page
(`https://m.facebook.com/pages/category/Barber-Shop/Alis-kapsalon-118005680047121/`)
— noted as a source of the business's existence/category, not linked from the
site.

## Hero
- heading: "Een frisse knipbeurt bij uw kapper aan de Besterdring in Tilburg"
  — draft, benefit-first, built from the sourced street name (Besterdring)
  and city (Tilburg). Labelled draft via `site.config.json` `draft: true`.
- sub: one sentence, draft, not client-ratified.

## About
No sourced owner story, years-of-experience claim, or business narrative
exists beyond the Google Places record (name, address, phone, hours, rating).
Following the hovenier-de-man / barber-tek-tilburg precedent, the about copy
is deliberately generic and states plainly that it is a first draft based on
public information, pending confirmation from the owner. No owner name or
history is invented.

## Services
No sourced service list exists for this business — the Google Places record
does not include one. The three services drafted (Knippen, Kleuren, Stylen)
are generic-industry, phrased as customer outcomes, and represent the
baseline offering of essentially any hairdresser — not a claim specific to
this business. Flagged for replacement once the owner confirms an actual
service/price list.

## Contact & facts (all sourced from the Google Places API record)
- phone: 06 25190998 (site uses "+31 6 25190998", same digits, national →
  international format, matching the barber-tek-tilburg precedent)
- address: Besterdring 49, 5014 HH Tilburg, Netherlands
- rating: 4.9 (200 reviews) — used in the trust strip as a sourced stat, not
  as an invented review quote
- hours: sourced weekdayDescriptions, translated to Dutch day names with the
  same sourced times (Maandag 12:00–19:00; Dinsdag–Vrijdag 09:00–19:00;
  Zaterdag 09:00–18:00; Zondag Gesloten)
- place_id: ChIJty-QcMK_xkcRg-xH7XEcLn0
- lat/lon: 51.5663729, 5.088853299999999
- maps_url: derived (not invented) from lat/lon + place_id:
  `https://www.google.com/maps/search/?api=1&query=51.5663729,5.088853299999999&query_place_id=ChIJty-QcMK_xkcRg-xH7XEcLn0`
- contact_email: not sourced — omitted from `home.md`

## Testimonials
No compliant source exists (no client-permissioned quotes, no live review
embed). Reproducing scraped Google review text is not permitted. The sourced
rating/review-count (4.9★, 200 reviews) is surfaced instead, in the trust
strip, as a sourced aggregate stat rather than an invented or scraped quote.
`home.md` intentionally has no `testimonials` field.

## Brand & assets
No logo, brand colours, or real photos were sourced this session. Per
identity B (visual-identity skill) and the explicit override for this batch
(every Tilburg hairdresser/barber in this engagement uses identity B
regardless of the usual barber→A / salon→B split), the site uses the bundled
identity-B stock fallback for the hero and about images — `hero_image` and
`about_image` are left unset in `home.md` so that fallback renders. This is
expected behaviour, not a gap.

## Sources
- Google Places API record, `kappers_clean.json`, entry "Ali's kapsalon"
  (accessed 2026-08-05): phone, formatted address, rating, review_count,
  weekdayDescriptions (hours), place_id, lat, lon.
- Existing `website` field in that record (Facebook page) — noted as source
  of business existence only, not linked from the site:
  https://m.facebook.com/pages/category/Barber-Shop/Alis-kapsalon-118005680047121/

## Confirm with client
- Hero heading/sub and about copy — currently draft, generic-industry
  language pending the owner's own words.
- Services list and any pricing — currently three generic industry-standard
  services (Knippen, Kleuren, Stylen), not sourced from this business.
- contact_email, if the client wants one listed.
- Any real photos to replace the identity-B stock fallback.
- Confirmation that the sourced phone/address/hours are still current.

## Missing
- Owner name, story, years of experience
- Actual service list and pricing
- Logo, brand colours, real photos
- Client-permissioned testimonials or a live review embed
- contact_email
