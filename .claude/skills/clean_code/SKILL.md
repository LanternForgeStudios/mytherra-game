---
name: clean_code
description: Audit the codebase for dead code, bugs, inefficiencies, and other quality concerns. Read-only — reports findings, does not fix them. Use when the user asks to clean up, audit, review code quality, or check for issues/dead code/bugs.
tools: Read, Glob, Grep, Bash
---

# Clean Code Audit

Inspects the codebase and reports concerns. **This skill does not edit files** — it's
audit-only by design, so it's safe to run anytime. If the user wants fixes applied,
that's a separate follow-up step, not part of this skill.

## Scope

- `src/` (game client)
- `backend/functions/src/` (Cloud Functions)
- Skip `docs/`, `node_modules/`, `dist/`, `lib/` — not code.

## Steps

1. Type-check first — most real bugs surface here:
   - `npx tsc --noEmit` from the repo root (frontend)
   - `npx tsc --noEmit` from `backend/functions/` (backend), if its dependencies are
     installed
2. Look for dead code:
   - Files under `src/` or `backend/functions/src/` that nothing imports (Grep for
     the filename/export across the rest of the tree)
   - Exports nothing references
   - Empty placeholder folders (`src/game/systems/`, `engine/`, `ui/`,
     `backend/functions/src/battle/`, etc.) are **expected** during the skeleton
     phase — don't flag these as dead code, they're intentional placeholders per the
     Software Architecture Spec.
   - If `npx knip` runs cleanly against this project, prefer it over manual
     grepping — it's a proper unused-code/unused-dependency scanner. Fall back to
     manual Grep if it's not usable here.
3. Look for bugs and correctness issues:
   - Content loaded by ID (`loadContent<T>('some_id')`) where that ID doesn't exist
     anywhere under `src/content/`
   - Firebase calls made without the corresponding SDK import
   - Type mismatches hidden behind `any` casts
   - Off-by-one errors, unhandled null/undefined, unreachable code after `return`
4. Look for inefficiencies:
   - Content registry or asset loading doing repeated work that could be cached
   - Obviously redundant re-renders or re-fetches in scene code
5. Look for other concerns:
   - Hardcoded lore/content values inside `src/game/` or `src/types/` — violates
     "content is data, systems are code" (see
     `docs/08_Software_Architecture_Specification.md`)
   - `console.log`/`debugger` left in committed code
   - `TODO`/`FIXME` comments worth surfacing

## Report format

Group findings by severity: Bugs → Dead code → Inefficiencies → Style/other. For each
finding give `file:line` and a one-line description of the concrete failure mode, not
just "this looks off." If a category has nothing, say so briefly rather than omitting
it silently.
