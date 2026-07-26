# Build — Part 2: Go live + client editing

**Goal of this part:** take the working MVP from
[`./build-part-1-mvp.md`](./build-part-1-mvp.md) — a one-page Astro site living at
`projects/<slug>/` in the sites monorepo, on a
`github.io/<sites-repo>/<slug>/` link — and turn it into a **production launch on
the client's own domain**, hardened at the edge, with **non-technical editing**
via Decap CMS so the client can change content without touching code or git.

**Monorepo, one client goes live at a time.** The MVP shares one GitHub Pages
deployment with every other project (build-part-1 §6). Going live means
**graduating this one project onto its own custom domain** without disturbing the
others. On a single GitHub Pages site you get exactly one custom domain (one
`CNAME` for the whole repo), so per-client domains are done on the **Cloudflare
Pages track (§8)**: a Cloudflare Pages project whose *root directory* is
`projects/<slug>` gets its own domain, its own `base: '/'`, and deploys straight
from the same monorepo. The GitHub Pages custom-domain track (§5) still works,
but only for the *one* project you'd point the whole repo's domain at — treat it
as the fallback, not the default.

**Assumes Part 1 is done:** the project scaffolds under `projects/<slug>/`, builds
clean, and deploys via the monorepo workflow. This part adds the domain,
Cloudflare, the CMS, the full quality gate, and the client handoff.

**Only in git.** As in Part 1: all changes are committed and pushed inside the
monorepo — no loose local folders, no hand-managed files outside version control.

Placeholders: `<domain>`, `<owner>/<sites-repo>`, `<slug>`, `<worker-name>`,
`<cf-account>`. Replace per project (see §9 for the init step that stamps these).

---

## 0. What Part 2 adds (and one fork to know up front)

Part 2 layers on: a custom **domain**, **Cloudflare** for DNS/SSL/CDN/security/
analytics, the **`base` flip** to the domain root, **Decap CMS** for editing,
the **full** SEO/a11y/security gate, and **handoff/ownership**.

**Hosting decision point (know it up front):** a purely static host serves files
only. The moment a feature needs real per-request logic (transactional email
without a third-party service, payments, auth-gated content, dynamic APIs),
that's a fork:
- **Small dynamic need** → add a static-friendly function (a Cloudflare Pages
  Function / Worker, or a service like Formspree for forms).
- **Substantial dynamic need** → this is where the **Cloudflare Pages track
  (§8)** earns its place, since it ships serverless functions in-repo.

Don't force server-side logic onto plain GitHub Pages. Server-side/LLM features
remain out of scope in this document.

---

## 1. Added prerequisites

Beyond Part 1's GitHub + Node:

- [ ] A registrar account (Vimexx, TransIP, Namecheap, Cloudflare Registrar…).
      Any works — DNS is delegated to Cloudflare anyway.
- [ ] A free Cloudflare account.
- [ ] Domain name decided (`<domain>`).
- [ ] For editing: ability to create a **GitHub OAuth App** and deploy a small
      **Cloudflare Worker** (or a Pages Function on the §8 track).
- [ ] Host-track decision: stay on **GitHub Pages** (§4–§5) or move to
      **Cloudflare Pages** (§8) — see §8 for how to choose.

---

## 2. Domain registration

Register `<domain>`. Don't configure DNS records at the registrar beyond the
default — Cloudflare takes over DNS via a nameserver change in §4.

**Ownership note (paid work):** decide now who *owns* the domain. Default and
recommended: the **client owns the registrar account and domain**, and you get
delegated access. See §10.

---

## 3. Content model — the editing half (add the third file)

Part 1 kept **two** files in sync: the zod schema
(`projects/<slug>/src/content.config.ts`) and the markdown
(`projects/<slug>/src/content/home.md`). Adding a CMS introduces a **third**
(`projects/<slug>/public/admin/config.yml`). All three live inside the project
folder — Decap edits only that one project.

3. **Decap's config** (`public/admin/config.yml`) — a **file collection** (one
   file, not a folder), one field per section, mirroring the zod schema:

   ```yaml
   collections:
     - name: home
       label: 'Home page'
       files:
         - name: home
           label: 'Home page content'
           file: src/content/home.md
           fields:
             - { label: 'Hero heading', name: hero_heading, widget: string }
             - { label: 'Hero subtext', name: hero_sub, widget: text }
             - { label: 'About', name: about, widget: markdown }
             - label: 'Services'
               name: services
               widget: list
               fields:
                 - { label: 'Title', name: title, widget: string }
                 - { label: 'Body', name: body, widget: text }
             - { label: 'Contact email', name: contact_email, widget: string }
   ```

**The three-file sync rule:** every CMS field must have a matching zod field, or
the build breaks on the next deploy even though Decap saved happily (Decap has no
knowledge of Astro's schema — it just writes YAML). When you add or rename a
section field, touch `content.config.ts` **and** `config.yml` together.

**Images for editors:** point Decap's `media_folder` at `src/assets/uploads` so
uploads flow through Astro's `astro:assets` pipeline (responsive sizes + modern
formats) just like developer-committed images.

---

## 4. Cloudflare: DNS, SSL, CDN

1. dash.cloudflare.com → **Add a domain** → `<domain>` → **Free** plan.
2. At the registrar, change nameservers to the two Cloudflare assigns. Minutes
   to ~24h to propagate — Cloudflare emails when active.
3. Once active, **DNS** tab. For the **GitHub Pages track**, add:

   | Type | Name | Value | Proxy |
   |---|---|---|---|
   | A | @ | 185.199.108.153 | see cert note |
   | A | @ | 185.199.109.153 | see cert note |
   | A | @ | 185.199.110.153 | see cert note |
   | A | @ | 185.199.111.153 | see cert note |
   | CNAME | www | `<owner>.github.io` | see cert note |

   (Those four IPs are GitHub Pages' fixed addresses — same for every site.)
   For the **Cloudflare Pages track**, DNS is added automatically when you attach
   the custom domain in the Pages dashboard (§8).
4. **SSL/TLS** → mode **Full (Strict)**. GitHub Pages and Cloudflare Pages both
   serve valid publicly-trusted certs, so Strict works and is safest. **Never use
   "Flexible"** — it causes redirect loops with the host's own HTTPS enforcement.
5. **SSL/TLS → Edge Certificates** → turn on **Always Use HTTPS**.

**Cert-provisioning gotcha (GitHub Pages track):** GitHub provisions its cert via
an HTTP ACME challenge, which Cloudflare's proxy (orange cloud) can block — so
the "Enforce HTTPS" box in §5 may never appear and the cert stays "pending." Fix:
set the A/CNAME records to **DNS-only (grey cloud)** first, let GitHub finish
provisioning and expose Enforce HTTPS, then flip them back to **Proxied** to get
the CDN/analytics/security benefits.

---

## 5. Wire the custom domain (GitHub Pages track — fallback only) + the `base` flip

> **Monorepo caveat:** GitHub Pages allows **one** custom domain per repo (one
> `CNAME` for the whole `gh-pages` site). In a monorepo that domain serves the
> shared site — projects would sit at `https://<domain>/<slug>/`, not at the
> domain root. So this track only fits **one** flagship project you'd dedicate the
> repo's single domain to. For a per-client domain, use the **Cloudflare Pages
> track (§8)** instead — it's the default for going live in the monorepo.

1. Repo → **Settings → Pages → Custom domain** → enter `<domain>` → Save. GitHub
   auto-generates a `CNAME` file at repo root. Don't also hand-author that file —
   let GitHub own it once wired.
2. When **Enforce HTTPS** becomes available (see cert gotcha above), enable it.
3. Update `astro.config.mjs` — **this is the `base` flip from Part 1**:

   ```js
   export default defineConfig({
     site: 'https://<domain>',
     base: '/',
     // ...
   });
   ```

   Drops the `/<sites-repo>/<slug>` subpath — the site now lives at the domain
   root.
4. **Verify:** visit `https://<domain>` and `https://www.<domain>`, click
   internal links, confirm no doubled paths (`/<sites-repo>/<slug>/<slug>/…`).

---

## 6. Edge hardening: cache + security headers + analytics

**a. Caching (prevents "I published but nothing changed").** Because Cloudflare
proxies in front of the host, HTML can be served stale after a deploy. Do one of:
- A **Cache Rule**: when `Content-Type` contains `text/html` → **Bypass cache**
  (assets stay cached by fingerprinted filename). Simplest.
- Or a CI step that **purges Cloudflare cache** via API token after deploy.

**b. Security response headers.** Static hosts can't set headers, but the
Cloudflare proxy can via a **Response Header Transform Rule** (or a `_headers`
file on the Cloudflare Pages track). Baseline: `Content-Security-Policy` (start
report-only), `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`,
`Strict-Transport-Security` (via Always Use HTTPS + HSTS toggle).

**c. Web Analytics.** **Analytics & Logs → Web Analytics** → enable **Automatic
RUM injection** for the zone (requires proxied DNS). Free, cookieless, no cookie
banner, nothing hardcoded in the repo to leak.

---

## 7. Decap CMS + Cloudflare Worker OAuth proxy (the edit possibility)

**Why a Worker:** Decap's GitHub backend needs a server-side OAuth code→token
exchange that a static host can't perform. A tiny Worker fills that gap for free.
*(On the Cloudflare Pages track you can use a Pages Function instead of a
standalone Worker.)*

1. Deploy an OAuth-proxy Worker (e.g. the open-source `sveltia-cms-auth`, or
   Decap's reference proxy) via `wrangler` to
   `https://<worker-name>.<cf-account>.workers.dev`.
2. Create a GitHub OAuth App (repo owner's GitHub → Settings → Developer settings
   → OAuth Apps) with callback URL → the Worker's auth endpoint.
3. Store Client ID + Secret as **Worker secrets** (`wrangler secret put …`).
   Never commit them to the site repo.
4. In the site repo add:
   - `public/admin/index.html` — Decap's standard bootstrap.
   - `public/admin/config.yml` (the §3 collection block, plus the backend):

     ```yaml
     backend:
       name: github
       repo: <owner>/<sites-repo>
       branch: main
       base_url: https://<worker-name>.<cf-account>.workers.dev
       auth_endpoint: auth
     site_url: https://<domain>/
     display_url: https://<domain>/
     media_folder: src/assets/uploads
     public_folder: /uploads
     publish_mode: simple
     collections:
       # the home file-collection from §3
     ```

5. **Access control:** GitHub repo-collaborator permissions gate *writes* —
   anyone can click "Login with GitHub," but only collaborators can save.
6. **`publish_mode` decision point:**
   - `simple` — each save publishes to the live branch. Best for a small, trusted
     editor team.
   - `editorial_workflow` — drafts → PR → merge; adds a review step editors must
     learn. Default to `simple` unless review-before-publish is a real
     requirement.

---

## 8. Cloudflare Pages track (the default for going live in a monorepo)

Use **Cloudflare Pages** to launch a monorepo project on its own domain. Because
each Cloudflare Pages project points at a **root directory** inside the repo, you
get **one Pages project (and one custom domain) per `projects/<slug>`** — the
clean answer to "how does a monorepo give each client their own domain." It also
collapses several decision points at once:

- **One custom domain per project** — attach `<domain>` to *this* project only;
  the other monorepo sites are untouched (GitHub Pages can't do this — one CNAME
  per repo).
- **Per-branch / PR preview deploys** — unique URLs for client review before
  launch.
- **Pages Functions** — serverless in-repo, so contact-form handling and the
  Decap OAuth exchange can live in the same repo (no separate Worker).
- **`_headers` and `_redirects`** files for security headers and redirects (do
  §6b in-repo instead of via dashboard rules).
- Still free, still Git-driven.

Setup (replaces §5/§7's hosting mechanics — repeat once per client going live):
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** →
   pick `<owner>/<sites-repo>` (the whole monorepo).
2. **Root directory** = `projects/<slug>` · build command `npm run build` ·
   output directory `dist` (i.e. `projects/<slug>/dist`). This is what scopes the
   Pages project to a single site in the monorepo.
3. **Custom domains** tab → add `<domain>` and `www.<domain>` → Cloudflare wires
   DNS + SSL automatically (no cert gotcha, no four A records).
4. `projects/<slug>/astro.config.mjs`: `site: 'https://<domain>'`, `base: '/'` —
   the **base flip** from Part 1's `/<sites-repo>/<slug>` down to the domain root.
5. Add `projects/<slug>/public/_headers` for the §6b security headers and
   `public/_redirects` for `www → apex` (or vice versa).

> **Keep the MVP link working too (optional):** the project still builds under the
> monorepo's GitHub Pages deploy at `/<sites-repo>/<slug>/` unless you remove it.
> Once the custom domain is live, either leave the subpath as a staging mirror or
> add a redirect; don't let two indexable copies compete for SEO.

**Choose GitHub Pages (§5)** only for the single project you'd point the whole
repo's one domain at, or a purely static brochure with no review workflow.
**Choose Cloudflare Pages** for essentially all client launches in the monorepo.
Everything else (Astro, Decap, content model, gates, handoff) is identical across
both tracks.

---

## 9. Full quality gate + templating

**Raise the Part 1 lean bar to a production gate (CI):**
- **`@astrojs/sitemap`** + **`public/robots.txt`** (already in from Part 1).
- **SEO baseline in the base layout:** `<title>`/meta description, canonical URL,
  **Open Graph + Twitter** tags, and **JSON-LD** structured data (Organization /
  Article / LocalBusiness as fits the client).
- **Accessibility + performance gate:** run **pa11y** or **axe** and/or
  **Lighthouse CI** against the preview with a budget (e.g. a11y ≥ 95, perf ≥
  90). "We ship 95+ Lighthouse and pass a11y" is a concrete selling point.
- **Internal link checker** kept green (from Part 1 §7).
- A real, on-brand **404** (already in from Part 1).

**Templating — make each new client fast (monorepo edition).** New clients are
new folders under `projects/`, not new repos:
- Keep a canonical `projects/_starter/` (or a `degit`-able template) with all of
  Part 1 + Part 2 wired and placeholders in place (`<domain>`, `<owner>`,
  `<sites-repo>`, `<slug>`, `<worker-name>`, `<cf-account>`).
- Spin up a new site by copying `_starter` to `projects/<slug>`, then run a small
  `scripts/init.mjs` that prompts for the placeholder values and stamps them across
  that project's `astro.config.mjs` and `public/admin/config.yml`. The root
  `.github/workflows/deploy.yml` needs no edits — change detection picks the new
  folder up automatically.
- Result: a new client goes from an afternoon to ~30 minutes of setup, and the
  shared workflow/CI never has to be re-authored.

---

## 10. Client handoff & ownership (delivering this as a service)

Document and agree **before** build who owns each asset:
- **Recommended:** client owns the **registrar/domain**, **GitHub repo** (or
  org), and **Cloudflare account/zone**; you are added as a collaborator/member.
  The client owns their assets; you're not a single point of failure and there's
  no hostage situation if they leave.
- **Managed-service alternative:** you hold the accounts and bill it through. If
  so, state transfer terms explicitly in the contract so departure isn't a
  dispute.

Handoff deliverables:
- [ ] Access transferred/collaborator invites sent (registrar, GitHub, CF).
- [ ] 20-min **Decap CMS walkthrough** for the editor(s) + a one-page "how to
      add/edit content" cheat sheet.
- [ ] "Where things live" doc: repo URL, `/admin/` URL, CF dashboard, analytics.
- [ ] Backup/restore note (the repo *is* the backup; content is in git).

---

## 11. Launch verification checklist

- [ ] `npm run build` clean locally, no errors.
- [ ] `https://<domain>` and `https://www.<domain>` resolve with valid HTTPS.
- [ ] Test commit to `main` → green CI end-to-end → change visible live.
- [ ] Log into `/admin/` as a real collaborator, complete GitHub OAuth, make +
      publish a test edit, confirm live.
- [ ] Cache behaves: a content change actually appears within a deploy cycle (no
      stale HTML).
- [ ] Cloudflare Web Analytics shows hits.
- [ ] Security headers present (check with an online header scanner).
- [ ] Lighthouse/pa11y gate green; click-through desktop + mobile; light/dark if
      the design system has both.
- [ ] 404 page is on-brand.

---

## Appendix A — Decision points to make explicit each time

| Decision | Default lean | Revisit when |
|---|---|---|
| Host track | Cloudflare Pages (root dir per project) for client domains; GitHub Pages only for the shared MVP subpaths | Reassess per project at §8 |
| CMS publish mode | `simple` (direct-to-branch) | Multiple editors conflict / review-before-publish needed |
| Contact form | Static-friendly service or a Pages Function + Turnstile | Volume/complexity justifies a real backend |
| Analytics | Cloudflare Web Analytics (free, cookieless) | Deeper funnels/events needed |
| Domain/asset ownership | Client owns, you collaborate | Client explicitly wants fully-managed |
| i18n | Single language until proven | A second audience is confirmed, not anticipated |

## Appendix B — Common failure modes & fixes

- **Enforce HTTPS never appears / cert stuck "pending" (GitHub Pages)** →
  Cloudflare proxy blocked GitHub's ACME challenge. Grey-cloud the records until
  the cert issues, then re-proxy (§4).
- **Redirect loop after custom domain** → SSL/TLS was "Flexible." Use Full
  (Strict).
- **Doubled path segments (`/repo/repo/…`)** → `base` in `astro.config.mjs` not
  reset to `/` after wiring the custom domain (§5 step 3 — the `base` flip).
- **"Published but the site didn't change"** → stale proxied HTML. Add the
  cache-bypass rule or a post-deploy purge (§6a).
- **`CNAME` file keeps resetting** → it was hand-edited separately from Settings →
  Pages; let GitHub own it once a custom domain is set there.
- **Decap saves fine but the next deploy fails** → a `config.yml` field was
  added/renamed without updating the matching zod schema (§3 sync rule).
- **"Domain isn't working" right after nameserver change** → propagation delay
  (up to ~24h); verify propagation before assuming misconfiguration.
- **Contact form spam** → add **Cloudflare Turnstile** (free, privacy-friendly)
  in front of the Pages Function / form service.
