# Claude Code Playbook v0.1


## 1. Purpose
Claude Code should act as an implementation assistant, not as the creative director.
It should follow the approved design documents:
Game Design Document
World Bible
Combat Bible
Software Architecture Specification
Art Bible when available
Asset Manifest when available
Claude Code should build one bounded piece at a time.

## 2. Golden Rules
Do not ask Claude Code to build the whole game.
Do not let Claude Code invent major lore, mechanics, or architecture unless explicitly asked.
Do not accept huge code dumps without review.
Do not allow hardcoded content when content should be data-driven.
Do not implement multiplayer before the single-player vertical slice works.

## 3. Standard Claude Code Prompt Format
Use this structure for every coding task:
You are helping build Project Mytherra, a browser-based data-driven JRPG using Vite, TypeScript, Phaser 3, Firebase Auth, Firestore, and Firebase Cloud Functions.Follow the current architecture:- Content is data.- Systems are code.- Player progress is Firebase.- Static content is Git.Task:[Describe one specific task.]Requirements:[List exact requirements.]Do not:[List constraints.]Definition of done:[List what must work before stopping.]

## 4. First Claude Code Prompt
Use this when ready to create the repo:
You are helping build Project Mytherra, a browser-based data-driven JRPG using Vite, TypeScript, Phaser 3, Firebase Auth, Firestore, and Firebase Cloud Functions.Follow these principles:- Content is data.- Systems are code.- Player progress is Firebase.- Static game content is stored in Git.- Do not hardcode game lore into engine systems.Task:Create the initial project skeleton only.Requirements:- Create a Vite + TypeScript project.- Install Phaser 3 and Firebase.- Create the folder structure from the Software Architecture Specification.- Create BootScene, PreloadScene, and TownScene.- Render a Phaser canvas successfully.- Add placeholder Firebase config.- Create TypeScript type files for Player, Enemy, Item, Quest, NPC, Resonance, JournalEntry, and BattleSession.- Create a content registry stub.- Add a README explaining setup and next steps.Do not:- Implement combat.- Implement quests.- Implement multiplayer.- Add real Firebase credentials.- Add generated art assets.- Create large systems beyond the skeleton.Definition of done:- npm install works.- npm run dev starts the app.- The browser displays the TownScene placeholder.- TypeScript compiles without errors.

## 5. Review Checklist After Every Claude Code Task
After Claude Code completes a task, check:
Does the app still run?
Does TypeScript compile?
Did it follow the folder structure?
Did it keep systems separate from content?
Did it avoid hardcoding lore into engine code?
Did it create files that are too large?
Did it explain what changed?
Did it add unnecessary features?
Did it preserve existing functionality?
If anything is wrong, ask for a targeted correction.

## 6. Good Follow-Up Prompt
Review the code you just created against the Software Architecture Specification.Identify:- Any architecture violations- Any unnecessary complexity- Any hardcoded content that should be data-driven- Any missing types- Any files that should be splitThen propose a minimal patch.Do not add new features.

## 7. Phase 1 Claude Code Task List
Task 1 — Project Skeleton
Create Vite + TypeScript + Phaser + Firebase structure.
Task 2 — Content Registry
Create a system for loading typed content definitions from JSON.
Task 3 — Player Types and Local Test Profile
Create PlayerProfile and PlayerState types. Create mock local player data for testing.
Task 4 — Basic Map Scene
Create a placeholder tile-based TownScene with simple movement.
Task 5 — Collision and Interaction Zones
Add collision blocks and interaction triggers.
Task 6 — NPC System Stub
Load NPC definitions from content data. Render placeholder NPCs.
Task 7 — Dialogue System Stub
Display dialogue from content files.
Task 8 — Quest System Stub
Track basic quest states locally.
Task 9 — Firebase Auth Stub
Add Firebase Auth integration with anonymous login or placeholder login flow.
Task 10 — Firestore Save Stub
Save and load player profile and position.

## 8. How to Ask Claude Code for Refactors
Use:
Refactor only the files needed to improve maintainability.Keep behavior the same.Do not add new gameplay features.Explain every changed file.

## 9. How to Ask Claude Code for Bug Fixes
Use:
Fix this bug only:[Describe bug.]Expected behavior:[Describe expected behavior.]Actual behavior:[Describe actual behavior.]Constraints:- Do not rewrite unrelated systems.- Do not change public type contracts unless necessary.- Keep the patch minimal.

## 10. How to Ask Claude Code for Content
Use:
Create content data only.Do not modify engine code unless the existing schema cannot support the content.Create:[List content items.]Follow existing schemas.Use placeholder asset IDs where art does not exist yet.

## 11. How to Ask Claude Code for Tests
Use:
Add tests for the following system:[System name.]Focus on:- Pure logic- Edge cases- Invalid inputs- Regression protectionDo not test Phaser rendering unless necessary.

## 12. When Not to Use Claude Code
Do not use Claude Code for:
Final lore decisions
Art direction choices
Monetization strategy
Major architecture changes without written approval
Large feature bundles
Anything that spans more than one milestone without breaking it down

## 13. Git Workflow
Use small commits.
Recommended commit style:
chore: create initial project skeletonfeat: add content registryfeat: add player profile typesfeat: add town scene placeholderfeat: add npc content loadingfix: correct Phaser scene initializationdocs: update architecture notes

## 14. Branch Strategy
Use:
maindevelopfeature/project-skeletonfeature/content-registryfeature/town-scenefeature/dialogue-systemfeature/firebase-auth
Merge only after:
app runs
TypeScript passes
changes are reviewed
feature scope matches the task

## 15. Development Discipline
The project should move in this order:
Skeleton
Data loading
Movement
Interaction
Dialogue
Quest tracking
Save/load
Combat prototype
Inventory
Equipment
Journal
Art replacement
Multiplayer
Do not skip ahead.

## 16. Claude Code Operating Principle
Claude Code is the builder.
The design documents are the blueprint.
The user is the creative director.
ChatGPT is the producer, system designer, and reviewer.
