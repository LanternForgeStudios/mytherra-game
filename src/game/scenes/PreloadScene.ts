import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  create(): void {
    // No real assets yet — this is the skeleton phase. The Asset Engine
    // (manifest-driven preloading) plugs into this scene's preload() once
    // there's something to load.
    this.scene.start('town')
  }
}
