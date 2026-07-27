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
hero_label: 'REPLACE — category · city'
hero_heading: 'REPLACE — the benefit a visitor gets, not the trade name'
hero_sub: 'REPLACE — one sentence on who this is for and what they walk away with.'

# HERO IMAGE — optional, path relative to this file, e.g. './images/hero.jpg'.
# Put the real photo (once sourced, per visual-identity's priority order) in a
# sibling `images/` folder. Leave this field out entirely if you don't have one
# yet — Hero.astro automatically falls back to the identity's stock image, so
# the section is never empty either way.
# hero_image: './images/hero.jpg'

# TRUST STRIP — max 4. Only claims the business can actually back.
trust:
  - 'REPLACE — a real, checkable claim'
  - 'REPLACE — another one'

# ABOUT — the owner's story: experience + personality + what the customer gets.
about_heading: 'REPLACE — about heading'
about: |
  REPLACE — two to four sentences. Who runs this, how long, what they care
  about, and why that matters to the person reading.

  A blank line starts a new paragraph.

# ABOUT IMAGE — same rule as hero_image: optional, path relative to this file.
# Falls back to the identity's stock image when unset.
# about_image: './images/about.jpg'

# SERVICES — 3 to 6. Write the OUTCOME, not the method.
#   bad:  "Uses scissors and clippers."
#   good: "You leave with a haircut that suits you."
services:
  - title: 'REPLACE — service name'
    body: 'REPLACE — the outcome the customer gets.'
  - title: 'REPLACE — service name'
    body: 'REPLACE — the outcome the customer gets.'
  - title: 'REPLACE — service name'
    body: 'REPLACE — the outcome the customer gets.'

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
# instagram_url: ''
# facebook_url: ''

# <head>. Falls back to "<site name> — <hero_heading>" and hero_sub.
# seo_title: ''
# seo_description: ''
---
