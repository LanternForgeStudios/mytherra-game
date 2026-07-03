import Phaser from 'phaser'
import { loadContent } from '../../data/contentRegistry'
import type { Region } from '../../types/region'
import type { NPC } from '../../types/npc'
import type { Dialogue } from '../../types/dialogue'
import { GridMovementController } from '../systems/GridMovement'
import { findAdjacentNpc } from '../systems/NpcInteraction'
import { DialogueBox } from '../ui/DialogueBox'

interface TownSceneData {
  regionId?: string
}

const EDGE_TILE_COLOR = 0x2e3a2e
const FLOOR_TILE_COLOR = 0x35422f
const NPC_COLOR = 0xc9a15a
const TILE_GAP = 1
const MAP_TOP_MARGIN = 90

export class TownScene extends Phaser.Scene {
  private regionId = 'ash_hollow'

  constructor() {
    super('town')
  }

  init(data: TownSceneData): void {
    this.regionId = data.regionId ?? 'ash_hollow'
  }

  create(): void {
    const { width } = this.scale

    // This scene has no idea what "Ash Hollow" is beyond a content ID — the
    // region's name, description, map size, and NPC placements all come from
    // src/content/regions/. Swapping regionId (once region switching exists)
    // is all it takes to put the player somewhere else.
    const region = loadContent<Region>(this.regionId)

    this.add.text(16, 12, region.displayName, {
      fontSize: '20px',
      color: '#f4e8d0',
    })
    this.add.text(16, 40, region.description, {
      fontSize: '13px',
      color: '#9fb89f',
      wordWrap: { width: width - 32 },
    })

    const originX = (width - region.mapWidth * region.tileSize) / 2
    const originY = MAP_TOP_MARGIN
    const tileToWorld = (tileX: number, tileY: number): { x: number; y: number } => ({
      x: originX + tileX * region.tileSize + region.tileSize / 2,
      y: originY + tileY * region.tileSize + region.tileSize / 2,
    })

    this.drawGrid(region, originX, originY)

    for (const placement of region.npcs) {
      const pos = tileToWorld(placement.tileX, placement.tileY)
      this.add
        .rectangle(pos.x, pos.y, region.tileSize * 0.6, region.tileSize * 0.6, NPC_COLOR)
        .setDepth(10)
    }

    const movement = new GridMovementController({
      scene: this,
      tileSize: region.tileSize,
      mapWidth: region.mapWidth,
      mapHeight: region.mapHeight,
      originX,
      originY,
      startTileX: Math.floor(region.mapWidth / 2),
      startTileY: Math.floor(region.mapHeight / 2),
      blockedTiles: region.npcs.map((placement) => ({ x: placement.tileX, y: placement.tileY })),
    })

    const dialogueBox = new DialogueBox(this)

    const keyboard = this.input.keyboard
    if (!keyboard) {
      throw new Error('Keyboard input is not available on this scene')
    }
    const interactKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    interactKey.on('down', () => {
      if (dialogueBox.isVisible) {
        dialogueBox.hide()
        return
      }

      const nearby = findAdjacentNpc(movement.getTilePosition(), region.npcs)
      if (!nearby) return

      const npc = loadContent<NPC>(nearby.npcId)
      const dialogue = loadContent<Dialogue>(npc.dialogueId)
      dialogueBox.show(dialogue.speaker, dialogue.lines[0] ?? '')
    })
  }

  private drawGrid(region: Region, originX: number, originY: number): void {
    const graphics = this.add.graphics()
    for (let tileY = 0; tileY < region.mapHeight; tileY++) {
      for (let tileX = 0; tileX < region.mapWidth; tileX++) {
        const isEdge =
          tileX === 0 || tileY === 0 || tileX === region.mapWidth - 1 || tileY === region.mapHeight - 1
        graphics.fillStyle(isEdge ? EDGE_TILE_COLOR : FLOOR_TILE_COLOR, 1)
        graphics.fillRect(
          originX + tileX * region.tileSize,
          originY + tileY * region.tileSize,
          region.tileSize - TILE_GAP,
          region.tileSize - TILE_GAP,
        )
      }
    }
  }
}
