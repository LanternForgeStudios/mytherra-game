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

export interface BattleParticipant {
  id: string
  displayName: string
  stats: CreatureStats
}

export type BattleStatus = 'pending' | 'active' | 'won' | 'lost' | 'fled'

export interface BattleSession {
  id: string
  participants: BattleParticipant[]
  turnOrder: string[]
  currentTurnIndex: number
  status: BattleStatus
  log: string[]
}
