import Phaser from 'phaser'
import { loadContent } from '../../data/contentRegistry'
import type { Region } from '../../types/region'

interface TownSceneData {
  regionId?: string
}

export class TownScene extends Phaser.Scene {
  private regionId = 'ash_hollow'

  constructor() {
    super('town')
  }

  init(data: TownSceneData): void {
    this.regionId = data.regionId ?? 'ash_hollow'
  }

  create(): void {
    const { width, height } = this.scale

    // This scene has no idea what "Ash Hollow" is beyond a content ID — the
    // region's name/description comes entirely from src/content/regions/.
    // Swapping regionId (once region switching exists) is all it takes to
    // put the player somewhere else.
    const region = loadContent<Region>(this.regionId)

    this.add
      .text(width / 2, height / 2 - 20, region.displayName, {
        fontSize: '32px',
        color: '#f4e8d0',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height / 2 + 20, region.description, {
        fontSize: '16px',
        color: '#9fb89f',
        wordWrap: { width: width - 80 },
        align: 'center',
      })
      .setOrigin(0.5)
  }
}
