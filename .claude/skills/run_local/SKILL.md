---
name: run_local
description: Start or stop the local Vite dev server for Forgotten Wilds, for manual testing in a browser. Usage - "start" or "stop" as the argument. Tracks the server PID so stop reliably kills the right process. Use when the user wants to test the game locally.
tools: Bash, Read, Write
---

# Run Local

Starts or stops the Vite dev server in the background, so it doesn't tie up the
foreground terminal. State (PID, log) lives in `.claude/run/` — gitignored, local
only.

**Argument:** expects `start` or `stop`. If neither was given, check current status
(the "Start" step 1 below tells you how) and ask which one is wanted.

## Start

1. Check `.claude/run/dev-server.pid` — if it exists, check whether that PID is
   still alive (`tasklist //FI "PID eq <pid>"` on Windows). If it's alive, the
   server's already running — report the URL and stop here instead of starting a
   second one.
2. `mkdir -p .claude/run`
3. Launch in the background:
   ```bash
   nohup npm run dev > .claude/run/dev-server.log 2>&1 &
   echo $! > .claude/run/dev-server.pid
   ```
4. Poll until it's actually serving (don't just sleep a fixed time):
   ```bash
   timeout 30 bash -c 'until curl -sf http://localhost:5173/mytherra-game/ >/dev/null; do sleep 1; done'
   ```
5. Report the local URL (`http://localhost:5173/mytherra-game/`, per
   `vite.config.ts`'s `base`).

## Stop

1. Read `.claude/run/dev-server.pid`. If it doesn't exist, report that nothing's
   running and stop.
2. `taskkill //F //T //PID <pid>` (Windows — the `//` is needed because this runs
   under Git Bash, which would otherwise treat `/F` as a path). If that PID is
   already gone, that's fine, not an error.
3. Delete `.claude/run/dev-server.pid`.
4. Confirm the port is actually free: `netstat -ano | grep 5173` should show no
   `LISTENING` entry (`TIME_WAIT` entries from closed connections are fine).

## Guardrails

- Never start a second dev server without stopping the first — check the pidfile
  every time, not just on first use.
- This only manages the frontend dev server. It has nothing to do with
  `backend/functions` emulators — that's a separate concern if it comes up later.
