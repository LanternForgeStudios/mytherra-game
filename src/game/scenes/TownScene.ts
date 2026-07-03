import Phaser from 'phaser'
import { loadContent } from '../../data/contentRegistry'
import type { Region } from '../../types/region'
import { GridMovementController } from '../systems/GridMovement'

interface TownSceneData {
  regionId?: string
}

const EDGE_TILE_COLOR = 0x2e3a2e
const FLOOR_TILE_COLOR = 0x35422f
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
    // region's name, description, and map size all come from
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

    this.drawGrid(region, originX, originY)

    new GridMovementController({
      scene: this,
      tileSize: region.tileSize,
      mapWidth: region.mapWidth,
      mapHeight: region.mapHeight,
      originX,
      originY,
      startTileX: Math.floor(region.mapWidth / 2),
      startTileY: Math.floor(region.mapHeight / 2),
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
