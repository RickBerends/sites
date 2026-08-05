# Content brief — Asja Hairstyling (Berkel-Enschot / Tilburg)
Researched: 2026-08-05 · Entity confirmed via: Google Places API record
(`kappers_clean.json`, batch pull for "kapper Tilburg" search area). Treated
with the same evidentiary weight as a WebSearch citation, per instruction.

## Hero
- heading (draft): "Kapper in Berkel-Enschot voor een knipbeurt die bij je
  past"
- sub (draft): benefit-first, names Berkel-Enschot (the actual village,
  adjacent to Tilburg — not relabelled as "Tilburg") and the sourced Google
  rating.
- Both are unratified draft copy — `draft: true` set in `site.config.json`.

## About
No sourced narrative exists for this business beyond name, address, phone,
rating and review count. **No owner name, no years-of-experience claim, no
story was invented.** The `about` copy on `home.md` explicitly states it is a
first-draft based on public info, pending owner confirmation — matching the
Hovenier De Man / Hair I Am precedent for thin briefs.

## Services
No sourced service list exists — the Google Places record has no category/
services breakdown for this entry. The three services drafted for `home.md`
(knippen & stylen, kleuren, föhnen & stylen) are generic, industry-standard
kapper services, not a claim specific to this business. Flagged as
generic-industry.

## Contact & facts
All from the Google Places API record (`kappers_clean.json`, entry
`"name": "Asja Hairstyling"`, pulled 2026-08-05):
- phone: 013 533 9830
- address: Klaproosstraat 33, 5056 SM Berkel-Enschot, Netherlands (note: this
  is Berkel-Enschot, a village adjacent to Tilburg, not Tilburg itself — kept
  accurate in the copy rather than relabelled)
- rating: 4.8 (10 reviews)
- place_id: ChIJqQrrTVeVxkcRtQgQrh2ovEc
- lat/lon: 51.5763246, 5.1336424
- existing website (source only, not linked from the site):
  http://www.asjahairstyling.nl/
- **hours: not sourced.** The Places record has `"hours": null` for this
  entry — no opening-hours data was returned by the API for this business.
  Left out of `home.md` entirely (and the `hours` section removed from
  `site.config.json`'s `sections` list, so no empty section renders); the
  hero's secondary CTA was retargeted to "Neem contact op" → `#contact`
  instead of the default "Bekijk openingstijden" → `#hours`, since there is no
  hours section to link to.
- contact_email: not sourced. [CONFIRM WITH CLIENT]

## Testimonials
No compliant source (live embed / client-permissioned quotes / fresh
testimonials) exists. The sourced rating (4.8★, 10 reviews) is used only as a
trust-strip stat, not as a review quote — no review text was reproduced.

## Brand & assets
- logo / colours / fonts / real photos: not sourced this session. Using the
  identity-B bundled stock fallback for hero/about until real photos are
  supplied. `hero_image` / `about_image` deliberately left unset in
  `home.md`.

## Sources
- Google Places API, `kappers_clean.json`, entry `"name": "Asja Hairstyling"`
  (pulled 2026-08-05)
- http://www.asjahairstyling.nl/ — existing business website, noted as a
  source only; not linked from the built site.

## Confirm with client
- Owner name, years of experience, and any actual story/specialisation.
- The three drafted services — confirm which services this salon actually
  offers (colouring, extensions, bridal, kids, etc.) and reprice/rename
  accordingly.
- Opening hours (not sourced at all — see Missing below).
- Contact email, if any.
- Real photos of the salon/team/work to replace the identity-B stock
  fallback.

## Missing
- Opening hours (Google Places record returned `null` — no data available)
- Owner name, story, years of experience
- Any business-specific service list (current three are generic-industry)
- Contact email
- Logo, brand colours, real photos
- Testimonials (no compliant source found this session)
