# Port DAMS off fcrepo/fin onto CaskFS/project-anduin/argonath

> Living document — keep this updated as phases complete, decisions change, or assumptions turn out to be wrong. Started 2026-09-01. Branch: `argo-dcf`.

## Context

`digital.ucdavis.edu` currently runs on a three-tier stack: `fcrepo` (Fedora Commons LDP repository) → `fin` (a large, separate microservice application layer that wraps fcrepo — gateway/proxy, admin-ui, dbsync-to-Elasticsearch, GCS binary sync, OIDC, etc., in the sibling `fin` repo) → the `dams` client+server (this repo, npm package `ucd-lib-client`). We are retiring fcrepo and fin entirely in favor of **CaskFS** (content-addressed, SHA-256, REST API, built-in RDF graph) running under **project-anduin** (shared Postgres/Dagster/Superset/auth-gateway platform), with **argonath** (Dagster-orchestrated ingestion/AI-metadata/indexing pipeline) on top of it.

The guiding constraint: **touch the client as little as possible in this first pass**. The client keeps calling `/fcrepo/rest/...` URLs; `services/client/lib/fcrepo-middeware.js` (already stubbed, unwired) becomes a translation shim that resolves those calls against CaskFS instead of real fcrepo. Per explicit instruction, **the shim only needs to cover the subset of fcrepo/fin behavior the dams client and server actually exercise** — not fcrepo's full LDP API surface. A commit already on this branch (`72d52ac "start of port to cask"`) started this: it renamed `services/fin` → `services/client` and left three unimplemented branches in the shim (`svc:iiif`, `svc:gcs`, plain resource stream), but also left the repo in a broken state (a stale Dockerfile/`.cork-build`, and an incomplete copy of a model-mounting pattern — see Phase 0).

Two other things this port is explicitly scoped to also do:
- **Client edits** (today: an in-client edit UI — collection hero image, watercolor accent theme, highlighted items, per-item viewer-type override, homepage featured-collections widget, all gated by Keycloak `admin`/`ui-admin` roles) currently writes by having the **browser PUT JSON-LD directly to `/fcrepo/rest/application/ucd-lib-client/...`**, bypassing the server entirely, with Postgres (`dams_edits.edit`) acting only as a read-cache populated indirectly via fin's fcrepo-event-driven `dbsync`. This needs to become a real server-side JSON API, with Postgres as the primary store, dropping JSON-LD/RDF for this data.
- **Branding**: rename from "DAMS" to a "digital collections" / `dcf` identity (branch is already `argo-dcf`) — internal tokens only this pass (npm packages, Postgres schema, custom-element/CSS prefixes, GCS bucket names, user-facing text). GitHub repo names (`dams`, `dams-deployment`) stay as-is for now.
- **Start a real test suite** — neither `dams` nor `fin` has one today. The `caskfs` repo has a working Mocha convention to mirror.

### Decisions already confirmed
- **Namespace strategy**: the frontend keeps its **own namespace(s)**, calling `cask`/`anduin-gateway` in `argonath-prod` **cross-namespace** via k8s DNS. This requires solving "how does frontend dev/test reach a non-prod cask," since `argonath-deployment` currently has **no dev/sandbox namespace at all** — only `prod` + local compose.
- **Auth realm**: adopt Keycloak realm `internal` (argonath's realm) going forward, migrating/re-provisioning the legacy `dams`-realm editor accounts.
- **Rebrand scope**: internal tokens only; repo names unchanged this pass.
- **Old/new site overlap**: the legacy fcrepo/fin stack and the ported stack will run **side-by-side in production for 6+ months**. This is a planned overlap window, not a short rollback margin — it drives the namespace-naming decision in Phase 7 and the cutover shape in Phase 9.

### Critical discovery — coordinate before building the indexing/ingest pieces
`argonath` already has real, in-progress code that overlaps with this plan's Elasticsearch-indexing and bulk-import needs: `argonath/dagster/lib/assets.py` (`index_for_dams_search` — a working Dagster asset calling `digtk public-dc es upsert`, deliberately mirroring `dams/services/client/models/item/{model,transform}.js`'s ES envelope; `reconcile_collection_items` — bulk collection ingest, looks implemented; `ingest_item` and `index_for_rag` are explicit `NotImplementedError` stubs marked "phase 0.3"/"phase 0.7"). **This looks like a second, currently uncoordinated track building the same replacement this plan needs.** Before starting Phase 3/4 below, get a status check and establish an explicit contract with whoever owns that code — don't re-derive the ES envelope design independently.

---

## Phased plan

### Phase 0 — Stabilize the port branch
Get `argo-dcf` buildable/deployable again before building anything new on top of it.

**`services/client/controllers/api.js` and `services/client/models/index.js` are not dead scaffolding** — they're an intentional, partial copy of the "fin-lite" pattern already proven in the sibling `aggie-experts` repo (`webapp/lib/api.js` + `webapp/lib/models.js`), which did its own fin/fcrepo removal already. This pattern is a small, self-hosted, generic replacement for what fin's separate `services/fin/api` microservice does today (auto-mounting each data model's `api.js` router at `/<name>`, merging each model's swagger into one spec via `swagger-jsdoc`, applying `keycloak.setUser`) — **it becomes the mounting mechanism for all of dams's own model APIs going forward, including the new `app-config` API in Phase 6**, replacing dependency on fin's separate `api` service entirely.

**Architecture note**: in aggie-experts, `lib/api.js` is **not** mounted into the SPA/webapp's Express app — it's its own standalone process (`npm run api` → `node lib/api.js`, own `app.listen(config.api.port)`), deployed as its own k8s Deployment/Service, sitting alongside separate `spa` and `gateway` deployments built from the same image with different start commands. Dams's copy of this file has the exact same standalone-server shape (its own `init().then(app => app.listen(...))` at the bottom) — it is **not** designed to be `require('./controllers/api')(app)`-mounted into `index.js` the way the commented-out line in `index.js:38` suggests; that commented line is itself leftover from an earlier, incompatible assumption and should be deleted, not re-enabled.

Work needed to make this real (not just fix requires):
- **Fix `controllers/api.js`** against the real `aggie-experts/webapp/lib/api.js`: dams's copy is missing `const express = require('express')`, `const bodyParser = require('body-parser')`, and `const app = express();` while still using `app`/`bodyParser`. Port the file properly as a standalone process (own start script, e.g. `"api": "node controllers/api.js"` in `services/client/package.json`, own port via config), adapting requires to dams's own module names (see below). Remove the stale commented-out mount line from `index.js`.
- **Decide the front-door topology**: does dams need a third `gateway`-equivalent process the way aggie-experts has (`gateway`/`spa`/`api` as three separate deployments), or does the existing `services/client/index.js` (which already merges what aggie split into `spa`+`gateway`) simply reverse-proxy `/api/*` internally to this new standalone api process? The latter is less machinery and more consistent with "touch as little as possible" — recommended unless there's a reason (e.g. independent scaling/deploy cadence for the API) to fully mirror aggie's 3-way split.
- **Fix `models/index.js`** against `aggie-experts/webapp/lib/models.js` (`FinModelLoader`) — this is generic/model-agnostic and can be ported close to as-is (it just does `require(config.models.rootDir)` and merges swagger). It expects a hand-authored per-model registry (a `models/index.js`-shaped object of `{name: {api, model, schema, swagger}}` — same file, dual role) — dams's existing model directories (`item`, `collection`, `client-edits`→`app-config`, `page-search`, `seo`, `application`) need to be wired into this registry, each exposing `{api, model, schema, swagger}`.
- **Write dams's own replacements** for what aggie-experts sources from its local monorepo sibling package `@ucd-lib/experts-commons` (not usable as-is — it's aggie-domain-specific and not a published package) and its hand-rolled `webapp/lib/keycloak.js`/`webapp/models/middleware/index.js`: a small dams-owned `services/client/lib/` module for config/logger, reconciled with dams's *existing* `services/client/lib/auth.js` rather than blindly duplicating aggie's keycloak wrapper, and dams-specific Express middleware (`item_endpoint`/`browse_endpoint`/`json_only`-style helpers) for its own collection/item shape.
- **Write dams-specific swagger schemas** (`services/client/lib/swagger/{parameters,schemas,responses,requestBodies}.json`) — aggie's are 100% expert/grant-domain, not reusable content, only reusable structure.
- **Add real npm deps** aggie's version relies on but dams's `services/client/package.json` currently lacks: `swagger-jsdoc`, `body-parser`, `fs-extra`, `yaml` (and `swagger-ui-express` if the swagger UI itself is wanted, optional).
- **Bigger, repo-wide implication to flag now, not discover mid-port**: dams's server (`index.js`) and *every* existing model (`models/{item,collection,client-edits,page-search,seo,application}/*`) currently depend directly on `@ucd-lib/fin-service-utils` — a package developed *inside the fin repo*, pulled in via a `file:../../../node-utils`-style relative dependency — for `logger`, `keycloak`, `middleware.httpTiming`, `controllers.health`, and the `FinDataModel`/`FinEsDataModel` base classes every model extends. aggie-experts resolved the equivalent situation by dropping `@ucd-lib/fin-service-utils`/`fin-api` entirely and writing its own lightweight `es-model.js` (raw `@elastic/elasticsearch` calls) and `keycloak.js`. Recommend dams do the same, but this does **not** need to happen all at once in Phase 0 — treat it as a dependency to retire incrementally, model-by-model, as each model is otherwise being touched anyway (the `app-config` rewrite in Phase 6 already drops `FinDataModel` entirely as part of its own work; `item`/`collection` are natural candidates when their ES-envelope changes in Phase 3 and their edit-merge fix lands in Phase 6). Phase 0 itself only needs to replace what `index.js` and the new `controllers/api.js`/`models/index.js` mounting layer directly touch (logger, keycloak `setUser`, health controller) — not the full model layer.
- Fix `services/client/Dockerfile`: still references pre-rename paths (`services/fin`, `cli/`, `collection-import/`) deleted in `72d52ac`.
- Fix `.cork-build`: `dams-base-service` still points at `services/fin/Dockerfile`; drop the `dams-image-utils`/`dams-binary-mirror` image entries (their source dirs are deleted; binary-mirror's whole job is superseded once IIIF reads CaskFS directly).
- **Reference material**: no prose migration doc exists for aggie-experts' own fin removal — the closest thing is the git history on their `dc-fin-lite-round1`/`dc-fin-lite-api` branches (merge commits `05e8d3f`, `f7447c0`, and earlier `2d13150`), worth a `git show`/`git log -p` pass for a step-by-step diff before starting this work.
- **Done when**: a local build succeeds off this branch, the container starts, and the api process's mount root returns a real swagger doc listing the registered models, even before `app-config`/fcrepo-shim work lands.

### Phase 1 — Solve dev/test access to a non-prod CaskFS
`argonath-deployment` has zero dev environment. Two tracks, not mutually exclusive:
- **Interim**: dams `local-dev`/`dev` environments call `argonath-prod`'s real `cask` service directly, scoped to a dedicated path prefix (e.g. `workspace/<dev-user>/` or the already-named `gold/digital-dev` slot in argonath's `cask-conventions.md`) with a restricted `x-user` role. Flag risk: CaskFS does **zero** token verification itself (trusts an unverified `x-user` header) — scoping has to be enforced by whatever sits in front of it, not by cask.
- **Real fix** (needed before prod cutover regardless): a genuine `argonath-dev` namespace in `argonath-deployment` — this is that repo's own work, flag it as an external dependency/ticket, not something this plan does directly.
- **Done when**: a dams dev pod can call `GET cask.../api/fs/...?metadata=true` (confirm actual path prefix — `/api/fs` vs `/cask/fs`, the docs and code disagree) and get a real result back.

### Phase 2 — Wire the fcrepo-middleware shim; IIIF direct-mount
Wire `services/client/lib/fcrepo-middeware.js` into `index.js` (`app.use(require('./lib/fcrepo-middeware.js'))`, before `controllers/static`).

**Proxy, not redirect**: none of the backend services (IIIF, cask, etc.) are exposed directly to the internet; the dams client/server (`services/client`) is the sole public front door and acts as a reverse proxy to everything behind it — the same shape fin's own gateway has today. Every branch below resolves the target internally and **forwards the request server-side via `http-proxy`** (the stub already imports and instantiates this — `const fcrepo = httpProxy.createProxyServer({...})` — currently unused), never a `302` sending the browser to a different host.
- **`svc:iiif` branch**: call `GET {CASK}/api/fs/{path}?metadata=true`, read the resolved on-disk hash path, then use the existing `http-proxy` instance to forward the request to the internal (ClusterIP-only, not publicly exposed) IIIF service, rewriting the target path to the resolved hash path. This means the IIIF container needs a **direct, read-only volume mount of CaskFS's CAS root** — the resolve-then-proxy step avoids Node having to stream full-res image bytes through itself (real latency/throughput regression vs. today's fuse-mounted direct-file-read model); the proxy only forwards the request, the IIIF service streams the response directly. CaskFS's `caskfs-volume` PV is NFS-backed, so a second PVC in the frontend's namespace bound to the same NFS export is plausible — but **spike this early**, cross-namespace RWX PVC sharing isn't guaranteed to just work depending on the CSI driver.
- **`svc:gcs` branch**: proxy-stream (`GET /api/fs/{path}`, via the same `http-proxy` instance or a plain piped fetch) for non-IIIF binary consumers (raw PDF downloads etc.) — confirm exactly which asset types still need this once IIIF reads CaskFS directly.
- **Plain-stream branch**: proxy small JSON-LD/metadata documents the same way, forwarding Range/ETag headers (CaskFS supports both).
- **Open risk to resolve before implementation**: the middleware as written treats the fcrepo-style URL path directly as the CaskFS lookup path — that only works if item/collection API responses and ES `contentUrl` fields already emit cask-native paths, not ARKs (CaskFS paths are explicitly not ARK-derived). If URLs still carry ARKs, an ARK→cask-path resolution step is needed, and `GET /api/ld` (the natural way to do that) **is not implemented over HTTP yet** in CaskFS — confirm this doesn't block Phase 2.
- **Done when**: a known test item's IIIF tiles and JSON-LD metadata both load through `/fcrepo/*` URLs against the Phase-1 dev cask, with the browser only ever talking to the dams client/server (confirm via network trace — no direct IIIF/cask host ever appears), and image bytes confirmed served without buffering through Node (response headers/latency check on the proxy hop).

### Phase 3 — Replace the ES-indexing trigger (keep Elasticsearch itself; all pipeline work lives in argonath, not dams)
The entire indexing pipeline is owned and run by argonath — this phase is coordination + verification on the dams side, not new dams-side pipeline code:
- Core/raw item data lands in CaskFS **bronze** via ingestion (Phase 4).
- A Dagster asset calls the `digtk`/`dc` CLI to generate **dc-specific silver derivatives** (the digital-collections-shaped processed output — thumbnails, manifests, whatever the dc silver convention requires).
- A Dagster asset then calls the CLI again to **push those documents into the dcf Elasticsearch instance** (this is the `index_for_dams_search`/`digtk public-dc es upsert` code already in progress in `argonath/dagster/lib/assets.py` — coordinate with that track per the "Critical discovery" above rather than re-deriving the envelope).
- Dams-side work here is narrow: confirm the dcf ES instance is reachable from wherever Dagster runs (`argonath-prod`, cross-namespace — same class of problem as Phase 1), confirm/adopt the ES document envelope contract argonath's CLI already targets, and verify.
- Dual-write verification window: fin's dbsync (if still live against fcrepo) and argonath's CLI-driven push both populate the same alias; diff for drift before trusting the new path, especially for multi-page items (flagged by the argonath code's own comments as unverified). Keep fin/dbsync running dormant as a rollback path until Phase 9's decommission step.
- **Done when**: a full collection's ES documents produced by argonath's bronze→silver→ES pipeline are verified equivalent to (or an intentional improvement on) fin dbsync's current output.

### Phase 4 — Bulk metadata backfill
Two distinct ingestion paths, near-term and steady-state:
- **Near-term / manual**: a direct "add a collection via CLI" capability (`digtk`/`dc` CLI, pushing straight into CaskFS bronze) for ad-hoc/one-off collection loads — this is argonath Dagster/CLI work, **partially built already** (`reconcile_collection_items` calls `digtk ingest batch` for `source_type: "digital-collection"` — the git-metadata-repo case). The actual gap is `ingest_item`, an explicit stub. Get a timeline commitment on that before relying on it for a full backfill.
- **Steady-state / long-term source of record**: once rolling, all collection data comes from **Preservica** (a digital-preservation system) as an extract step landing in CaskFS bronze, then transformed into schema.org for dcf's silver/gold layers. **Open item to resolve, not yet researched**: confirm who owns the Preservica-extract step (argonath/Dagster, presumably, matching the CLI-driven bronze→silver→ES pattern from Phase 3) and whether that extraction pipeline exists yet or is itself new work — this materially changes Phase 4's schedule risk depending on the answer.
- Confirm binary/media backfill (actual TIFFs/JP2s, not just JSON-LD/schema.org metadata) into CaskFS bronze for both paths — not explicit in the current ingest code and is the largest data-volume piece of the whole migration.
- **Done when**: one full legacy collection is present in CaskFS and browsable end-to-end through the Phase 2 shim, matching the live site — via the CLI path first, with the Preservica-extract path validated once that pipeline exists.

### Phase 5 — Auth reconciliation (realm `dams` → `internal`)
- Repoint `services/client/lib/auth.js` / `keycloak.setUser` config at realm `internal`, client matching argonath's `anduin-gateway` config.
- Migrate/provision legacy editor accounts into `internal` with `admin`/`ui-admin` roles. Do this in parallel with Phases 2-4 (independent), but complete before Phase 6's end-to-end testing needs real authenticated sessions.
- Decide explicitly (don't leave implicit): does the dams server keep doing its own OIDC verification and become the "trusted gateway" that presents `x-user` to cask, or does it sit behind `anduin-gateway`? Recommend the former (keep the client's own login/session UX; the server's calls into cask carry a `x-user` header derived from its own verified session) — but confirm.

### Phase 6 — Client-edits rework
Rename `services/client/models/client-edits/` → `services/client/models/app-config/`, and register it in the Phase 0 model registry (`models/index.js`) so it's mounted at `/app-config` by dams's own `controllers/api.js` loader — no longer dependent on fin's separate `services/fin/api` auto-mount service at all. Drop `FinDataModel` inheritance entirely — no more dbsync `is()`/`update(json)` hooks, no fcrepo JSON-LD fetch (this is also a natural point to drop the model's `@ucd-lib/fin-service-utils` dependency per Phase 0's incremental-retirement note).

**New Postgres schema** (`services/init/postgres/004-app-config-rebrand.sql`, additive/idempotent — the existing SQL files run as guarded init scripts against a live DB, not a tracked migration history, so this must be a new file, not an edit to `003-client-edits.sql`):
- Idempotent `ALTER SCHEMA dams_edits RENAME TO dcf_edits` guarded by existence checks.
- Replace the old fan-out `dams_edits.edit` table with two simple keyed tables: `dcf_edits.collection_edit(id, edit jsonb, updated_by, updated_at)`, `dcf_edits.item_edit(id, collection_id, edit jsonb, updated_by, updated_at)` (indexed on `collection_id`), plus a new singleton `dcf_edits.featured_collections(config jsonb, ...)` table — the homepage featured-collections widget currently isn't cached to Postgres at all today, this closes that gap too.
- If production has real live edit data, a one-time backfill script reshaping old JSON-LD rows into the new flat tables is needed before dropping the old table — confirm how much real data exists first.
- Drop the unused `http://digital.ucdavis.edu/schema#ClientEdit`/`#DamsClientEdit` RDF vocabulary entirely — confirmed nowhere downstream reads it.

**New routes** (`services/client/models/app-config/api.js`), plain JSON in/out (no `@context`/`@id`/JSON-LD flattening — `cleanEditForApi()` goes away, reads become direct `SELECT`):
```
GET/PUT  /api/app-config/collection/:id
POST     /api/app-config/collection/:id/featured-image   (binary, streamed to CaskFS)
GET/PUT  /api/app-config/item/:id
GET/PUT  /api/app-config/featured-collections
```
- **Server-side auth enforcement** (currently only a client-side `canEditUi()` hide/no-op — nothing stops a crafted request today): gate every write route with `keycloak.protect(['admin','ui-admin'])`, the same mechanism `fin/dbsync` already uses. Put this behind a single seam (`models/app-config/lib/auth.js`) so it's a one-line change if the auth model later shifts to trusting `anduin-gateway`'s `x-anduin-user` header instead.
- **Featured image upload**: stream the request body straight through to `PUT {CASK}/api/fs/gold/digital-{env}/collection/{slug}/featured-image.jpg`, store the resulting cask path as a pointer field in Postgres. Verify `bodyParser.json()`/`bodyParser.urlencoded()` don't interfere with a binary body on this route (first time this server has needed to), and add an explicit size limit (no `Content-Length` guard exists on this path today).
- **Fix the known item-edit-merge gap**: `models/item/model.js` has no `get()`/`search()` override at all (unlike `collection/model.js`'s existing `_appendClientEdits()`) — item-level edits are captured but never served back. Add the equivalent `_appendAppConfigEdits()` override, reading from the new `dcf_edits.item_edit` table.
- **Client changes**: `FcAppConfigService.js`/`FcAppConfigModel.js` swap their direct-to-fcrepo PUTs for calls to the new API and drop the JSON-LD document construction; `CollectionService.js`'s `/api/client-edits${id}` becomes `/api/app-config/collection${id}`; `app-collection.js`/`app-record.js`/`admin-featured-collections.js` get minor field-name updates (`watercolors.css` → `watercolor`, `exampleOfWork` → `highlightedItems`) — intentionally kept close to current names to minimize churn.
- **Sequencing note**: this write path can't dual-run against fcrepo (no natural shadow-write). Cut it over early in dev (low-risk, easy to hand-verify), but hold the *production* cutover for this specific feature until immediately before the full site cutover in Phase 9.

### Phase 7 — k8s/deployment restructuring (`dams-deployment`)
- **The old and new sites will run side-by-side in production for 6+ months** (see Phase 9) — the legacy stack keeps running under its current `digital-dev`/`digital-prod` (and `dams` local-dev) namespaces for that entire window, so the ported stack **cannot reuse those namespace names**; it needs genuinely new, distinct names from day one (not a rename-in-place), e.g. `dcf-dev`/`dcf-prod` (exact names TBD — propose in the branding pass, Phase 10, but the namespace *scaffolding* itself needs to exist well before then, back in this phase).
- **Drop entirely**: `kustomize/{fcrepo,ocfl-volume,gcs-fuse,nfs-server,rabbitmq,collection-import}`, `kustomize/fin/{gateway,dbsync,uber,workflow,gcs,init,binary-mirror}`.
- **Keep, reconfigure**: `postgres` (role narrows — no more `ocfl_id_map`/containment tables), `elastic-search`+`kibana`, `ucd-lib-client` (the sole public front door — an Ingress/LoadBalancer target), `iiif` (new CaskFS PVC mount per Phase 2 instead of `gcs-fuse`; stays ClusterIP-only, reached exclusively via `ucd-lib-client`'s `http-proxy` forwarding per Phase 2, never given its own public Ingress — matches its current ClusterIP-only config). Confirm whether `pg-rest` is still needed by anything once client-edits talks to Postgres directly through the new API.
- **Added**: the new Phase 0 `api` process — depending on the front-door topology decision in Phase 0, either its own k8s Deployment/Service (mirroring aggie-experts-deployment's `kustomize/webapp/api/`) with `ucd-lib-client` proxying `/api/*` to it, or a second process in the existing `ucd-lib-client` pod/container. Otherwise nothing new locally — cross-namespace calls to `cask.argonath-prod.svc.cluster.local` / `anduin-gateway.argonath-prod.svc.cluster.local`, plus the new IIIF PVC.
- **Done when**: a from-scratch deploy of the renamed dev namespace succeeds with only the kept/added services.

### Phase 8 — Smoke-test / health-check replacement
fin's ActiveMQ-based integration-health-test pattern has nothing to listen to anymore. Recommend both layers:
- **Shallow liveness**: extend the existing `controllers.health.register(app)` (`index.js:50`) to actively verify cask, ES, and Postgres reachability.
- **Deep synthetic**: a scheduled job (k8s `CronJob` in the frontend's own namespace, recommended over an argonath-side Dagster schedule since it's testing *dams's* availability specifically) that round-trips one known real item end-to-end (metadata + one IIIF tile), and post-Phase-6 a test client-edit save.
- Alerting destination is undefined in everything explored — needs an owner decision.

### Phase 9 — Cutover and rollback
The old and new sites run side-by-side in production for **6+ months** — a planned overlap period, not just a safety margin. Both stacks (old `digital-dev`/`digital-prod` namespaces and new `dcf-dev`/`dcf-prod` namespaces per Phase 7) need to be independently addressable/operable for that whole span.
1. Old stack (fcrepo/fin/rabbitmq, in its existing namespaces) stays fully live and authoritative through Phases 0-8; all new-path work happens in the new namespaces' dev/sandbox.
2. **Read-path cutover first**: once Phase 3/4 backfill+indexing is verified equivalent for the full catalog, switch production reads (item/collection pages, IIIF, search) to the new path — likely gradually/collection-by-collection given the multi-month window rather than a single flip — leaving fcrepo running read-only as an immediate rollback target throughout. Keep dbsync running dormant as a dual-write safety net until confidence is high.
3. **Write-path (client-edits) cutover last**, atomically, in a low-traffic window, immediately preceded by a final export/comparison of fcrepo's current `application/ucd-lib-client` state against what's about to become authoritative in Postgres.
4. Keep fcrepo/ocfl-volume/gateway/dbsync/rabbitmq (and their namespaces) fully deployed for the entire 6+ month overlap — do not delete `ocfl-volume` until confident no rollback is needed, since it's the only copy of binary content outside whatever's already migrated.
5. Decommission the old stack/namespaces only after the overlap period ends and cutover is confirmed complete and stable.

### Phase 10 — Rebrand pass (deliberately last, isolated)
Internal-tokens-only rebrand (npm package name, Postgres schema naming already done in Phase 6, custom-element/CSS prefixes, GCS bucket names, user-facing text) as its own PR after Phase 9 is stable — bundling it with the functional migration makes any bug much harder to bisect.

---

## Testing strategy (started now, not deferred)
No test framework exists in `dams` or `fin` today; `caskfs` has a working Mocha convention (`.mocharc.yml` + `tests/` + `tests/helpers/`) — mirror it in `services/client` (`services/client/.mocharc.yml`, add `mocha`/`supertest` to `services/client/package.json`, replace the placeholder `"test"` script).

Highest-value initial coverage, aligned to what this plan actually builds:
1. `tests/models/app-config/api.test.js` — new write API round-trips, upsert-on-conflict, 401/403 for non-admin.
2. `tests/models/app-config/featured-image.test.js` — CaskFS-calling logic specifically (stub/mock the CaskFS HTTP endpoint), asserting correct path construction and clean failure (502, not a silent partial write) on a CaskFS error.
3. `tests/models/item/model.test.js` — the item-edit-merge fix (`_appendAppConfigEdits`), since it's a genuine bug fix and the highest regression risk in this rework.
4. Shim tests for `fcrepo-middeware.js`'s cask-calling branches once Phase 2 lands — assert each branch calls CaskFS with the expected translated path, without needing a real CaskFS instance.

## Critical files
- `services/client/lib/fcrepo-middeware.js`, `services/client/index.js` — the shim
- `services/client/controllers/api.js`, `services/client/models/index.js` — the fin-lite model-mounting layer (Phase 0), ported from `aggie-experts/webapp/lib/api.js` and `webapp/lib/models.js`; reference `webapp/models/middleware/index.js`, `webapp/lib/keycloak.js`, `webapp/lib/es-model.js`, `webapp/models/expert/index.js` (per-model `{api,model,schema,swagger}` contract) as adaptation templates, and aggie-experts-deployment's `kustomize/webapp/{api,spa,gateway}/` for the deployment-topology precedent
- `services/client/Dockerfile`, `.cork-build` — Phase 0 fixes
- `services/client/models/client-edits/{model,api}.js` → renamed `app-config/` — Phase 6
- `services/init/postgres/003-client-edits.sql` (reference only, do not edit) + new `004-app-config-rebrand.sql`
- `services/client/client/public/lib/services/FcAppConfigService.js`, `lib/models/FcAppConfigModel.js`, `lib/services/CollectionService.js` — client-side rewrite
- `services/client/models/item/model.js`, `models/collection/model.js` — item-edit-merge fix
- `dams-deployment/.cork-kube-config`, `kustomize/iiif/base/deployment.yaml` — namespace/IIIF-mount changes
- `argonath/dagster/lib/assets.py`, `argonath/exec/digtk/lib/dams_index.py` — the track to coordinate with, not duplicate

## Verification
- Phase 0: local build + container start.
- Phase 2: real item's IIIF tiles + JSON-LD metadata load through `/fcrepo/*` against dev cask; confirm image bytes aren't proxied through Node (latency/headers check).
- Phase 3: ES document diff between old (fin dbsync) and new (argonath) paths for a representative multi-page item and a simple item.
- Phase 6: `mocha` suite green; manual click-through of the edit UI (collection hero image, watercolor, item viewer-type) against a dev instance with a real `internal`-realm admin session, confirming both save and correct read-back (including the previously-broken item-edit case).
- Phase 7: from-scratch `cork-kube deploy` of the renamed dev namespace succeeds.
- Phase 9: staged production cutover per the read-then-write sequencing above, with fcrepo left live as rollback until the overlap window closes.
