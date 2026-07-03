# Forgotten Wilds

*Project Mytherra* — a browser-based, data-driven, shared-world JRPG set on the
continent of Mytherra. Built by **Lantern Forge Studios**.

## Architecture

- Content is data.
- Systems are code.
- Player progress is Firebase.
- Static game content is Git.

The engine (`src/game/`) never hardcodes lore, names, or stats — it loads everything
by content ID through `src/data/contentRegistry.ts` from JSON files under
`src/content/`. See `docs/08_Software_Architecture_Specification.md` for the full
spec and `docs/09_Claude_Code_Playbook.md` for how this project is built task by task.

Entry is gated by Firebase Auth: `index.html` has separate `#auth` (login form) and
`#app` (Phaser canvas) containers, and `src/main.ts` uses `onAuthStateChanged` to
show one or the other — the Phaser game isn't created until a user is signed in. The
login UI itself (`src/auth/AuthScreen.ts`) is plain DOM, not a Phaser scene.

## Stack

- Vite + TypeScript
- Phaser (client rendering/game loop)
- Firebase Auth + Firestore (player progress)
- Firebase Cloud Functions (trusted server logic — `backend/functions/`)
- GitHub Pages (frontend hosting, via the Actions workflow in `.github/workflows/`)

## Local setup

```bash
npm install
cp .env.example .env   # fill in your Firebase project's client config
npm run dev
```

`npm run build` produces `dist/`, which is what the GitHub Actions workflow deploys
to GitHub Pages on every push to `main` — you don't need to build or publish that
manually.

## Repo layout

```
index.html, src/, public/        the game client (this is the Vite project root)
backend/functions/                Firebase Cloud Functions (see "Backend Functions" below)
docs/                             design docs (GDD, World Bible, Combat Bible, etc.)
                                   converted from the source .docx files
.github/workflows/deploy-pages.yml
```

## Testing

```bash
npm test
```

[Vitest](https://vitest.dev). Per the Claude Code Playbook (§11), tests target pure
logic — the content registry today, combat math/quest state/inventory logic as those
get built — not Phaser rendering. Tests live next to the code they cover
(`*.test.ts`).

## Backend Functions

`backend/functions/` is connected to the live **forgotten-wilds** Firebase project
(`backend/.firebaserc`, gitignored — copy `backend/.firebaserc.example` if you're
setting this up fresh on another machine, along with `firebase login`). No functions
are exported yet (`backend/functions/src/index.ts` is a placeholder) — nothing to
deploy until real logic exists.

## Claude Code Skills

This repo has project skills under `.claude/skills/` for common workflows:

- `/push` — commit and push all changes, after checking README.md is still accurate
- `/clean_code` — read-only audit for dead code, bugs, and inefficiencies
- `/push_backend` — build and deploy `backend/functions/`/Firestore rules to the live
  Firebase project
- `/run_local start` / `/run_local stop` — run the dev server in the background for
  manual browser testing

## Current status

Login (email/password + Google, via Firebase Auth) gates entry into the game; once
signed in, the player boots straight into Ash Hollow and can move around with
arrow keys/WASD (tile-locked, one tile per press). Walking next to Elias Rowan and
pressing Space opens a short dialogue box; pressing Space again closes it. Still no
combat, no quests, no multiplayer, no final art, and no Firestore-backed player save
yet — those are the next layers. See `docs/11_Production_Roadmap.md` for the broader
roadmap.

**Google sign-in on GitHub Pages:** if "Sign in with Google" fails on the live site
with an unauthorized-domain error, add `lanternforgestudios.github.io` under
Firebase Console → Authentication → Settings → Authorized domains (`localhost` is
authorized by default, the Pages domain isn't automatically).
