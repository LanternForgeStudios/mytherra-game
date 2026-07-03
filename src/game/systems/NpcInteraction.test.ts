import { describe, it, expect } from 'vitest'
import { findAdjacentNpc } from './NpcInteraction'

describe('findAdjacentNpc', () => {
  const placements = [{ npcId: 'npc_elias_rowan', tileX: 5, tileY: 5 }]

  it('finds an NPC exactly one tile away, orthogonally', () => {
    expect(findAdjacentNpc({ x: 5, y: 4 }, placements)?.npcId).toBe('npc_elias_rowan')
    expect(findAdjacentNpc({ x: 6, y: 5 }, placements)?.npcId).toBe('npc_elias_rowan')
  })

  it('does not find an NPC two tiles away', () => {
    expect(findAdjacentNpc({ x: 5, y: 3 }, placements)).toBeUndefined()
  })

  it('does not find an NPC on the same tile', () => {
    expect(findAdjacentNpc({ x: 5, y: 5 }, placements)).toBeUndefined()
  })

  it('does not find an NPC diagonally adjacent', () => {
    expect(findAdjacentNpc({ x: 6, y: 6 }, placements)).toBeUndefined()
  })
})
