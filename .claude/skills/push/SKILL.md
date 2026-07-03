---
name: push
description: Commit and push all pending changes in this repo to GitHub, after verifying README.md reflects the current state. Use when the user asks to push, commit, "sync to GitHub", or ship the working tree.
tools: Bash, Read, Edit, Grep, Glob
---

# Push

Commits and pushes everything in the working tree to `origin` on the current branch.

## Steps

1. `git status` and `git diff` (staged + unstaged) to see what's actually changed. If
   nothing changed, say so and stop — don't create an empty commit.
2. **Check README.md is still accurate** before committing:
   - Does the "Repo layout" section match the actual top-level folders?
   - Do the documented npm scripts match `package.json` `scripts`?
   - If `backend/functions/` structure changed, does the backend section still hold up?
   - If it's stale, make a targeted edit (don't rewrite the whole file) to fix just
     what's wrong.
3. Review `git status` for anything that shouldn't be committed before staging —
   `.env`, `backend/.firebaserc`, `node_modules/`, `dist/`, `backend/functions/lib/`
   should never show up as untracked-to-add; if one does, stop and check
   `.gitignore` instead of adding it anyway.
4. `git add -A`, then write a commit message describing *why* the change was made,
   not just what changed (match the style of existing commits once there's history
   to follow).
5. Commit with **both** required trailers — this workspace's CLAUDE.md mandates them
   on every commit:
   ```
   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   Co-Authored-By: Bear0053 <bob0053@gmail.com>
   ```
6. `git push` (use `-u origin main` if this is the first push on the branch). Never
   force-push; never `--no-verify`.
7. Report what was committed and pushed, with the commit hash.

## Guardrails

- Never commit `.env`, `backend/.firebaserc`, or anything under
  `node_modules/`/`dist/`/`backend/functions/lib/`.
- If there are merge conflicts or the local branch is behind `origin/main`, stop and
  tell the user rather than force-pushing or resetting.
