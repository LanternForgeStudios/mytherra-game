import Phaser from 'phaser'
import { loadContent } from '../../data/contentRegistry'
import type { Enemy } from '../../types/combat'

interface BattleSceneData {
  enemyId?: string
}

const DEFAULT_ENEMY_ID = 'echo_raven_001'

// Scaffold only: proves the Town <-> Battle transition works and that an
// Enemy can be loaded by ID into a battle context. No HP/attack/observe/log/
// win-condition logic yet — that's the next bounded step.
export class BattleScene extends Phaser.Scene {
  private enemyId = DEFAULT_ENEMY_ID

  constructor() {
    super('battle')
  }

  init(data: BattleSceneData): void {
    this.enemyId = data.enemyId ?? DEFAULT_ENEMY_ID
  }

  create(): void {
    const { width, height } = this.scale
    const enemy = loadContent<Enemy>(this.enemyId)

    this.add
      .text(width / 2, height / 2 - 40, 'A wild encounter!', {
        fontSize: '24px',
        color: '#f4e8d0',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height / 2, enemy.displayName, {
        fontSize: '20px',
        color: '#e08585',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height / 2 + 40, 'Press ESC to flee back to town', {
        fontSize: '14px',
        color: '#9fb89f',
      })
      .setOrigin(0.5)

    const keyboard = this.input.keyboard
    if (!keyboard) {
      throw new Error('Keyboard input is not available on this scene')
    }
    keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).on('down', () => {
      this.scene.start('town')
    })
  }
}
