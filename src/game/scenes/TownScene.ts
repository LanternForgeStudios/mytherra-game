import Phaser from 'phaser'
import { loadContent } from '../../data/contentRegistry'
import type { Enemy } from '../../types/combat'

export class TownScene extends Phaser.Scene {
  constructor() {
    super('town')
  }

  create(): void {
    const { width, height } = this.scale

    this.add
      .text(width / 2, height / 2 - 20, 'Forgotten Wilds', {
        fontSize: '32px',
        color: '#f4e8d0',
      })
      .setOrigin(0.5)

    // Pulls a real content record by ID to prove the content/systems split
    // works end to end — this scene has no idea what a "Raven Echo" is,
    // it just renders whatever displayName comes back from the registry.
    const sample = loadContent<Enemy>('echo_raven_001')

    this.add
      .text(width / 2, height / 2 + 20, `Content loaded: ${sample.displayName}`, {
        fontSize: '16px',
        color: '#9fb89f',
      })
      .setOrigin(0.5)
  }
}
