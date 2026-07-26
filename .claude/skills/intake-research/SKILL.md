---
name: intake-research
description: >-
  Turn a business name into a structured website content brief by researching
  its public Google Business Profile, Google reviews, and social-media presence,
  then mapping the findings onto the one-pager content model (hero, about,
  services, contact, testimonials). Use this whenever you're starting a website
  build and need to gather a real business's public information — especially at
  the client-engagement kickoff (orchestration.md Phase 5) before invoking
  build-part-1. Trigger it any time someone hands over a business name and wants
  its Google info, reviews, social links, hours, services, or brand assets
  collected to build a site from, even if they don't say the word "research".
  Enforces source-or-flag (never invent facts or reviews) and the Google /
  platform terms-of-service limits on reproducing reviews.
---

# Intake & research: business name → content brief

Turn a bare **business name** into a **structured content brief** that drops
straight into the one-pager build. Given a name (and enough to identify the exact
business), gather public Google Business Profile info, reviews, and social-media
presence, then map it onto the fields the site actually needs.

**Where this fits:** the output of this skill *is* the raw material for
`src/content/home.md` in the build — it fills the content model described in
**build-part-1 §5**. In the client engagement it runs at **orchestration.md
Phase 5 kickoff**, alongside (never instead of) the Phase 3 discovery call: desk
research drafts a first pass and surfaces gaps; the client confirms the facts.

**The one rule that governs everything: source it or flag it — never invent it.**
Every fact, quote, or figure in the brief must trace to a named source. If you
can't find it, mark it as a gap for the client to fill. A website built from
hallucinated services, addresses, or reviews is a liability, not a shortcut. This
matters more than usual here because an assistant doing rapid research will
happily fill a blank with a plausible-but-false detail — don't.

Placeholders: `<business-name>`, `<location>`, `<domain>`.

---

## Browsing strategy & tools

The §2 sources (Google, directories, social) often can't be reached with a plain
fetch — directory sites (telefoonboek.nl, firmania.nl, vind-open.nl) block
automated requests, and Google Maps / social profiles are JS-rendered. Use this
fallback order:

1. **`WebSearch` / `WebFetch` first** — cheapest, no browser. Good for existing
   sites and anything that returns clean HTML.
2. **Claude in Chrome** (`mcp__claude-in-chrome__*`) — the real, logged-in
   browser. Switch to it the moment a fetch is blocked, returns a bot-check, or
   is JS-rendered. This is the default for Google Maps listings and directory
   sites.
3. **In-app Browser** (`mcp__Claude_Browser__*`) — use only when a logged-in
   session isn't needed.

### Pre-approved research sources
Go straight to these; no need to ask which to use for Dutch business intake:
- `google.com/maps` — authoritative listing: hours, phone, address, category
- `kvk.nl` / `openkvk.nl` / `drimble.nl` — official company register (legal name,
  KvK number, registered address, sector)
- `detelefoongids.nl` · `goudengids.nl` · `telefoonboek.nl` · `firmania.nl` ·
  `vind-open.nl` · `bedrijvenpagina.nl` · `companyinfo.nl` — business directories
- `trustpilot.com` (`nl.trustpilot.com`) — reviews (read as private signal;
  reproduce only via a §2b compliant path)
- `facebook.com` · `instagram.com` · `linkedin.com` — public social profiles
  (voice, services, brand assets — public info only, no logged-in content)
- `local.fedex.com`

**Read-only while researching.** Never enter credentials, submit or autofill
forms, accept cookie/consent banners, or click send/publish/pay controls in the
browser — this is fact-gathering only. Surface any such step to the user instead.
Take public info only; don't sign in to gated content to reach it.

---

## 1. Disambiguate the business first

A business name alone is ambiguous — chains, franchises, and common names
collide. Pin the exact entity before gathering anything, or you'll blend two
businesses into one brief.

Establish at least one disambiguator:
- `<business-name>` — the exact trading name.
- `<location>` — city/region or full address.
- One strong key: existing website URL, phone number, or Google Maps / Business
  Profile link.

Then **confirm the match**: the name + address/phone on Google must agree with
what the requester gave you. If two plausible candidates exist, stop and ask
which one — guessing here poisons the whole brief.

Proceed only once you can point to one specific business with a verifiable
address or phone.

---

## 2. Three sources, and the rules that bind them

Respect these limits — this is paid client work, and the client's reputation (and
yours) rides on it.

### a. Google Business Profile info — the factual backbone
- **What:** name, category, address, opening hours, phone, website, price level,
  profile photos.
- **How:** the Google **Places API — Place Details** is the clean,
  terms-compliant path (needs an API key). A manual Google Maps lookup is fine
  for a one-off — transcribe facts by hand, don't bulk-scrape.
- **Feeds:** the factual scaffolding — contact block, hours, map, and the
  "what/where" behind the hero and about.

### b. Google reviews — the sensitive one; read before touching
- **You may not scrape Google's full review set and republish it.** Google's
  terms restrict scraping, caching, and re-displaying reviews. The Places API
  returns at most ~5 reviews, requires **attribution**, and forbids storing them
  beyond its caching limits.
- Pick a compliant path for on-site testimonials:
  1. **Live embed** — display current reviews via the API / an official widget,
     with attribution, fetched at runtime (nothing hardcoded or stored).
  2. **Client-permissioned quotes** — the client asks specific reviewers, or uses
     reviews they're entitled to reproduce, and gives written OK to feature those
     exact quotes. Cleanest for a static one-pager.
  3. **Fresh testimonials** — the client collects a few new ones for the site.
- You may read *all* reviews freely as **private signal** — to learn what
  customers praise, which shapes the about/services tone. That's different from
  reproducing the text, which needs a path above.
- **Never fabricate a review or a star rating.** With no permissioned quotes yet,
  leave testimonials as a flagged gap.

### c. Social media & the existing site — voice, proof, assets
- **What:** handles/links, bio/tagline, services mentioned, brand tone, logo,
  colours, photos, follower counts (light social proof), recent posts (what
  they're promoting now).
- **How:** read **public** profiles and any existing site. Respect each
  platform's terms and rate limits; take public info only — no private or
  logged-in-only content, and don't compile personal data on individuals.
- **Feeds:** the about section's voice, the services list, and the brand/asset
  checklist.

---

## 3. Gather checklist

Fill what the §2 sources support; mark the rest as gaps (§5). For every filled
item, note its **source** (URL or "Google Business Profile") so the brief is
auditable.

**Factual (mostly Google):** trading name · category/what they do · address ·
hours · phone · existing website · service area.

**Content (Google + site + social):** one-line value proposition · about/story
(2–4 sentences, synthesized from real sources) · services (3–6, each a title +
one line) · testimonials (only via a §2b compliant path).

**Assets / brand (social + site):** logo · brand colours · fonts/tone · usable
photos · social links to feature · contact email (often NOT public — see §5).

---

## 4. Map research → the content model

Everything you gather lands in one file: `src/content/home.md`. The authoritative
field list is the schema at
`templates/one-pager/src/content.config.ts` — read it rather than a copy that can
drift. The template's `home.md` is commented field by field.

What research feeds which field:

| Filled from | Lands in | Notes |
|---|---|---|
| Name + core value prop | `hero_heading` | Short, benefit-led; **not** just the name |
| One-line value proposition | `hero_sub` | What they do, for whom, where |
| Google description + site/social about | `about` | Synthesized from real sources, no invention |
| Google attributes + site + social | `services[]` | 3–6; each traceable to a source |
| Site / social contact | `contact_email` | **Usually a gap** — confirm with client (§5) |
| §2b compliant path only | `testimonials[]` + `testimonials_source` | Attribution or written permission required |

Everything is optional except `hero_heading`, `hero_sub`, `about` and `services`.
**A field you cannot source is deleted, not guessed** — the schema is built to
let a site ship with honest gaps.

Non-schema outputs the build still needs: the **brand kit** (logo, colours,
fonts, photos) and the **business category**, which picks the identity
(`visual-identity`) that the generator takes as `--identity`.

---

## 5. Verify, then flag every gap

Produce two lists next to the brief — don't paper over blanks:

- **Confirm-with-client** — anything inferred that the client must ratify: the
  value proposition, services list, about copy, and especially the **contact
  email** (rarely public — never invent one) and **testimonials** (need a §2b
  path).
- **Missing** — fields with no source found. Leave them blank in the brief and
  list them; don't fill from assumption.

A brief that's honest about sourced-vs-needed is what lets the build start on
solid facts.

---

## 6. Output template

Produce the brief in exactly this shape:

```md
# Content brief — <business-name> (<location>)
Researched: <date> · Entity confirmed via: <address/phone/Maps link>

## Hero
- heading: ...
- sub: ...

## About
<2–4 sentences, each traceable to a source>

## Services
- <title> — <one line>   (source: <url>)
- ...

## Contact & facts
- address / hours / phone: ...
- website: ...            - social: ...
- contact_email: [CONFIRM WITH CLIENT]

## Testimonials
- [pending — needs compliant path: live-embed / client permission / fresh]

## Brand & assets
- logo / colours / fonts / photos: ...

## Sources
- <every URL / "Google Business Profile" used above>

## Confirm with client
- ...
## Missing
- ...
```

---

## Guardrails

- **Source or flag — never invent.** No made-up services, addresses, hours,
  emails, ratings, or reviews. Gaps stay gaps.
- **Confirm the entity first** (§1) — one wrong match poisons the whole brief.
- **Reviews:** no scraping/republishing Google's full set; use a §2b compliant
  path with attribution; never fabricate a quote or rating.
- **Public data only:** no private/logged-in content; respect platform terms and
  rate limits; don't compile personal data on individuals.
- **Client ratifies claims:** the value proposition, services, about copy, and
  contact details are proposed from research and confirmed by the client before
  they go live — this brief drafts, it doesn't decide.
- **Logos/photos** need the right to use them — confirm ownership/licence in the
  same handoff where you confirm the copy.
