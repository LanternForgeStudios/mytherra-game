import Phaser from 'phaser'

const PANEL_HEIGHT = 90
const PANEL_MARGIN = 16
const TEXT_PADDING = 16
const DEPTH = 20

// Single-line placeholder dialogue box. No portraits/typewriter effect yet —
// just enough UI to prove "press a key near an NPC, see their line" works.
export class DialogueBox {
  private readonly background: Phaser.GameObjects.Rectangle
  private readonly speakerText: Phaser.GameObjects.Text
  private readonly lineText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    const { width, height } = scene.scale
    const panelY = height - PANEL_HEIGHT - PANEL_MARGIN

    this.background = scene.add
      .rectangle(width / 2, panelY + PANEL_HEIGHT / 2, width - PANEL_MARGIN * 2, PANEL_HEIGHT, 0x1a1f1a, 0.92)
      .setStrokeStyle(1, 0x3a453a)
      .setDepth(DEPTH)
      .setVisible(false)

    this.speakerText = scene.add
      .text(PANEL_MARGIN + TEXT_PADDING, panelY + 12, '', {
        fontSize: '14px',
        color: '#f4e8d0',
        fontStyle: 'bold',
      })
      .setDepth(DEPTH + 1)
      .setVisible(false)

    this.lineText = scene.add
      .text(PANEL_MARGIN + TEXT_PADDING, panelY + 34, '', {
        fontSize: '13px',
        color: '#9fb89f',
        wordWrap: { width: width - PANEL_MARGIN * 2 - TEXT_PADDING * 2 },
      })
      .setDepth(DEPTH + 1)
      .setVisible(false)
  }

  get isVisible(): boolean {
    return this.background.visible
  }

  show(speaker: string, line: string): void {
    this.speakerText.setText(speaker)
    this.lineText.setText(line)
    this.background.setVisible(true)
    this.speakerText.setVisible(true)
    this.lineText.setVisible(true)
  }

  hide(): void {
    this.background.setVisible(false)
    this.speakerText.setVisible(false)
    this.lineText.setVisible(false)
  }
}
