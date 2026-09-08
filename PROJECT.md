# Hockey Card Collection Tracker — Project Brief

## Purpose
Portfolio project for fullstack developer roles (targeting mid-size companies).
Personal-use app to manage a hockey card collection, enriched with live NHL data.
Secondary goal: deeply learn TypeScript and Node.js backend development (prior
experience is Java + JPA/ORM on the database side).

## Status: Phase 3 in progress (NHL API integration)
Phase 1 (Foundation) and Phase 2 (Core CRUD groundwork + `sets` CRUD) are complete.
Currently designing the player search/cache/upsert flow that "cards" creation
depends on.

---

## Decisions made so far

### Stack
- Backend: Express 5 + TypeScript 7, Postgres via `pg` (raw SQL, no ORM/query
  builder — deliberate choice, for learning)
- Frontend: React (later, Phase 6)
- No login/register — single-user, personal-use tool
- Monorepo: `slapshot-stash/backend/`, ESM modules (`"type": "module"`), Node v22
- Working in Claude Desktop, using Projects; this file is the cross-chat source
  of truth (chat-to-chat memory is not reliable — memory is a derived/summarized
  system, not shared conversation history)

### TypeScript config (finalized)
- `strict: true`, `noUncheckedIndexedAccess: true`
- `module`/`moduleResolution: "NodeNext"`, `target: "ES2022"`
- `verbatimModuleSyntax: true` → type-only imports must use `import type` /
  `type` keyword explicitly (e.g. `import { Router, type Request } from 'express'`)
- No path aliases, no `exactOptionalPropertyTypes`
- No compiled build — `rootDir`/`outDir` intentionally omitted/commented out;
  always run via `tsx`, dev and "prod" alike (single-user local tool, no deploy)
- `include` covers both `src/**/*` and `experiments/**/*`

### Dev tooling
- `npm run dev` → `tsx watch src/server.ts` (fast, does NOT type-check)
- `npm run typecheck` → `tsc --noEmit` (run manually/periodically — the real
  type-safety net, since `tsx` silently ignores type errors)

### External API
- NHL data via the unofficial NHL API:
  - Search: `api.nhle.com/stats/rest/en/players` (`cayenneExp likeIgnoreCase`
    on firstName/lastName)
  - Enrichment: `api-web.nhle.com/v1/player/{id}/landing`
- No API key required, but undocumented/unofficial — isolate all calls behind
  a dedicated service layer

### Build order (phases)
1. **Foundation** — ✅ DONE
2. **Core CRUD** — ✅ DONE for `sets`; `cards` CRUD blocked on Phase 3 player logic
3. **NHL API integration** — 🔄 IN PROGRESS (see "Player cache & upsert strategy" below)
4. **Caching refinement** — staleness logic largely being designed now, inside
   Phase 3, ahead of original schedule (see below)
5. **Background job** — cron-based daily refresh — still a true later phase
6. **Frontend** — collection grid, add/edit form, filters, card detail view
7. **Polish/stretch** — image upload, estimated value, deployment, "Create a Team"

---

## How It Works (functional design — CONFIRMED)

### Core Model
- **Players are never added directly.** They only enter the system as a
  side-effect of adding a card that references them.
- **Cards are the only entity the user creates directly.**
- **Sets** are simple, user-created. Used purely for filtering.

### Entities

**Set** (table: `sets`) — IMPLEMENTED
- `id` (SERIAL, PK)
- `name` (varchar, not null) — season/year is embedded in the name string
  itself (e.g. "2023-24 Upper Deck Series 1"); no separate `season`/`year`
  column — decided as redundant given naming convention, and no filter-by-year
  feature is planned
- No uniqueness constraint on `name` — deliberately skipped as unnecessary
  overhead for a handful of hand-entered rows

**Card** (table: `cards`) — SCHEMA IMPLEMENTED, CRUD NOT YET BUILT
- `id` (SERIAL, PK)
- `player_id` (INT, not null, FK → `player_cache.player_id`)
- `set_id` (INT, not null, FK → `sets.id`)
- `unique (player_id, set_id)` constraint — one row per distinct player+set
  combination; true duplicate physical copies of the same card are NOT
  tracked as separate rows (confirmed: user may own 2 copies, still 1 row)
- No condition/grade, no value, no metadata columns
- FK delete behavior: not yet decided (leaning no cascade — user is sole
  actor, low risk of accidental deletes)

**Player cache** (table: `player_cache`) — SCHEMA IMPLEMENTED, POPULATION LOGIC IN PROGRESS
- Primary key: `player_id` = the NHL API's own player ID directly (no
  separate surrogate ID — it's already a natural unique identifier)
- One wide table, nullable position-specific columns (NOT split into
  skater/goalie tables) — decided after real API exploration confirmed
  skaters and goalies share almost no stat fields (shared: `games_played`,
  `goals`, `assists`; skater-only: `points`, `plus_minus`, `time_on_ice`;
  goalie-only: `save_pctg`, `shutouts`, `goals_against`, `goals_against_avg`,
  `shots_against`) — one-table-nullable chosen over normalized split tables
  as the right complexity level for this project's scale
- Bio fields: `first_name`, `last_name`, `position`, `birth_country`,
  `is_active` (boolean), `current_team` (nullable — retired players may have
  none; found via `?.` on `fullTeamName` in raw API responses)
- Stats duplicated for `reg_*` (regular season) and `play_*` (playoffs)
  prefixes — both groups fully nullable, since real data confirmed a player
  can have regular-season totals with zero playoff appearances (and vice
  versa is structurally possible too)
- **Career totals can be entirely absent** — some drafted players never
  played an NHL game and have no `careerTotals` object at all in the API
  response; handled by checking container existence once (`careerTotals?.regularSeason`)
  rather than guarding every individual field
- `time_on_ice` stored as **INT seconds** (converted from API's `"MM:SS"`
  string via a `convertTimeOnIce` helper), not as the raw string — chosen to
  support future sort/filter by TOI
- `stats_updated_at` (TIMESTAMP, default now()) — drives staleness logic (see below)
- **PPG (Points Per Game) is NOT stored** — API doesn't return it directly,
  and it's cheap to compute (`points / games_played`) — will be computed at
  response-time in the backend when a card/player is fetched, never stored,
  never computed client-side (avoids logic duplication across future clients)

### Player cache & upsert strategy (Phase 3 — design confirmed, not yet built)

Sequencing matters — the "fuzzy" part (name matching) happens exactly once,
against the live NHL API; the cache lookup is always a precise, cheap
primary-key lookup, never a fuzzy name match against local data:

1. **Search step**: user types a name → hits NHL API search endpoint directly
   (not the local cache) → returns candidate matches (handles real-world
   ambiguity, e.g. two different real people both named "Bobby Orr") → user
   picks one specific player → app now holds a precise `nhlPlayerId`.
2. **Cache check**: `SELECT * FROM player_cache WHERE player_id = $1` (exact,
   indexed, cheap — not a name search).
3. **Decide whether to fetch fresh data from the landing endpoint**:
   - Not in cache at all → **must fetch** (no choice).
   - In cache, `is_active = false` → **skip fetch**, use cached row as-is
     (retired players' career stats cannot change).
   - In cache, `is_active = true`, `stats_updated_at` older than **3 days**
     (tentative threshold — intend to store as a named constant, likely in
     `config.ts`, not hardcoded in a query) → **fetch and update**.
   - In cache, `is_active = true`, `stats_updated_at` within 3 days →
     **skip fetch**, use cached row as-is.
4. **Upsert** into `player_cache` if a fetch happened.
5. **Create the card**, referencing the now-guaranteed-to-exist `player_id`.

This means a basic, on-demand version of "Phase 4" staleness logic is being
built now, as part of Phase 3, because the card-creation flow can't be built
sensibly without at least this much of it. The proactive/scheduled
(cron-based) refresh from Phase 5 remains a distinct, later concern.

### Features

1. **Add Card**
   - Search NHL player (autocomplete against NHL API — per the flow above)
   - Pick a set
   - Save — only path by which a player enters the cache

2. **My Collection**
   - Grid/list of owned cards
   - Filter by: Name, Team, Position, Set
   - Sort by: Games Played, Points, Points Per Game (computed at response-time)

3. **Card Detail**
   - Click a card → full career stat line (GP/G/A/P/PPG)
   - Shows active/retired status and current-or-last team

### Known edge cases (handled, confirmed against real API data)
- **Retired/inactive players**: `is_active` flag stored on `player_cache`;
  `current_team` safely absent via optional chaining rather than crashing.
- **Team ambiguity**: card's printed team is NOT stored — always reflects
  player's current/last-known team from `player_cache`.
- **Players who never played in the NHL** (drafted, no NHL games): entire
  `careerTotals` object absent from API response — `regularSeason`/`playoffs`
  stored as `null` for these players rather than a half-filled object.
- **Players with regular-season stats but zero playoff games**: confirmed
  with real data (a player with 734 GP, 0 playoff games) — `playoffs`
  correctly stored as `null` while `regularSeason` is fully populated.
- **Duplicate/similar player names**: resolved entirely at the search step
  against the live API (user disambiguates via autocomplete), never guessed
  at the cache layer.

### Stretch (Phase 7)
- "Create a team" — build a custom roster from owned cards.

---

## Architecture / conventions established

- **`config.ts`** is the only file that reads `process.env` directly (loads
  `dotenv/config` itself, self-contained regardless of import order). Exports
  a single typed `config` object. Fields with safe defaults (e.g. `PORT`) fall
  back gracefully with a `console.warn`; fields with no safe default (e.g.
  `DATABASE_URL`) throw immediately if missing (fail-fast).
- **`app.ts` / `server.ts` split**: `app.ts` defines the Express app
  (middleware, routes, error handler) but never calls `.listen()`; `server.ts`
  imports `app` and is the only file that starts listening. Enables future
  testing without binding a real port.
- **`db/pool.ts`**: creates one shared `pg` `Pool` (via `connectionString:
  config.databaseUrl`), exported for reuse across all services. Never calls
  `pool.end()` inside request-handling code — the pool must stay open for the
  server's whole lifetime. (`pool.end()` is only appropriate in one-shot
  scripts, e.g. the schema runner.)
- **`middleware/error-handler.ts`**: 4-parameter Express error middleware,
  mounted last in `app.ts`. Logs full error server-side (`console.error`),
  returns a generic `{ error: 'Something went wrong' }` + 500 to the client
  — deliberately does not leak internal error messages/stack traces to the API
  consumer.
- **`routes/` vs `services/` split**: routes handle `req`/`res`, extract and
  validate input, call services, choose status codes; services contain the
  actual SQL/business logic and know nothing about HTTP. Services return
  plain typed objects (interfaces like `Set`), never raw/untyped rows.
- **All SQL uses parameterized queries** (`$1, $2, ...` + values array) —
  never string-interpolated — established early as a hard rule after catching
  a real SQL-injection-shaped bug in a draft.
- **Guard clauses always pair a response with an explicit `return`** on its
  own line (not `return res.status(...).json(...)` combined) — deliberate
  choice while the habit is still forming, after repeatedly catching bugs
  from a missing `return` letting a second response attempt run.
- **`schema.sql`**: single file with all `DROP TABLE IF EXISTS` (reverse
  dependency order: `cards` → `sets` → `player_cache`) and `CREATE TABLE`
  statements (dependency order: `player_cache` → `sets` → `cards`, since
  `cards` has FKs into both). Run via a small script that reads the file and
  executes it through `pool`, confirmed to correctly run multiple
  semicolon-separated statements in one call.
- **`experiments/`** folder (outside `src/`, included in `tsconfig` separately)
  holds throwaway/exploration scripts — e.g. `explore-players.ts`, which
  established the real skater/goalie field shapes and edge cases now reflected
  in the `player_cache` schema above. Not meant to become real app code
  directly, though its logic is the basis for the real Phase 3 service.
- **Route params vs query params**: route params (`/sets/:id`) used to
  identify one specific resource; query params (`/cards?team=...`) reserved
  for optional filters/modifiers on a collection request.
- **HTTP status conventions in use**: 200 (success, including legitimately
  empty lists), 201 (created), 400 (bad input), 404 (specific resource not
  found), 500 (unhandled server error, via error-handler middleware).

---

## Open Questions / Notes
- 3-day staleness threshold for active players is tentative — may want to
  tune once real usage patterns are known.
- FK delete behavior for `cards` → `sets` / `cards` → `player_cache` not yet
  decided (not urgent — single user, low accidental-delete risk).
- Whether to eventually add pagination to `GET /sets`-style list endpoints
  (not urgent at current/expected data volume).

<!-- # SLAPSHOT STASH - Hockey Card Collection Tracker — Project Brief

## Purpose
Portfolio project for fullstack developer roles (targeting mid-size companies).
Personal-use app to manage a hockey card collection, enriched with live NHL data.

## Status: Planning — functional design not finalized yet
We are deliberately deciding *how the app works* before touching tech/schema/code.
Do not start coding based on this doc until the "How It Works" section below is filled in and confirmed.

---

## Decisions made so far

### Stack
- Backend: Node.js + Express + TypeScript
- Database: Postgres
- Frontend: React
- No login/register — single-user, personal-use tool

### External API
- NHL data via the unofficial NHL API (`api-web.nhle.com`, stats via `api.nhle.com/stats/rest`)
- No API key required, but undocumented/unofficial — isolate all calls behind a dedicated service layer so breaking changes don't ripple through the app

### Build order (phases)
1. **Foundation** — Express + TS project skeleton, health-check route, dev tooling
2. **Core CRUD** — cards table, full CRUD, validation, pagination/filtering (no auth)
3. **NHL API integration** — isolated service layer, link cards to players, fetch live stats
4. **Caching** — `player_cache` table, staleness check, refresh strategy
5. **Background job** — cron-based daily cache refresh
6. **Frontend** — collection grid, add/edit form, filters, card detail view with live stats
7. **Polish/stretch** — image upload, estimated collection value, deployment

### Workflow
- Working in Claude Desktop free plan, using Projects (not Claude Code)
- This file lives in the project's knowledge base so every chat starts with context
- One phase per chat session where practical, to avoid context/consistency issues

---

## How It Works (functional design — CONFIRMED)

### Core Model
- **Players are never added directly.** They only enter the system as a
  side-effect of adding a card that references them. No standalone
  "add player" or "browse players" flow — this keeps the app a card
  tracker, not a stats app.
- **Cards are the only entity the user creates directly.**
- **Sets** are simple, user-created, and few in number (name + year).
  Used purely for filtering — no set-completion tracking.

### Entities

**Set**
- name (e.g. "2023-24 Upper Deck Series 1")
- year

**Card**
- references one player (via NHL API player ID)
- belongs to one set
- no condition/grade, no value, no duplicate tracking (if a dupe is
  acquired, it's just tracked as one card)

**Player (cached, not user-managed)**
- name, position, team (current if active, last-known if retired)
- active/retired status
- career totals: Games Played, Goals, Assists, Points
- derived: Points Per Game (Points ÷ GP)
- populated/refreshed automatically the first time a card references
  this player (ties into the existing Phase 4 `player_cache` plan)

### Features

1. **Add Card**
   - Search NHL player (autocomplete against NHL API)
   - Pick a set
   - Save — this is the only path by which a player enters the cache

2. **My Collection**
   - Grid/list of owned cards
   - Filter by: Name, Team, Position, Set
   - Sort by: Games Played, Points, Points Per Game
   - Lets the user surface "best players in my collection" via sort

3. **Card Detail**
   - Click a card → full career stat line (GP/G/A/P/PPG)
   - Shows active/retired status and current-or-last team

### Known edge cases (handled)
- **Retired/inactive players**: NHL API returns a status flag; stored
  on `player_cache` rather than computed on the fly, since it affects
  what "team" and "current stats" mean for that player.
- **Team ambiguity**: card's printed team is NOT stored — "Team" always
  reflects the player's current (or last-known, if retired) team from
  the API. Simpler, single source of truth, no snapshot duplication.

### Stretch (Phase 7)
- "Create a team" — build a custom roster from owned cards.

---

## Open Questions / Notes
*(running log — add anything unresolved as it comes up)* -->
