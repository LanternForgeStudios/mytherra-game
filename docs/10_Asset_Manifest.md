# Initial Asset Manifest v0.1


## 1. Purpose
This manifest tracks all visual, audio, UI, and placeholder assets needed for the first playable vertical slice of Mytherra.
Asset status values:
Planned
Placeholder
Generated
Approved
Integrated
Needs Revision

## 2. Asset Rules
All assets must have:
Stable asset ID
Category
Intended use
File path
Required dimensions
Status
Notes
Engine code should reference asset IDs, not informal file names.

## 3. Visual Style Target
Style:
Top-down 2D JRPG
Painterly pixel art
Cozy but mysterious
Lantern-lit folklore fantasy
Initial region:
Ash Hollow
Iron Mountains
Forest paths
Old creek shrine

## 4. Core Player Assets
Asset ID
Type
Size
Path
Status
char_player_base_001
Player sprite sheet
32x32 per frame
/assets/characters/player_base.png
Placeholder
char_player_portrait_001
Portrait
512x512
/assets/portraits/player_base.png
Planned
item_lantern_basic_001
Icon
64x64
/assets/icons/lantern_basic.png
Planned

## 5. NPC Assets
Asset ID
NPC
Type
Size
Status
npc_elias_rowan_sprite
Elias Rowan
Sprite sheet
32x32/frame
Placeholder
npc_elias_rowan_portrait
Elias Rowan
Portrait
512x512
Planned
npc_mara_ash_sprite
Mara Ash
Sprite sheet
32x32/frame
Placeholder
npc_mara_ash_portrait
Mara Ash
Portrait
512x512
Planned
npc_shopkeeper_001_sprite
General storekeeper
Sprite sheet
32x32/frame
Placeholder
npc_innkeeper_001_sprite
Innkeeper
Sprite sheet
32x32/frame
Placeholder
npc_blacksmith_001_sprite
Blacksmith
Sprite sheet
32x32/frame
Placeholder

## 6. Enemy Assets
Asset ID
Enemy
Type
Size
Status
enemy_echo_raven_001
Frightened Raven Echo
Battle sprite
128x128
Planned
enemy_spirit_wolf_001
Spirit Wolf
Battle sprite
128x128
Planned
enemy_coal_sprite_001
Coal Sprite
Battle sprite
128x128
Planned
boss_old_creek_echo_001
Old Creek Echo
Boss sprite
256x256
Planned

## 7. Map and Tileset Assets
Asset ID
Use
Size
Path
Status
tileset_ash_hollow_001
Town tileset
16x16 or 32x32 tiles
/assets/tilesets/ash_hollow.png
Placeholder
tileset_iron_forest_001
Forest tileset
16x16 or 32x32 tiles
/assets/tilesets/iron_forest.png
Placeholder
tileset_old_creek_shrine_001
Shrine tileset
16x16 or 32x32 tiles
/assets/tilesets/old_creek_shrine.png
Planned
map_ash_hollow_001
Starting town map
Tiled JSON
/assets/maps/ash_hollow.json
Planned
map_iron_forest_001
First forest map
Tiled JSON
/assets/maps/iron_forest.json
Planned
map_old_creek_shrine_001
Shrine map
Tiled JSON
/assets/maps/old_creek_shrine.json
Planned

## 8. UI Assets
Asset ID
Use
Size
Status
ui_dialogue_panel_001
Dialogue box
scalable 9-slice
Planned
ui_battle_panel_001
Battle command UI
scalable 9-slice
Planned
ui_inventory_panel_001
Inventory menu
scalable 9-slice
Planned
ui_journal_icon_001
Journal icon
64x64
Planned
ui_quest_icon_001
Quest marker
32x32
Planned
ui_lantern_cursor_001
Interaction cursor
32x32
Planned

## 9. Item Icons
Asset ID
Item
Size
Status
item_potion_small_001
Small Potion
64x64
Planned
item_spirit_essence_small_001
Small Spirit Essence
64x64
Planned
item_dark_feather_001
Dark Feather
64x64
Planned
item_old_creek_charm_001
Old Creek Charm
64x64
Planned
weapon_walking_staff_001
Walking Staff
64x64
Planned
armor_keeper_coat_001
Keeper Coat
64x64
Planned

## 10. Battle Backgrounds
Asset ID
Scene
Size
Status
bg_battle_iron_forest_day_001
Forest battle
1280x720
Planned
bg_battle_iron_forest_night_001
Night forest battle
1280x720
Planned
bg_battle_old_creek_shrine_001
Shrine battle
1280x720
Planned

## 11. Audio Assets
Asset ID
Use
Format
Status
music_title_theme_001
Title screen
.mp3/.ogg
Planned
music_ash_hollow_001
Town theme
.mp3/.ogg
Planned
music_iron_forest_001
Forest exploration
.mp3/.ogg
Planned
music_battle_basic_001
Standard battle
.mp3/.ogg
Planned
music_shrine_restored_001
Shrine restoration
.mp3/.ogg
Planned
sfx_lantern_glow_001
Lantern activation
.wav/.ogg
Planned
sfx_menu_confirm_001
UI confirm
.wav/.ogg
Planned
sfx_menu_cancel_001
UI cancel
.wav/.ogg
Planned
sfx_attack_basic_001
Basic attack
.wav/.ogg
Planned
sfx_spirit_spark_001
Spirit Spark
.wav/.ogg
Planned

## 12. Priority Order
First assets to create or source: 1. Placeholder player sprite 2. Placeholder town tileset 3. Placeholder forest tileset 4. Dialogue UI panel 5. Elias Rowan portrait 6. Frightened Raven Echo 7. Lantern icon 8. Battle background 9. Title logo 10. Shrine restoration visual

## 13. Placeholder Strategy
Use placeholder/free assets for the first prototype.
Replace later with custom Mytherra art.
Do not block engineering progress waiting for final art.

## 14. Asset Naming Convention
Format:
category_subject_variant_number
Examples:
enemy_echo_raven_001
npc_elias_rowan_portrait_001
tileset_ash_hollow_001
ui_dialogue_panel_001
music_iron_forest_001

## 15. Integration Rule
Every asset must be registered in the asset manifest before being referenced by game code.
No direct references to random file paths inside scenes.
