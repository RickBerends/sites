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
hero_heading: 'Avantgarde — kapper aan het NS-Plein in Tilburg'
hero_sub: 'Dames- en herenkapper in het centrum van Tilburg, met een sterke beoordeling van klanten op Google.'

# TRUST STRIP — max 4. Only claims the business can actually back.
trust:
  - '4,6★ op Google (97 reviews)'
  - 'Kapper aan het NS-Plein in Tilburg'
  - 'Zes dagen per week open'
  - 'Donderdag tot 20:00 open'

# ABOUT — the owner's story: experience + personality + what the customer gets.
about_heading: 'Over Avantgarde'
about: |
  Avantgarde is een kapperszaak aan het NS-Plein in het centrum van Tilburg,
  met een beoordeling van 4,6 sterren op Google op basis van 97 reviews.

  Deze pagina is een eerste concept-versie, samengesteld op basis van openbaar
  beschikbare gegevens. Het volledige verhaal van de zaak en de precieze
  behandelingen die worden aangeboden volgen na afstemming met de eigenaar.

# SERVICES — 3 to 6. Write the OUTCOME, not the method.
#   bad:  "Uses scissors and clippers."
#   good: "You leave with a haircut that suits you."
services:
  - title: 'Knippen'
    body: 'Een frisse haarsnit die past bij jouw gezicht en stijl.'
  - title: 'Kleuren'
    body: 'Een egale, natuurlijk ogende kleur of subtiele highlights.'
  - title: 'Föhnen & stylen'
    body: 'Je haar in model, klaar voor de rest van de dag.'

# OPENING HOURS — delete if not sourced. `open` uses the closed label from
# site.config.json strings when shut.
hours:
  - { day: 'Maandag', open: '12:00 – 17:30' }
  - { day: 'Dinsdag', open: '09:00 – 17:30' }
  - { day: 'Woensdag', open: '09:00 – 17:30' }
  - { day: 'Donderdag', open: '09:00 – 20:00' }
  - { day: 'Vrijdag', open: '09:00 – 17:30' }
  - { day: 'Zaterdag', open: '08:00 – 16:00' }
  - { day: 'Zondag', open: 'Gesloten' }

# CONTACT & LOCATION — delete any you cannot source. contact_email is very
# often a genuine gap; leave it out rather than guessing.
phone: '013 542 6218'
address: |
  NS-Plein 11
  5014 DA Tilburg
maps_url: 'https://www.google.com/maps/search/?api=1&query=51.5602149,5.0920662&query_place_id=ChIJZaY_Ic2_xkcRZUT9lzEcmTA'

# <head>. Falls back to "<site name> — <hero_heading>" and hero_sub.
# seo_title: ''
# seo_description: ''
---
