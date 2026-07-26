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
hero_label: 'Herenkapper · Tilburg'
hero_heading: 'Artizan Kapper — zonder afspraak geknipt in Tilburg'
hero_sub: 'Herenkapper aan de Besterdring in Tilburg, 6 dagen per week open, gewoon binnenlopen zonder afspraak.'

# TRUST STRIP — max 4. Only claims the business can actually back.
trust:
  - '6 dagen per week open'
  - 'Zonder afspraak — gewoon binnenlopen'
  - 'Knippen, baard trimmen en scheren'
  - 'Besterdring, Tilburg'

# ABOUT — the owner's story: experience + personality + what the customer gets.
about_heading: 'Over Artizan Kapper'
about: |
  Artizan Kapper is een herenkapper aan de Besterdring in Tilburg. De zaak is
  6 dagen per week open en werkt zonder afspraak: je loopt binnen en wordt
  geholpen. Deze pagina is een eerste, nog te bevestigen concept-versie — de
  volledige verhaallijn en foto's volgen na afstemming met de eigenaar.

# SERVICES — 3 to 6. Write the OUTCOME, not the method.
#   bad:  "Uses scissors and clippers."
#   good: "You leave with a haircut that suits you."
services:
  - title: 'Knippen'
    body: 'Een frisse haarsnit, zonder afspraak vooraf te hoeven maken.'
  - title: 'Baard trimmen'
    body: 'Een strak bijgewerkte baard, netjes in model gebracht.'
  - title: 'Scheren'
    body: 'Een verzorgde, close shave door een vakkundige hand.'

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
# hours:
#   - { day: 'Maandag', open: 'Gesloten' }
#   - { day: 'Dinsdag', open: '09:00 – 17:30' }

# CONTACT & LOCATION — delete any you cannot source. contact_email is very
# often a genuine gap; leave it out rather than guessing.
phone: '06 33918685'
address: |
  Besterdring 60
  5014 HP Tilburg
maps_url: 'https://www.google.com/maps/search/?api=1&query=Besterdring+60+Tilburg'

# SOCIAL
instagram_url: 'https://www.instagram.com/artizankapper/'

# <head>. Falls back to "<site name> — <hero_heading>" and hero_sub.
# seo_title: ''
# seo_description: ''
---
