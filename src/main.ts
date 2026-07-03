import Phaser from 'phaser'
import { BootScene } from './game/scenes/BootScene'
import { PreloadScene } from './game/scenes/PreloadScene'
import { TownScene } from './game/scenes/TownScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  backgroundColor: '#1a1f1a',
  scene: [BootScene, PreloadScene, TownScene],
}

new Phaser.Game(config)
