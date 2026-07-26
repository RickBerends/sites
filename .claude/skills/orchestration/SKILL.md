---
name: orchestration
description: >-
  Top-level runbook that drives a full client website engagement end to end —
  offer, sourcing, cold outreach, discovery, proposal, build, review, launch,
  handoff, and invoicing. Use this whenever you're managing or advancing a
  client engagement across its lifecycle (not just building a single site):
  starting outreach, qualifying a lead, sending a proposal, kicking off a
  build, reviewing an MVP, going live, handing off, or invoicing. It calls the
  intake-research skill and the build sub-playbooks at the appropriate phases.
  Trigger it any time someone wants to run, resume, or figure out the next step
  in the client pipeline, even if they don't say the word "orchestration".
---

Follow the full engagement runbook, step by step, from this file:

`C:\Users\Xgaming\Desktop\website-framework\orchestration.md`

Read that file first, then execute it. It owns the whole pipeline (Phases 0–10)
and invokes sub-playbooks at specific phases:

- `intake-research` skill — via `/intake-research <business-name>` at Phase 5 kickoff.
- `build-part-1-mvp.md` — invoked at Phase 5, reviewed at Phase 6.
- `build-part-2-live.md` — run across Phases 7–8.

The runbook's relative links (`./build-part-1-mvp.md`, etc.) resolve from its own
location in the `website-framework` folder, so always read those companion files
from that same directory.

Respect the guardrails in the runbook: steps marked **[gate]** need a human
decision before proceeding, and steps marked **[approve-before-send]** must not
go out without explicit human sign-off (all external client communication).
