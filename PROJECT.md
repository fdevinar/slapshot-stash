# SLAPSHOT STASH - Hockey Card Collection Tracker — Project Brief

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
*(running log — add anything unresolved as it comes up)*
