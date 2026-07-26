# What orchestration.md does — pipeline diagram

The full client engagement (Phases 0–10). `[gate]` = human decision required;
`[approve]` = no external send without explicit sign-off. Phase 5 fans out into
the three skills before the build.

```mermaid
flowchart TD
    P0["Phase 0 · Offer<br/>one one-pager · one flat price"] --> P1
    P1["Phase 1 · Source<br/>target list + specific observation"] --> P2
    P2["Phase 2 · Outreach<br/>cold email + follow-ups"]:::approve --> P3
    P3{"Phase 3 · Discovery<br/>qualified?"}:::gate -->|yes| P4
    P3 -->|no| NURT["Nurture list"]:::side
    P4{"Phase 4 · Proposal<br/>signed + deposit?"}:::gate -->|yes| P5
    P4 -->|no| NURT

    subgraph BUILD ["Phase 5 · Build the MVP  —  monorepo, git-only"]
        direction TB
        R["5a · intake-research<br/>name → sourced content brief"] --> D
        subgraph DESIGN ["5b · Design"]
            direction LR
            VI["visual-identity<br/>category → colours · 2 fonts · motion"]
            LP["lovable-page<br/>sections + trust copy (5-sec test)"]
        end
        D[" "]:::hidden --> B
        VI --- LP
        R --> VI
        R --> LP
        B["5c · build-part-1-mvp.md<br/>scaffold into projects/&lt;slug&gt;/<br/>commit + push → build only changed"]
    end

    P5 --> BUILD
    BUILD --> MVP(["MVP live:<br/>github.io/&lt;sites-repo&gt;/&lt;slug&gt;/"]):::link
    MVP --> P6
    P6["Phase 6 · Review<br/>one consolidated revision list"] --> P7
    P7{"Phase 7 · Launch  [gate: sign-off]<br/>build-part-2 · Cloudflare Pages<br/>root dir projects/&lt;slug&gt; + domain"}:::gate --> P8
    P8["Phase 8 · Handoff<br/>ownership + Decap CMS training"] --> P9
    P9{"Phase 9 · Invoice<br/>paid?"}:::gate --> P10
    P10["Phase 10 · Aftercare<br/>retainer · upsell · referral"] -.referral.-> P1

    classDef gate fill:#243446,stroke:#5B7C6F,color:#fff,stroke-width:2px;
    classDef approve fill:#BB6842,stroke:#7a3f22,color:#fff;
    classDef link fill:#5B7C6F,stroke:#33423,color:#fff;
    classDef side fill:#eee,stroke:#999,color:#555;
    classDef hidden fill:none,stroke:none,color:none;
```

**Autonomous mode** (framework owner authorizes): Phases 5a→6 may run without
pausing, but it **stops at the shareable MVP** — every external send, credential
entry, spend, and the Phase 7 go-live still require a human.
