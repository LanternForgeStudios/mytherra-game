---
name: push_backend
description: Deploy backend changes (Cloud Functions, Firestore rules) to the live Firebase project. Builds backend/functions/, then runs a scoped firebase deploy for whatever actually changed. Use when the user asks to deploy, push, or ship backend/Firebase changes.
tools: Bash, Read, Grep
---

# Push Backend

Deploys `backend/` to the live **forgotten-wilds** Firebase project. This hits a real,
shared environment — unlike `/push` (which just commits to git), a bad deploy here is
user-visible immediately. Move carefully.

## Steps

1. From `backend/`, run `firebase use` and confirm it prints `forgotten-wilds`. If it
   doesn't, **stop** — don't deploy to the wrong project.
2. Check what actually changed under `backend/` (`git status`, `git diff`) to figure
   out the deploy scope:
   - Changes under `backend/functions/src/` → functions changed
   - Changes to `backend/firestore.rules` → rules changed
   - Nothing changed under `backend/` → say so and stop, nothing to deploy
3. If functions changed: `cd backend/functions && npm install && npm run build`.
   **If the build fails, stop — do not deploy broken code.** Report the build error
   instead.
4. Deploy only what changed, from `backend/`:
   - Functions only: `firebase deploy --only functions`
   - Rules only: `firebase deploy --only firestore:rules`
   - Both: `firebase deploy --only functions,firestore:rules`
5. Report exactly what was deployed and the CLI's output (function URLs, rules
   version, etc.).

## Guardrails

- Never run a bare `firebase deploy` with no `--only` scope unless the user
  explicitly asks to deploy everything — an unscoped deploy can touch other
  services not meant to change here.
- Never deploy with changes you haven't summarized for the user first — no surprises
  on a live project.
- This is currently a skeleton project with no real function logic yet
  (`backend/functions/src/index.ts` exports nothing). Until that changes, there's
  nothing meaningful to deploy — say so rather than deploying an empty function set
  for the sake of it.
