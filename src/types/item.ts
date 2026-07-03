export type ItemCategory = 'consumable' | 'equipment' | 'quest' | 'currency' | 'material'

export interface Item {
  id: string
  displayName: string
  category: ItemCategory
  description: string
  stackable: boolean
  iconId: string
}
