---
name: orchestration
description: >-
  Top-level runbook that drives a full client website engagement end to end —
  offer, sourcing, cold outreach, discovery, proposal, build, review, launch,
  handoff, and invoicing. Use this whenever you're managing or advancing a
  client engagement across its lifecycle (not just building a single site):
  starting outreach, qualifying a lead, sending a proposal, kicking off a
  build, reviewing an MVP, going live, handing off, or invoicing. It calls the
  intake-research, visual-identity, and lovable-page skills plus the build
  sub-playbooks at the appropriate phases, and builds every site as a project in
  the sites monorepo (git-only, no per-client repos). Trigger it any time someone
  wants to run, resume, or figure out the next step in the client pipeline, even
  if they don't say the word "orchestration".
---

Follow the full engagement runbook, step by step, from **`orchestration.md` in
the repo root**. Read it first, then execute it. It owns the whole pipeline and
invokes sub-skills and sub-playbooks at specific phases:

- `intake-research` skill — via `/intake-research <business-name>` at Phase 5a
  (research → sourced content brief).
- `visual-identity` skill — Phase 5b (business category → identity A/B/C).
- `lovable-page` skill — Phase 5b (sections + trust-building copy).
- **`BUILD.md`** — Phase 5c. This is the build hot path: generate the project with
  `node scripts/new-site.mjs <slug> --identity=<A|B|C> --name="…"`, then write
  `src/content/home.md`. Reviewed at Phase 6.
- `build-part-1-mvp.md` — the *why* behind the build (monorepo layout, quality
  bar, verification checklist). Read it when something goes wrong, not on the
  happy path.
- `build-part-2-live.md` — Phases 7–8 (Cloudflare Pages + domain + Decap CMS).

All of these live in the repo root alongside `orchestration.md`, so its relative
links (`./build-part-1-mvp.md`, etc.) resolve as written.

**Two structural rules the runbook enforces:** build every site as
`projects/<slug>/` in the **sites monorepo** (one shared workflow builds only
changed projects), and keep everything **only in git** — the working copy is a
clone; commit and push, never loose local folders.

Respect the guardrails in the runbook: steps marked **[gate]** need a human
decision before proceeding, and steps marked **[approve-before-send]** must not
go out without explicit human sign-off (all external client communication).
