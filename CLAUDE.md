# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

*Forgotten Wilds* (Project Mytherra) — a browser-based, data-driven, shared-world JRPG
built by Lantern Forge Studios. This repo (`mytherra-game`) is currently in the
**initial skeleton phase**: BootScene → PreloadScene → TownScene boot chain, typed
content stubs, a content registry, and Firebase client init — no combat, no quests, no
multiplayer, no final art. See `docs/09_Claude_Code_Playbook.md` for how this project
is meant to be built (one bounded task at a time) and `docs/11_Production_Roadmap.md`
for what's next.

## Commands

All frontend commands run from the repo root (`index.html`/`src/`/`vite.config.ts`
live at the root, not in a subfolder):

```bash
npm install
npm run dev          # Vite dev server at http://localhost:5173/mytherra-game/
npm run build         # tsc typecheck, then vite build -> dist/
npm run preview        # serve the dist/ build locally
npm test               # vitest run (whole suite, single run)
npx vitest run src/data/contentRegistry.test.ts   # single test file
npx vitest             # watch mode
```

Backend (Cloud Functions) has its own `package.json`, run from `backend/functions/`:

```bash
cd backend/functions
npm install
npm run build    # tsc -> lib/
npm run serve    # build, then firebase emulators:start --only functions
npm run deploy    # firebase deploy --only functions
```

Firebase project is **forgotten-wilds**. `backend/.firebaserc` and the root `.env`
hold the real project ID / client config and are gitignored — `.firebaserc.example`
and `.env.example` are the checked-in templates.

## Architecture

The whole codebase follows one rule from `docs/08_Software_Architecture_Specification.md`:

- **Content is data.** Everything content-specific (enemy stats, quest text, NPC
  dialogue, items) lives as JSON under `src/content/<type>/`, never as TS literals
  inside engine code.
- **Systems are code.** `src/game/` (scenes, systems, engine, ui) only knows how to
  render/process content by ID — it has no idea what a "Raven Echo" is.
- **Player progress is Firebase.** Firestore stores player state only (stats,
  inventory, quest progress, position) — never full content definitions.
- **Static game content is Git.** The JSON under `src/content/` is version-controlled,
  not database-driven.

**The content registry is the seam between those two halves.**
`src/data/contentRegistry.ts` eagerly globs every `src/content/**/*.json` file
(`import.meta.glob`) and indexes each by its `id` field. Scene/system code calls
`loadContent<T>('some_id')` and never imports a content JSON file directly — that's
what keeps lore out of engine code. `src/game/scenes/TownScene.ts` is the reference
example of this pattern (loads `echo_raven_001` from
`src/content/enemies/echo_raven_001.json` by ID).

Type definitions in `src/types/` (`player.ts`, `combat.ts`, `quest.ts`, `item.ts`,
`npc.ts`, `resonance.ts`, `journal.ts`) are the shape contracts content JSON and
engine code both agree to — `combat.ts` covers both `Enemy` and `BattleSession`
rather than getting its own `enemy.ts`/`battle.ts`, matching the file list in the
architecture spec exactly.

`src/firebase/app.ts` does the one `initializeApp` call (idempotent via
`getApps()`/`getApp()`); `auth.ts`, `firestore.ts`, and `functions.ts` each just
pull a service off that shared app. Don't duplicate the `firebaseConfig` object into
new files — import `firebaseApp` from `./app` instead.

`backend/functions/` is a separate npm project (own `package.json`/`tsconfig.json`,
`module: nodenext`) — it is **not** part of the frontend Vite build and has its own
dependency versions (currently pinned `firebase-admin@^13.x` because
`firebase-functions@^7.x` peer-depends on admin 11–13, not 14+; check that peer range
again before bumping either package).

## Docs

`docs/01_...md`–`docs/11_...md` are the design docs (GDD, World Bible, Combat Bible,
Player Experience Bible, Art Bible, Visual Style Guide, Master Art Direction Prompt,
Software Architecture Specification, Claude Code Playbook, Asset Manifest, Production
Roadmap), converted from the original `.docx` source files and renumbered to match
this scheme — the source files' names didn't match their actual contents. `08` is the
architecture spec; `09` is the Claude Code Playbook and is the most directly relevant
doc for how to scope any given task here (build one bounded piece at a time, don't
implement systems ahead of where the roadmap says to).

## Testing

Vitest. Per the Playbook (`docs/09_Claude_Code_Playbook.md` §11), tests target pure
logic — content registry, and combat math/quest state/inventory logic as those get
built — not Phaser rendering. Tests live next to the code they cover (`*.test.ts`).

## Project skills

`.claude/skills/` has four project-specific skills: `/push` (commit + push, checks
README.md is current first), `/clean_code` (read-only dead-code/bug/inefficiency
audit), `/push_backend` (build + scoped `firebase deploy` for `backend/`), and
`/run_local start|stop` (background dev server for manual browser testing, state in
gitignored `.claude/run/`).

## Commits

Every commit in this repo must include both trailers (inherited from the parent
workspace's CLAUDE.md, restated here so it holds even if this repo is cloned
elsewhere):

```
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Co-Authored-By: Bear0053 <bob0053@gmail.com>
```
