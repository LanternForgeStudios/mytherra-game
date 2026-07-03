export interface QuestObjective {
  id: string
  type: string
  targetId: string
  complete?: boolean
}

export interface QuestRewards {
  xp: number
  gold: number
  items: string[]
  journalUnlocks: string[]
}

export interface Quest {
  id: string
  title: string
  region: string
  giverNpcId: string
  objectives: QuestObjective[]
  rewards: QuestRewards
}
