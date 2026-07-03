# Software Architecture Specification v0.1


## 1. Architecture Philosophy
Project Mytherra should be built as a data-driven browser JRPG engine.
The game code should define reusable systems.
The content should live in structured data files.
The backend should store player state, not hardcoded game lore.

## 2. Core Principle
Content is data.
Systems are code.
Player progress is Firebase.
Static game content is Git.

## 3. Technology Stack
Frontend:
Vite
TypeScript
Phaser 3
HTML/CSS
Backend:
Firebase Auth
Firestore
Firebase Cloud Functions
Deployment:
GitHub Pages for frontend
Firebase for backend services

## 4. Major Engine Modules
Core Engine:
Boot sequence
Scene management
Save/load orchestration
Event bus
World Engine:
Tile maps
Collision
Movement
Map transitions
NPC placement
Interactions
Dialogue Engine:
Dialogue trees
NPC conversations
Conditional dialogue
Quest-linked dialogue
Quest Engine:
Quest state
Objectives
Requirements
Rewards
Branching outcomes
Combat Engine:
Turn order
Actions
Damage
Status effects
Resonance
Rewards
Battle logs
Inventory Engine:
Items
Equipment
Consumables
Quest items
Currency
Journal Engine:
Creatures
Places
People
Legends
Artifacts
Observations
Resonance Engine:
Resonance affinities
Harmony profile
Environmental resonance
Lantern attunement
Hidden interactions
Asset Engine:
Asset manifest
Preloading
Sprite references
Audio references
UI references
Firebase Service Layer:
Auth
Player profile
Save data
Quest progress
Inventory
Journal
Achievements
Future multiplayer

## 5. Recommended Folder Structure
mytherra/  public/    assets/      characters/      enemies/      maps/      tilesets/      portraits/      ui/      icons/      audio/  src/    game/      scenes/      systems/      engine/      ui/    content/      regions/      npcs/      quests/      enemies/      items/      skills/      dialogue/      achievements/      journal/    firebase/      auth.ts      firestore.ts      functions.ts    types/      player.ts      combat.ts      quest.ts      item.ts      npc.ts      resonance.ts      journal.ts    data/      contentRegistry.ts    utils/    main.ts  functions/    src/      battle/      quest/      rewards/      daily/      index.ts  docs/    gdd/    lore/    architecture/    art/    combat/    production/

## 6. Content File Strategy
All game content should eventually be defined in JSON or YAML.
Examples:
enemies
items
quests
NPCs
shops
maps
dialogue trees
skills
achievements
journal entries
The engine should load content by ID.
No system should rely on hardcoded content names.

## 7. Example Enemy Content
{  "id": "echo_raven_001",  "displayName": "Frightened Raven Echo",  "localNames": ["Blackwing", "Ash Hollow Raven"],  "lanternName": "Minor Moon Echo",  "ancientName": null,  "region": "iron_mountains",  "level": 1,  "resonance": ["Moon"],  "stats": {    "hp": 30,    "strength": 4,    "resolve": 2,    "insight": 3,    "agility": 8,    "presence": 2  },  "weaknesses": ["Dawn"],  "resistances": ["Moon"],  "actions": ["peck", "shadow_flutter"],  "lootTable": ["feather_dark", "spirit_essence_small"],  "journalEntries": ["journal_echo_raven_001"]}

## 8. Example Quest Content
{  "id": "quest_lantern_wouldnt_go_out",  "title": "The Lantern That Wouldn't Go Out",  "region": "iron_mountains",  "giverNpcId": "npc_elias_rowan",  "objectives": [    {      "id": "speak_to_child",      "type": "talk_to_npc",      "targetId": "npc_mara_ash"    },    {      "id": "investigate_forest_lantern",      "type": "visit_location",      "targetId": "loc_old_creek_shrine"    },    {      "id": "restore_shrine",      "type": "complete_interaction",      "targetId": "shrine_old_creek"    }  ],  "rewards": {    "xp": 50,    "gold": 25,    "items": ["potion_small"],    "journalUnlocks": ["journal_old_creek_shrine"]  }}

## 9. Firebase Separation
Firebase stores player state only.
Examples:
current player stats
inventory quantities
equipped item IDs
completed quests
journal unlocks
achievements
current map and position
Firebase should not store full enemy definitions, item definitions, or quest scripts unless needed for security validation.

## 10. Cloud Functions
Cloud Functions should handle trusted logic:
battle resolution
reward granting
quest completion validation
daily/weekly resets
premium currency validation in the future
The frontend may request an action.
The backend decides whether it is valid.

## 11. Multiplayer Strategy
Do not start with multiplayer.
Build single-player systems first.
Later multiplayer modules:
shared town presence
chat
friends
party formation
co-op expedition rooms
Lodge system
world event contribution tracking

## 12. Claude Code Development Rule
Claude Code should never be asked to “build the whole game.”
It should be given one bounded task at a time.
Good: “Create the Vite + TypeScript + Phaser project skeleton.”
Bad: “Build Mytherra.”
Good: “Implement the content registry for loading enemy and item JSON files.”
Bad: “Add enemies.”

## 13. First Build Goal
The first engineering milestone is not gameplay.
It is the skeleton:
Vite app runs
Phaser canvas loads
BootScene exists
PreloadScene exists
TownScene exists
Firebase config placeholder exists
Folder structure matches specification
Content registry stub exists
Type definitions exist for Player, Enemy, Item, Quest, NPC, and Resonance

## 14. When to Start Claude Code
Start Claude Code after these documents exist:
Game Design Document
World Bible
Combat Bible
Software Architecture Specification
Initial Asset Manifest
Claude Code Playbook
At that point, Claude Code can safely create the repository structure.
