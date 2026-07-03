export interface CreatureStats {
  hp: number
  strength: number
  resolve: number
  insight: number
  agility: number
  presence: number
}

export interface Enemy {
  id: string
  displayName: string
  localNames: string[]
  lanternName: string
  ancientName: string | null
  region: string
  level: number
  resonance: string[]
  stats: CreatureStats
  weaknesses: string[]
  resistances: string[]
  actions: string[]
  lootTable: string[]
  journalEntries: string[]
}

export type BattleStatus = 'active' | 'won' | 'lost'

export interface BattleState {
  enemyId: string
  playerHp: number
  playerMaxHp: number
  enemyHp: number
  enemyMaxHp: number
  log: string[]
  status: BattleStatus
}
