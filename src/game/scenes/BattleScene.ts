import Phaser from 'phaser'
import { loadContent } from '../../data/contentRegistry'
import type { BattleState, Enemy } from '../../types/combat'
import { createBattleState, applyAttack, applyObserve } from '../systems/BattleLogic'

interface BattleSceneData {
  enemyId?: string
}

const DEFAULT_ENEMY_ID = 'echo_raven_001'
const LOG_VISIBLE_LINES = 4

export class BattleScene extends Phaser.Scene {
  private enemyId = DEFAULT_ENEMY_ID
  private enemy!: Enemy
  private battleState!: BattleState

  private enemyNameText!: Phaser.GameObjects.Text
  private enemyHpText!: Phaser.GameObjects.Text
  private playerHpText!: Phaser.GameObjects.Text
  private logText!: Phaser.GameObjects.Text
  private commandHintText!: Phaser.GameObjects.Text

  constructor() {
    super('battle')
  }

  init(data: BattleSceneData): void {
    this.enemyId = data.enemyId ?? DEFAULT_ENEMY_ID
  }

  create(): void {
    const { width } = this.scale
    this.enemy = loadContent<Enemy>(this.enemyId)
    this.battleState = createBattleState(this.enemy)

    this.enemyNameText = this.add
      .text(width / 2, 60, '', { fontSize: '22px', color: '#e08585' })
      .setOrigin(0.5)
    this.enemyHpText = this.add
      .text(width / 2, 90, '', { fontSize: '14px', color: '#e08585' })
      .setOrigin(0.5)
    this.playerHpText = this.add
      .text(width / 2, 130, '', { fontSize: '14px', color: '#f4e8d0' })
      .setOrigin(0.5)
    this.logText = this.add.text(32, 200, '', {
      fontSize: '13px',
      color: '#9fb89f',
      wordWrap: { width: width - 64 },
    })
    this.commandHintText = this.add
      .text(width / 2, 380, '', { fontSize: '14px', color: '#c9a15a' })
      .setOrigin(0.5)

    const keyboard = this.input.keyboard
    if (!keyboard) {
      throw new Error('Keyboard input is not available on this scene')
    }
    keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).on('down', () => this.handleCommand(applyAttack))
    keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).on('down', () => this.handleCommand(applyObserve))
    keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).on('down', () => {
      this.scene.start('town')
    })

    this.render()
  }

  private handleCommand(action: (state: BattleState, enemy: Enemy) => BattleState): void {
    if (this.battleState.status !== 'active') return
    this.battleState = action(this.battleState, this.enemy)
    this.render()
  }

  private render(): void {
    const state = this.battleState

    this.enemyNameText.setText(this.enemy.displayName)
    this.enemyHpText.setText(`HP: ${state.enemyHp}/${state.enemyMaxHp}`)
    this.playerHpText.setText(`You   HP: ${state.playerHp}/${state.playerMaxHp}`)
    this.logText.setText(state.log.slice(-LOG_VISIBLE_LINES).join('\n'))

    if (state.status === 'active') {
      this.commandHintText.setText('A: Attack   O: Observe   ESC: Flee')
    } else if (state.status === 'won') {
      this.commandHintText.setText('Victory! Press ESC to return to town')
    } else {
      this.commandHintText.setText('Defeated. Press ESC to return to town')
    }
  }
}
