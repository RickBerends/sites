# Orchestration: client website engagement (outreach → build → handoff → paid)

This is the **top-level runbook** that drives a full client engagement. It
*calls* the build playbook at the build step and *owns* everything around it —
outreach, qualification, close, kickoff, review, launch, handoff, and invoicing.

- **Build sub-playbooks:** the technical "how to build the site" steps, split in
  two — [`./build-part-1-mvp.md`](./build-part-1-mvp.md) (MVP as a project in the
  sites monorepo, on a shareable `github.io/<sites-repo>/<slug>/` link) and
  [`./build-part-2-live.md`](./build-part-2-live.md) (go live on the client's
  domain + editing). This orchestration invokes Part 1 at **Phase 5**, reviews its
  output at **Phase 6**, and runs Part 2 across **Phases 7–8**. It never
  duplicates their content.
- **Skills invoked (all under `.claude/skills/`):**
  - `intake-research` — turns a business name into a sourced **content brief**
    that fills build-part-1 §5. `/intake-research <business-name>` at **Phase 5
    kickoff**.
  - `visual-identity` — maps the business category to one of three restrained
    **looks** (colours, two fonts, motion) → design tokens for the build. **Phase
    5 design.**
  - `lovable-page` — decides the **sections and copy** that make a visitor trust
    the business in 5 seconds (hero → trust → services → about → reviews →
    location → hours → contact). **Phase 5 design.**
- **Two structural rules the framework now enforces** (feedback baked in):
  - **Monorepo, not one repo per client.** Every site is `projects/<slug>/` in a
    single **sites monorepo**; one shared workflow builds only changed projects.
  - **Only in git.** The working copy is a clone of that repo; everything is
    committed and pushed. No loose local project folders outside version control.
- **Runnable by:** you, or an AI assistant following it step by step. Steps
  marked **[gate]** require a human decision before proceeding. Steps marked
  **[approve-before-send]** must not go out without explicit human sign-off
  (all external client communication).

Placeholders: `<lead-name>`, `<company>`, `<owner>`, `<sites-repo>`, `<slug>`,
`<domain>`, `<price>`, `<your-name>`, `<your-site>`. Fill per engagement.

---

## Pipeline at a glance

```

5. Build        → /intake-research  → design (visual-identity + lovable-page)
                → build-part-1-mvp.md into projects/<slug>/  (shareable subpath)
6. Review       → share the MVP link, collect revisions
7. Launch       → build-part-2-live.md (Cloudflare Pages + domain) [gate: sign-off]
```

Advance only when a phase's exit criteria are met. Never skip a **[gate]**

---


## Phase 5 — Build the MVP  → invoke build-part-1

Kickoff → research → **design** → build. Three skills feed the build, then
[`./build-part-1-mvp.md`](./build-part-1-mvp.md) executes it end to end **inside
the monorepo**.

**5a. Research — run the `intake-research` skill.**
`/intake-research <business-name>` (with a location or URL to disambiguate). It
researches the business's public Google Business Profile, reviews, and social
presence and returns a **content brief** pre-mapped to build-part-1 §5, plus a
"confirm-with-client" and a "missing" list. A sourced first draft, not a blank
page — but it *drafts*.
Store as artifact, unload afterwards. 

**5b. Design — run `visual-identity` + `lovable-page`** (this is the new step the
feedback asked for; do it *before* writing components):
- `visual-identity` → pick identity **A (Crafted Masculine) / B (Soft Boutique) /
  C (Editorial Food)** from the category and emit design tokens (palette, two
  fonts, radii, motion) into `projects/<slug>/src/styles/global.css`. One accent,
  two fonts, restrained motion — never mix identities.
- `lovable-page` → decide the **sections and copy** (hero · trust strip ·
  services-as-outcomes · about · social proof · location · hours · contact) so a
  visitor answers *what is this / why trust them / how to contact* in 5 seconds.
  Its section list *is* the content schema.
- If we don't have images yet, make sure we find them online. Use stock pictures to reflect idea.

Collect from the client first (blocks the build if missing):
- [ ] Section list for the one page → the content model (build-part-1 §5).
      **Required to start.** `lovable-page` proposes it from the intake brief;
      confirm it.
- [ ] Client ratification of the intake brief's facts (services, about copy,
      contact email, any testimonials) — resolve its "confirm/missing" lists.
      **Never invent** reviews, ratings, or a contact email.
- [ ] Brand assets: logo, colours, fonts, tone. `visual-identity` supplies a
      trustworthy default per category; adapt the accent only for a real reason
      (e.g. an existing logo colour).
- [ ] Real content (or an agreement that you'll draft placeholder + they fill via
      Decap after training in Part 2).
- [ ] Domain + registrar access and GitHub + Cloudflare account/collaborator
      setup — **needed for Phase 7, not now**; line them up so launch isn't
      blocked (build-part-2 §1, §10).

**5c. Build — run Part 1 in the monorepo (only in git).** In the **sites-monorepo
clone**: scaffold Astro into `projects/<slug>/` → apply the `visual-identity`
tokens and `lovable-page` sections → content model (schema + `home.md`, committed
in git, seeded from the confirmed brief) → commit + push; the shared workflow
detects the changed project and deploys only it. Do **not** create a separate repo
per client, do **not** leave files in a loose local folder, and do **not**
implement server-side/LLM features — all out of scope by default.

Exit: the project builds clean and deploys to a **shareable
`github.io/<sites-repo>/<slug>/` link** without disturbing other projects; MVP
quality bar green (build-part-1 §8); identity tokens applied and the lovable-page
conversion checklist passes.

---

## Phase 6 — Client review

- Share the **MVP link** from Part 1
  (`https://<owner>.github.io/<sites-repo>/<slug>/`).
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
[`./build-part-2-live.md`](./build-part-2-live.md): graduate this one project onto
its own domain via a **Cloudflare Pages** project (root directory
`projects/<slug>`) → Cloudflare DNS/SSL/CDN → the `base` flip from
`/<sites-repo>/<slug>` to `/` → edge hardening → Decap CMS editing → full quality
gate. One client goes live at a time; the rest of the monorepo is untouched.
Finish on its **Launch verification checklist (build-part-2 §11)**:
- Custom domain live with valid HTTPS on apex + `www`.
- CI deploy green end-to-end; content change appears (no stale cache).
- `/admin/` login + publish works for a real collaborator.
- Analytics receiving hits; security headers present; Lighthouse/a11y green.

Exit: site live at `<domain>`, all checklist items pass.

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
  human. An autonomous run therefore stops at the **shareable
  `github.io/<sites-repo>/<slug>/` MVP** (end of Phase 6) — it does not launch on
  the client's domain.
- **Monorepo + git-only even when autonomous:** the build lands as
  `projects/<slug>/` in the sites monorepo and is committed/pushed; no new
  per-client repo, no untracked local folder.
- **Design skills run in the autonomous build:** `visual-identity` picks the
  identity/tokens and `lovable-page` sets sections + copy, before components — so
  the MVP looks trustworthy, not just present.
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
- **Build target (as originally shipped — standalone repo, pre-monorepo):** repo
  `RickBerends/amigos-shop-tilburg` (gh CLI, account RickBerends) → GitHub Pages
  via Actions.
  - Repo: https://github.com/RickBerends/amigos-shop-tilburg
  - Live MVP link — ✅ LIVE (verified 2026-07-25):
    **https://rickberends.github.io/amigos-shop-tilburg/**
  - CI green end-to-end; page returns 200; all sections render from `home.md`;
    custom 404 on-brand; no console/asset errors. Build-part-1 §8 checklist: all
    pass. `robots.txt` Disallow-all + `noindex` while it's an unratified draft.
- **Migration to the monorepo (feedback #1):** this site should move into the
  sites monorepo as `projects/amigos-shop-tilburg/` (git-only), with its
  `astro.config.mjs` `base` changed from `/amigos-shop-tilburg` to
  `/<sites-repo>/amigos-shop-tilburg` so it serves at
  `https://<owner>.github.io/<sites-repo>/amigos-shop-tilburg/`. Until then the
  standalone repo above stays live; migrate it on the next touch rather than
  breaking the working link now. **No local Desktop copy is the source of truth —
  the monorepo clone is.**
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
- `permissions.additionalDirectories` points at the **monorepo root**
  (`…\website-framework`) so the in-repo `projects/<slug>` folders are in
  write-scope — no longer `Desktop`, since sites no longer live in loose sibling
  folders (feedback #1).
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
