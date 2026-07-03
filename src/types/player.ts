export interface PlayerStats {
  hp: number
  strength: number
  resolve: number
  insight: number
  agility: number
  presence: number
}

export interface Player {
  id: string
  displayName: string
  level: number
  stats: PlayerStats
  resonance: string[]
  currentMapId: string
  position: { x: number; y: number }
}
