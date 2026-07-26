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
hero_label: 'Nagelsalon & beauty · Tilburg'
hero_heading: 'Verzorgde nagels en een moment voor jezelf, in Tilburg'
hero_sub: 'TTV Nails en Spa aan de Heuvelstraat verzorgt je nagels en verwent je met beautybehandelingen.'

# TRUST STRIP — max 4. Only claims the business can actually back.
trust:
  - 'Gellak & acryl nagels'
  - 'Spa- en beautybehandelingen'
  - 'Gevestigd aan de Heuvelstraat, Tilburg'
  - 'Ook op zondag geopend'

# ABOUT — the owner's story: experience + personality + what the customer gets.
about_heading: 'Over TTV Nails en Spa'
about: |
  TTV Nails en Spa is een nagelsalon en beautystudio aan de Heuvelstraat in
  Tilburg, met nagelverzorging zoals gellak en acryl en spa- en
  beautybehandelingen. Deze pagina is een eerste, nog te bevestigen
  concept-versie — de volledige verhaallijn en foto's volgen na afstemming met
  de eigenaar.

# SERVICES — 3 to 6. Write the OUTCOME, not the method.
#   bad:  "Uses scissors and clippers."
#   good: "You leave with a haircut that suits you."
services:
  - title: 'Gellak'
    body: 'Strakke, glanzende nagels die weken mooi blijven.'
  - title: 'Acrylnagels'
    body: 'Stevige, verzorgde nagels op maat gevormd en gelakt.'
  - title: 'Spa- en beautybehandelingen'
    body: 'Even tot rust komen met een verzorgende beautybehandeling.'

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
  - { day: 'Maandag', open: '10:00 – 18:00' }
  - { day: 'Dinsdag', open: '10:00 – 18:00' }
  - { day: 'Woensdag', open: '10:00 – 18:00' }
  - { day: 'Donderdag', open: '10:00 – 20:00' }
  - { day: 'Vrijdag', open: '10:00 – 18:00' }
  - { day: 'Zaterdag', open: '10:00 – 18:00' }
  - { day: 'Zondag', open: '11:30 – 17:30' }

# CONTACT & LOCATION — delete any you cannot source. contact_email is very
# often a genuine gap; leave it out rather than guessing.
phone: '06 11 29 53 59'
address: |
  Heuvelstraat 3A
  5038 AA Tilburg

# SOCIAL
# instagram_url: ''
# facebook_url: ''

# <head>. Falls back to "<site name> — <hero_heading>" and hero_sub.
# seo_title: ''
# seo_description: ''
---
