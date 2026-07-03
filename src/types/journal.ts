export type JournalCategory = 'creature' | 'place' | 'person' | 'legend' | 'artifact' | 'observation'

export interface JournalEntry {
  id: string
  category: JournalCategory
  title: string
  body: string
  unlocked: boolean
  relatedIds: string[]
}
