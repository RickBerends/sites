---
# ---------------------------------------------------------------------------
# The ONLY file that carries this business's words. Everything else in this
# project is scaffolding you were handed for free.
#
# Rules that are not style preferences:
#   - NEVER INVENT A FACT. Address, hours, phone, services and reviews must come
#     from the intake-research brief with a source. No source → delete the field
#     and flag it for the client. An empty field is honest; a plausible guess is
#     not.
#   - Copy the client has not ratified yet (hero heading, about, service bodies)
#     is a labelled draft. site.config.json `draft: true` renders the banner that
#     says so.
#   - Delete any field you have nothing real for. Optional means optional.
#   - To drop a whole section, remove its name from `sections` in
#     site.config.json — do not leave an empty section here.
#
# Copy formulas (what makes these sentences work) are in the lovable-page skill.
# ---------------------------------------------------------------------------

# HERO — the headline is a BENEFIT, not the business name. The visitor must
# answer "what is this / why trust them / how do I contact them" in 5 seconds.
hero_label: 'Kapper · Tilburg'
hero_heading: 'Bloom — kapper en beauty aan het Besterdplein in Tilburg'
hero_sub: 'Bloom is een kapsalon in Tilburg waar u terechtkunt voor knippen, kleuren en stylen, vlakbij het Besterdplein.'

# HERO IMAGE — optional, path relative to this file, e.g. './images/hero.jpg'.
# Put the real photo (once sourced, per visual-identity's priority order) in a
# sibling `images/` folder. Leave this field out entirely if you don't have one
# yet — Hero.astro automatically falls back to the identity's stock image, so
# the section is never empty either way.
# hero_image: './images/hero.jpg'

# TRUST STRIP — max 4. Only claims the business can actually back.
trust:
  - 'Gevestigd aan het Besterdplein in Tilburg'
  - 'Dinsdag t/m zaterdag geopend'
  - 'Ook op zaterdag terecht voor een afspraak'

# ABOUT — the owner's story: experience + personality + what the customer gets.
about_heading: 'Over Bloom'
about: |
  Bloom is een kapsalon aan het Besterdplein in Tilburg. Deze pagina is een
  eerste concept, samengesteld op basis van openbaar beschikbare gegevens
  (adres en openingstijden), in afwachting van bevestiging door de eigenaar.
  Er is nog geen bevestigd verhaal over de salon of haar eigenaar beschikbaar
  — dat volgt zodra dit is aangeleverd.

# ABOUT IMAGE — same rule as hero_image: optional, path relative to this file.
# Falls back to the identity's stock image when unset.
# about_image: './images/about.jpg'

# PROCESS — how the work happens, step by step. Usually 3 to 4 steps.
# process_heading: 'REPLACE — e.g. "Werkwijze"'
# process:
#   - title: 'REPLACE — step name, e.g. "Kennismaken"'
#     body: 'REPLACE — one line on what happens in this step'

# SERVICES — 3 to 6. Write the OUTCOME, not the method.
#   bad:  "Uses scissors and clippers."
#   good: "You leave with a haircut that suits you."
services:
  - title: 'Knippen'
    body: 'Een knipbeurt die past bij uw stijl en haartype.'
  - title: 'Kleuren'
    body: 'Haarkleur in de tint die u voor ogen heeft, vakkundig aangebracht.'
  - title: 'Föhnen & stylen'
    body: 'U verlaat de salon met haar dat meteen goed zit.'

# PROJECTS — real completed work, large photos. Delete the whole key if there
# are no real project photos yet; there is no stock fallback for this section,
# unlike hero_image/about_image.
# projects_heading: 'REPLACE — e.g. "Projecten waar we trots op zijn"'
# projects:
#   - title: 'REPLACE — short project name'
#     location: 'REPLACE — city or neighbourhood, e.g. "Tuinrenovatie — Tilburg"'
#     body: 'REPLACE — one line on what was done'
#     image: './images/project-1.jpg'

# HIGHLIGHTS — "why choose us", distinct from services (what we do). 3 to 4
# cards. `icon` is optional and rendered as-is (an emoji works well here).
# highlights_heading: 'REPLACE — e.g. "Waarom kiezen klanten voor ons?"'
# highlights:
#   - icon: '🏡'
#     title: 'REPLACE — a real, checkable reason'
#     body: 'REPLACE — one line backing it up'

# SOCIAL PROOF — delete both keys unless you have a compliant path
# (live embed / client-permissioned quotes / fresh testimonials).
# Scraped Google review text is NOT one of them. See intake-research §2b.
# testimonials:
#   - name: ''
#     rating: 5
#     quote: ''
# testimonials_source: 'Met toestemming van de klant geplaatst.'

# OPENING HOURS — delete if not sourced. `open` uses the closed label from
# site.config.json strings when shut.
hours:
  - { day: 'Maandag', open: 'Gesloten' }
  - { day: 'Dinsdag', open: '10:00 – 18:00' }
  - { day: 'Woensdag', open: '10:00 – 18:00' }
  - { day: 'Donderdag', open: '10:00 – 18:00' }
  - { day: 'Vrijdag', open: '10:00 – 18:00' }
  - { day: 'Zaterdag', open: '10:00 – 17:00' }
  - { day: 'Zondag', open: 'Gesloten' }

# CONTACT & LOCATION — delete any you cannot source. contact_email is very
# often a genuine gap; leave it out rather than guessing.
phone: '06 44250700'
# whatsapp: '+31 6 12 34 56 78'
# contact_email: ''
address: |
  Besterdplein 34
  5014 HP Tilburg
maps_url: 'https://www.google.com/maps/search/?api=1&query=51.5645488,5.0913366&query_place_id=ChIJH-hbBvK_xkcRm9rXI5HbnBs'

# SOCIAL
# instagram_url: ''
# facebook_url: ''

# <head>. Falls back to "<site name> — <hero_heading>" and hero_sub.
# seo_title: ''
# seo_description: ''
---
