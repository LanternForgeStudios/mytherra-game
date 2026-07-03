import './style.css'
import Phaser from 'phaser'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { mountAuthScreen, mountAuthBar, clearAuthBar } from './auth/AuthScreen'
import { BootScene } from './game/scenes/BootScene'
import { PreloadScene } from './game/scenes/PreloadScene'
import { TownScene } from './game/scenes/TownScene'
import { BattleScene } from './game/scenes/BattleScene'

function requireElement(id: string): HTMLElement {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Missing #${id} element`)
  return el
}

const authContainer = requireElement('auth')
const authBarContainer = requireElement('auth-bar')
const gameContainer = requireElement('app')

let game: Phaser.Game | null = null

function startGame(): void {
  if (game) return
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 800,
    height: 600,
    backgroundColor: '#1a1f1a',
    scene: [BootScene, PreloadScene, TownScene, BattleScene],
  }
  game = new Phaser.Game(config)
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    authContainer.style.display = 'none'
    gameContainer.style.display = 'block'
    mountAuthBar(authBarContainer, user)
    startGame()
  } else {
    gameContainer.style.display = 'none'
    authContainer.style.display = 'flex'
    clearAuthBar(authBarContainer)
    mountAuthScreen(authContainer)
  }
})
