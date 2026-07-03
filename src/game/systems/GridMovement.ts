import Phaser from 'phaser'

export interface GridMovementConfig {
  scene: Phaser.Scene
  tileSize: number
  mapWidth: number
  mapHeight: number
  originX: number
  originY: number
  startTileX: number
  startTileY: number
}

const MOVE_DURATION_MS = 150

// Reusable tile-locked movement: one keypress moves exactly one tile, blocked
// at the map edges. No sprite art yet, so the player is a placeholder
// rectangle — swapping in a real sprite later doesn't touch this system.
//
// Input is event-driven ('down' on each Key), not polled in an update()
// loop. Phaser resets Key._justDown on the keyup event itself, so polling
// JustDown() can miss a press entirely if keydown+keyup land within the same
// animation frame (common with fast/synthetic key presses) — listening for
// the 'down' event sidesteps that race.
export class GridMovementController {
  private readonly scene: Phaser.Scene
  private readonly tileSize: number
  private readonly mapWidth: number
  private readonly mapHeight: number
  private readonly originX: number
  private readonly originY: number
  private readonly sprite: Phaser.GameObjects.Rectangle
  private tileX: number
  private tileY: number
  private isMoving = false

  constructor(config: GridMovementConfig) {
    this.scene = config.scene
    this.tileSize = config.tileSize
    this.mapWidth = config.mapWidth
    this.mapHeight = config.mapHeight
    this.originX = config.originX
    this.originY = config.originY
    this.tileX = config.startTileX
    this.tileY = config.startTileY

    const keyboard = this.scene.input.keyboard
    if (!keyboard) {
      throw new Error('Keyboard input is not available on this scene')
    }

    this.sprite = this.scene.add
      .rectangle(
        this.tileToWorldX(this.tileX),
        this.tileToWorldY(this.tileY),
        this.tileSize * 0.6,
        this.tileSize * 0.6,
        0xf4e8d0,
      )
      .setDepth(10)

    const cursors = keyboard.createCursorKeys()
    const wasd = keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>

    const bind = (key: Phaser.Input.Keyboard.Key | undefined, dx: number, dy: number): void => {
      key?.on('down', () => this.tryMove(dx, dy))
    }

    bind(cursors.left, -1, 0)
    bind(wasd.left, -1, 0)
    bind(cursors.right, 1, 0)
    bind(wasd.right, 1, 0)
    bind(cursors.up, 0, -1)
    bind(wasd.up, 0, -1)
    bind(cursors.down, 0, 1)
    bind(wasd.down, 0, 1)
  }

  private tryMove(dx: number, dy: number): void {
    if (this.isMoving) return

    const nextTileX = this.tileX + dx
    const nextTileY = this.tileY + dy
    if (nextTileX < 0 || nextTileX >= this.mapWidth || nextTileY < 0 || nextTileY >= this.mapHeight) {
      return
    }

    this.tileX = nextTileX
    this.tileY = nextTileY
    this.isMoving = true

    this.scene.tweens.add({
      targets: this.sprite,
      x: this.tileToWorldX(nextTileX),
      y: this.tileToWorldY(nextTileY),
      duration: MOVE_DURATION_MS,
      onComplete: () => {
        this.isMoving = false
      },
    })
  }

  private tileToWorldX(tileX: number): number {
    return this.originX + tileX * this.tileSize + this.tileSize / 2
  }

  private tileToWorldY(tileY: number): number {
    return this.originY + tileY * this.tileSize + this.tileSize / 2
  }
}
