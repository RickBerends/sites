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
hero_label: 'Wenkbrauw- en wimperspecialist · Tilburg'
hero_heading: 'Brows by Seyda — wenkbrauwen die je gezicht laten spreken'
hero_sub: 'Threading, hennabrows en wenkbrauwlift in Tilburg. Afspraken via Instagram.'

# TRUST STRIP — max 4. Only claims the business can actually back.
trust:
  - 'Wenkbrauwen epileren met touw (threading)'
  - 'Hennabrows'
  - 'Wenkbrauw lift/lamination'
  - 'Gevestigd in Tilburg'

# ABOUT — the owner's story: experience + personality + what the customer gets.
about_heading: 'Over Brows by Seyda'
about: |
  Brows by Seyda is een wenkbrauw- en wimperspecialist in Tilburg. De studio
  richt zich volledig op wenkbrauwen: epileren met touw (threading),
  hennabrows en wenkbrauw lift/lamination. Deze pagina is een eerste, nog te
  bevestigen concept-versie — de volledige verhaallijn en foto's volgen na
  afstemming met de eigenaar.

# SERVICES — 3 to 6. Write the OUTCOME, not the method.
#   bad:  "Uses scissors and clippers."
#   good: "You leave with a haircut that suits you."
services:
  - title: 'Threading'
    body: 'Wenkbrauwen epileren met touw, voor een scherpe en nette vorm.'
  - title: 'Hennabrows'
    body: 'Wenkbrauwen getint en gevuld met henna voor een volle, natuurlijke look.'
  - title: 'Wenkbrauw lift'
    body: 'Wenkbrauwlift/lamination voor gestileerde, egale wenkbrauwen die langer meegaan.'

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
# phone: '+31 6 12 34 56 78'
# whatsapp: '+31 6 12 34 56 78'
# contact_email: ''
# address: |
#   Straatnaam 1
#   5011 AB Tilburg
# maps_url: ''

# SOCIAL
instagram_url: 'https://www.instagram.com/browsbyseyda/'
# facebook_url: ''

# <head>. Falls back to "<site name> — <hero_heading>" and hero_sub.
# seo_title: ''
# seo_description: ''
---
