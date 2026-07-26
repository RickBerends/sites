# Orchestration: client website engagement (outreach → build → handoff → paid)

This is the **top-level runbook** that drives a full client engagement. It
*calls* the build playbook at the build step and *owns* everything around it —
outreach, qualification, close, kickoff, review, launch, handoff, and invoicing.

- **Build sub-playbooks:** the technical "how to build the site" steps, split in
  two — [`./build-part-1-mvp.md`](./build-part-1-mvp.md) (MVP on a shareable
  `github.io` link) and [`./build-part-2-live.md`](./build-part-2-live.md) (go
  live on the client's domain + editing). This orchestration invokes Part 1 at
  **Phase 5**, reviews its output at **Phase 6**, and runs Part 2 across
  **Phases 7–8**. It never duplicates their content.
- **Intake skill:** the `intake-research` skill
  (`.claude/skills/intake-research/SKILL.md`) — turns a business name into a
  content brief that fills build-part-1 §5. Invoked at **Phase 5 kickoff**
  (below) via `/intake-research <business-name>`.
- **Runnable by:** you, or an AI assistant following it step by step. Steps
  marked **[gate]** require a human decision before proceeding. Steps marked
  **[approve-before-send]** must not go out without explicit human sign-off
  (all external client communication).

Placeholders: `<lead-name>`, `<company>`, `<domain>`, `<price>`, `<your-name>`,
`<your-site>`. Fill per engagement.

---

## Pipeline at a glance

```
0. Offer        → one product (a one-pager) + one flat price (once)
1. Source       → build a target list of prospects
2. Outreach     → cold email + follow-ups           [approve-before-send]
3. Discovery    → qualify on a short call            [gate: qualified?]
4. Proposal     → scope + price + contract + deposit [gate: signed + deposit?]
5. Build        → /intake-research → build-part-1-mvp.md (shareable link)
6. Review       → share the MVP link, collect revisions
7. Launch       → invoke build-part-2-live.md        [gate: client sign-off]
8. Handoff       → transfer ownership + train editor
9. Invoice       → final payment                     [gate: paid?]
10. Aftercare    → retainer / upsell / referral
```

Advance only when a phase's exit criteria are met. Never skip a **[gate]**.

---

## Phase 0 — Offer definition (do once, reuse every deal)

**You sell exactly one thing: a one-pager.** A single, easy-to-scroll page
(hero → a few sections → contact) on the build stack (Astro +
Cloudflare + Decap CMS). Selling one product keeps every later phase fast and
removes scoping debates.

- **The product:** one-page proof-of-concept website — fast, secure, mobile,
  self-editable via Decap, live on the client's domain.
- **One flat price** `<price>` (not tiers), covering: one page, up to ~5
  sections, launch on their domain, and a short CMS walkthrough.
- **Optional add-ons** (quoted separately, keep them few):
  - *Extra sections* beyond ~5 — `<price>` each.
  - *Care plan* `<price>/mo` — hosting oversight, edits, updates (Phase 10).
  - *Anything multi-page / blog / dynamic* — explicitly a **follow-on project**,
    not part of the one-pager.
- **Proof assets:** 2–3 one-pager examples + a Lighthouse score screenshot (the
  framework's a11y/perf gate makes this easy to produce).

Exit: a single one-pager offer + flat price you can paste into a proposal.

---

## Phase 1 — Source prospects

Build a target list (10–30 at a time) of businesses whose current site is slow,
dated, or unmaintained — the exact pain this stack fixes.
- Segments that fit static content sites: local services, clinics/practices,
  restaurants, tradespeople, small nonprofits, portfolios, event/venue sites.
- For each lead capture: `<lead-name>`, `<company>`, email, current site URL,
  one specific observation (e.g. "no HTTPS," "not mobile-friendly," "load >5s").
- Log leads in the tracker (Appendix C).

Exit: a list where every row has a real, specific observation (no generic
blasts).

---

## Phase 2 — Outreach  **[approve-before-send]**

Send a short, specific first email; follow up 2–3 times spaced a few days
apart. **Every send requires human approval** — an assistant drafts, a human
approves the actual send. Templates in Appendix A.

Cadence:
1. **Day 0** — first email (specific observation + one concrete benefit).
2. **Day 3** — short bump ("did this reach you?").
3. **Day 7** — value nudge (a Lighthouse/before-after screenshot of their site).
4. **Day 12** — polite breakup ("closing the loop").

Rules:
- One specific, true observation per email — never a mass-merge that reads as
  spam.
- Warm up the sending domain and keep volume sane (deliverability > volume).
- Track status per lead; stop the sequence the moment they reply.

Exit: replies triaged into *interested → book discovery* vs *not now → nurture*.

---

## Phase 3 — Discovery call  **[gate: qualified?]**

A 20–30 min call to qualify and scope. Qualify on: real need, budget fit,
decision-maker present, realistic timeline.

Discovery questions:
- What's the site's #1 job (calls, bookings, credibility, catalog)?
- Who will edit content, and how often? (validates the Decap CMS fit)
- What sections does the one page need (hero, about, services, testimonials,
  contact)? (maps to the single-file content model in build-part-1 §5)
- Domain: do they own one? Where? (sets up ownership plan, build-part-2 §10)
- Any dynamic needs — payments, logins, forms? (triggers the hosting decision
  point; may push to the Cloudflare Pages track or out of scope)
- Timeline and budget range.

**[gate]** Proceed only if: genuine need + budget fits a tier + you're talking
to the decision-maker. Otherwise → nurture list.

Exit: enough to write an accurate proposal; tier chosen.

---

## Phase 4 — Proposal, contract & deposit  **[gate: signed + deposit?]**

Send a proposal that turns into a contract that turns into an invoice — one
flow, no re-keying (use an all-in-one like Moxie/Agiled/Taskip, or
PandaDoc/Proposify for the doc).

Proposal contents:
- Scope in plain language: **one page** with the agreed sections, CMS editing,
  launch on their domain. **Out of scope** (separate quote): extra pages, blog,
  server-side/LLM features.
- Deliverables tied to the build-part-2 launch checklist (§11).
- Ownership model (build-part-2 §10) stated up front.
- Price (tier from Phase 0), timeline, and terms: **deposit to start**
  (e.g. 50%), balance on launch.

**[gate]** Do not start building until the contract is **signed** and the
**deposit has cleared**.

Exit: signed contract + deposit received → move to build.

---

## Phase 5 — Build the MVP  → invoke build-part-1

Kickoff/asset collection, then execute
[`./build-part-1-mvp.md`](./build-part-1-mvp.md) end to end.

**First, run the `intake-research` skill** — `/intake-research <business-name>`
(with a location or URL to disambiguate). It researches the business's public
Google Business Profile, reviews, and social presence and returns a **content
brief** pre-mapped to build-part-1 §5, plus a "confirm-with-client" and a
"missing" list. This gives you a sourced first draft of the copy instead of a
blank page — but it *drafts*, it doesn't decide: the client ratifies the facts.

Collect from the client first (blocks the build if missing):
- [ ] Section list for the one page (hero + which sections) → the content model
      (build-part-1 §5). **Required to start** — the schema can't be written
      without it. The intake brief proposes this; confirm it.
- [ ] Client ratification of the intake brief's facts (services, about copy,
      contact email, any testimonials) — resolve its "confirm/missing" lists.
- [ ] Brand assets: logo, colours, fonts, tone (the intake brief flags what it
      found vs. what's still needed).
- [ ] Real content (or an agreement that you'll draft placeholder + they fill via
      Decap after training in Part 2).
- [ ] Domain + registrar access and GitHub + Cloudflare account/collaborator
      setup — **needed for Phase 7, not now**; line them up so launch isn't
      blocked (build-part-2 §1, §10).

Then run Part 1: scaffold Astro → content model (schema + `home.md`, committed in
git, seeded from the confirmed intake brief) → GitHub Actions deploy. Do **not**
implement server-side/LLM features — out of scope by default.

Exit: site builds clean and deploys to a **shareable `github.io` link**, MVP
quality bar green (build-part-1 §8).

---

## Phase 6 — Client review

- Share the **MVP link** from Part 1 (`https://<repo-owner>.github.io/<repo-name>/`).
- Collect revisions in **one consolidated list** (avoid drip-feed scope creep).
- Bound revision rounds per the contract (e.g. 2 rounds included; further rounds
  billed).
- The client edits nothing directly yet — the Decap `/admin/` editing flow lands
  in Phase 7 (build-part-2 §7). Note it as coming so they know it's on the way.

Exit: client's consolidated revisions applied to the MVP; they're ready to sign
off on going live.

---

## Phase 7 — Launch  → invoke build-part-2  **[gate: client sign-off]**

**[gate]** Get explicit written go-live approval, then execute
[`./build-part-2-live.md`](./build-part-2-live.md): domain → Cloudflare
DNS/SSL/CDN → the `base` flip to the domain root → edge hardening → Decap CMS
editing → full quality gate. Finish on its **Launch verification checklist
(build-part-2 §11)**:
- Custom domain live with valid HTTPS on apex + `www`.
- CI deploy green end-to-end; content change appears (no stale cache).
- `/admin/` login + publish works for a real collaborator.
- Analytics receiving hits; security headers present; Lighthouse/a11y green.

Exit: site live at `<domain>`, all checklist items pass.

---

## Phase 8 — Handoff & training

Execute build-part-2 **§10 (Client handoff & ownership)**:
- Transfer/confirm ownership (registrar, GitHub, Cloudflare) per the agreed
  model.
- 20-min **Decap CMS walkthrough** + one-page "how to add/edit a post" sheet.
- "Where things live" doc: repo, `/admin/`, Cloudflare dashboard, analytics.

Exit: client can independently edit and publish content.

---

## Phase 9 — Final invoice  **[gate: paid?]**

- Send the balance invoice on launch (same tool as Phase 4 — no re-keying).
- **[gate]** Confirm payment cleared before considering the engagement closed.
- Ask for a testimonial + referral while satisfaction is highest (see aftercare).

Exit: balance paid; engagement financially closed.

---

## Phase 10 — Aftercare, retainer & upsell

- Offer the **care plan** (Phase 0): hosting oversight, content edits,
  dependency updates, uptime/analytics review.
- Natural upsells to quote separately: extra collections/pages, a blog program,
  SEO work, or — when the client asks for dynamic features — a scoped
  server-side/LLM engagement (deliberately **out of scope** of this framework;
  quote it as a new project).
- Request a **testimonial** and a **referral**; feed referrals back to Phase 1.

Exit: recurring revenue or a warm referral generated.

---

## Appendix A — Outreach templates  (draft; **approve-before-send**)

**A1 · First email (Day 0)**
> Subject: quick note about `<company>`'s website
>
> Hi `<lead-name>`,
>
> I was looking at `<company>` and noticed `<one specific, true observation —
> e.g. the site isn't mobile-friendly / loads slowly / has no HTTPS>`. That's
> usually costing you `<concrete consequence — e.g. mobile visitors / search
> ranking>`.
>
> I build fast, secure **one-page** sites you can edit yourself — a perfect
> low-cost proof of concept. I could show you a quick before/after for
> `<company>`. Worth a 15-minute call this week?
>
> `<your-name>` · `<your-site>`

**A2 · Bump (Day 3)**
> Subject: re: `<company>`'s website
>
> Hi `<lead-name>` — just making sure this reached you. Happy to send a quick
> before/after of your current site if that's easier than a call. — `<your-name>`

**A3 · Value nudge (Day 7)**
> Subject: before/after for `<company>`
>
> Hi `<lead-name>`, I ran your current site through a performance/accessibility
> check — attaching the result and a mock of how a rebuild would score. No
> obligation; happy to walk you through it. — `<your-name>`

**A4 · Breakup (Day 12)**
> Subject: closing the loop
>
> Hi `<lead-name>`, I'll stop here so I'm not cluttering your inbox. If a faster,
> self-editable site is ever useful for `<company>`, just reply and I'll pick it
> back up. — `<your-name>`

Guidance: keep each email under ~90 words; one true observation; never attach
anything you can't back up; stop the sequence on any reply.

---

## Appendix B — Discovery call checklist (paste into notes)

- [ ] Primary goal of the site
- [ ] Who edits content + how often
- [ ] Sections needed on the one page → single-file content model
- [ ] Domain owned? where? → ownership plan
- [ ] Any dynamic needs (payments/login/forms) → hosting decision point
- [ ] Timeline + budget range
- [ ] Decision-maker on the call?
- [ ] Tier recommended: ______

---

## Appendix C — Lead / pipeline tracker fields

Track each lead through the pipeline (spreadsheet or CRM):

| Field | Notes |
|---|---|
| Name / Company | `<lead-name>` / `<company>` |
| Email | contact |
| Current site + observation | the specific hook used in outreach |
| Stage | Sourced · Contacted · Replied · Discovery · Proposed · Won · Lost · Nurture |
| Last touch / next action date | drives the Phase 2 cadence |
| Tier / quoted price | from Phase 0 |
| Contract signed? / Deposit paid? | Phase 4 gate |
| Domain + ownership model | Phase 5 / build-part-2 §10 |
| Launch date | Phase 7 |
| Final paid? | Phase 9 gate |
| Aftercare / referral | Phase 10 |

---

## Guardrails (for a human or an assistant running this)

- **No external message sends without explicit human approval** — every
  outreach email, proposal, and invoice is drafted, then approved, then sent.
- **Never enter the client's credentials or complete their OAuth for them** —
  request access; they authorize.
- **Honor the gates:** no build before signed contract + deposit; no launch
  before written sign-off; no closeout before payment clears.
- **Keep scope honest:** server-side/LLM features are out of scope here; quote
  them separately rather than absorbing them mid-project.

---

## Appendix D — Autonomous execution mode

The default pipeline pauses at every **[gate]** and **[approve-before-send]**.
When the **framework owner explicitly authorizes an autonomous run** of the
*build* (Phases 5–6), an assistant may proceed without pausing, under these
standing rules — this replaces the per-step human gate *only* for the internal
build, never for anything that leaves the building:

- **Still hard-blocked (never autonomous):** any external send (outreach,
  proposal, invoice), entering client credentials/OAuth, spending money, and the
  **go-live gate** (Phase 7) onto a client's real domain. Those still need a
  human. An autonomous run therefore stops at the **shareable `github.io` MVP**
  (end of Phase 6) — it does not launch on the client's domain.
- **Facts vs. copy:** every factual claim (address, hours, phone, services) must
  still be **sourced** per the intake skill. Copy that isn't yet client-ratified
  (hero/about wording, value prop) is written as **clearly-labelled draft
  placeholder**, seeded from sourced facts, for the client to confirm at review.
- **Never invent** an email, review, rating, or service. Missing → omit or leave
  a labelled gap; don't fill a required field with a fake value (e.g. make
  `contact_email` optional rather than inventing one).
- **Publishing the MVP is authorized** by the same instruction, but the public
  page must read as a proof-of-concept draft, not a finished client statement.

### Current autonomous run — Amigos Shop, Tilburg

- **Authorized by:** framework owner (this session), 2026-07-25 — "autonomously
  create a repo and serve the website; don't stop until a testable page exists."
- **Gate status:** Phases 1–4 (outreach→contract) **not applicable / bypassed**
  by owner instruction for a self-owned demo build. Proceeded straight into
  Phase 5 build from the intake brief.
- **Intake brief:** [`./content-brief-amigos-shop.md`](./content-brief-amigos-shop.md).
- **Decisions taken as autonomous defaults (pending client ratification):**
  - Language: **Dutch** (local Tilburg parcel shop, Dutch-speaking customers).
  - Sections: **hero · services · about · hours+contact**. Testimonials
    **omitted** for launch (3.3★ / no permissioned quotes — brief §Testimonials).
  - `contact_email`: **omitted** (none public; schema field made optional) —
    contact is phone + address. Flagged for client.
  - Copy: drafted placeholder from sourced facts; a visible draft banner marks it
    as a proof of concept pending sign-off.
- **Build target:** repo `RickBerends/amigos-shop-tilburg` (gh CLI, account
  RickBerends) → GitHub Pages via Actions.
  - Repo: https://github.com/RickBerends/amigos-shop-tilburg
  - Local project dir: `C:\Users\Xgaming\Desktop\amigos-shop-tilburg`
- **Live MVP link — ✅ LIVE (verified 2026-07-25):**
  → **https://rickberends.github.io/amigos-shop-tilburg/**
  - CI (`.github/workflows/deploy.yml`) green end-to-end; page returns 200; all
    sections render from `home.md`; custom 404 on-brand; no console/asset errors.
  - Build-part-1 §8 verification checklist: all items pass. `robots.txt`
    Disallow-all + `noindex` while it's an unratified draft.
- **Next human step (still gated):** client review of the MVP link (Phase 6),
  collect one consolidated revision list, then the **Phase 7 written go-live
  gate** before any custom-domain launch (build-part-2). Also outstanding for the
  client to ratify: hero/about copy, contact email, exact per-carrier send-vs-
  pickup, and whether to keep the convenience-shop framing.

### Removing approval friction (automation config)

So a re-run of the *build* doesn't stop for tool-permission prompts, the build
tooling is pre-authorized in [`.claude/settings.json`](./.claude/settings.json):

- `permissions.defaultMode: acceptEdits` — scaffold file writes don't prompt.
- `permissions.allow` — `gh`, `git`, `npm`, `npx`, `node`, `mkdir`, `WebSearch`,
  `WebFetch`, `Read/Glob/Grep`, and the `mcp__Claude_Browser` server.
- `permissions.additionalDirectories` includes `Desktop` so the generated
  project folder (a sibling of this framework) is in write-scope.
- `permissions.deny` keeps a few sharp edges guarded (`rm -rf /*`,
  `git push --force*`, `gh secret*`).

Mechanism note: **no GitHub MCP server exists in this environment** — the repo
and Pages steps use the authenticated **`gh` CLI** (account `RickBerends`).
Deploy ordering + the Git-Bash `gh api` leading-slash gotcha are captured in
build-part-1 §6. Intake's Google Maps lookup may still trip a one-time
per-origin browser card (browsing policy, not a settings permission); accept the
consent wall with "reject non-essential".

**Still requires a human — never auto-approved (safety boundary, unchanged):**
any external send (outreach/proposal/invoice), entering client
credentials/OAuth, spending money, and the **Phase 7 go-live** onto a client's
real domain. The automation above only removes friction for the *internal build
→ shareable github.io MVP*; it does not touch these gates.
