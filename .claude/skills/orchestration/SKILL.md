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

Follow the full engagement runbook, step by step, from this file:

`C:\Users\Xgaming\Desktop\website-framework\orchestration.md`

Read that file first, then execute it. It owns the whole pipeline (Phases 0–10)
and invokes sub-skills and sub-playbooks at specific phases:

- `intake-research` skill — via `/intake-research <business-name>` at Phase 5a
  (research → sourced content brief).
- `visual-identity` skill — Phase 5b (business category → colours/fonts/motion).
- `lovable-page` skill — Phase 5b (sections + trust-building copy).
- `build-part-1-mvp.md` — Phase 5c (scaffold into `projects/<slug>/`), reviewed at
  Phase 6.
- `build-part-2-live.md` — Phases 7–8 (Cloudflare Pages + domain + Decap CMS).

The runbook's relative links (`./build-part-1-mvp.md`, etc.) resolve from its own
location in the `website-framework` folder, so always read those companion files
from that same directory.

**Two structural rules the runbook enforces:** build every site as
`projects/<slug>/` in the **sites monorepo** (one shared workflow builds only
changed projects), and keep everything **only in git** — the working copy is a
clone; commit and push, never loose local folders.

Respect the guardrails in the runbook: steps marked **[gate]** need a human
decision before proceeding, and steps marked **[approve-before-send]** must not
go out without explicit human sign-off (all external client communication).
