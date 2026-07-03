import { describe, it, expect } from 'vitest'
import { createBattleState, applyAttack, applyObserve } from './BattleLogic'
import type { Enemy } from '../../types/combat'

const testEnemy: Enemy = {
  id: 'test_enemy',
  displayName: 'Test Sprite',
  localNames: [],
  lanternName: 'Test Sprite',
  ancientName: null,
  region: 'test_region',
  level: 1,
  resonance: [],
  stats: { hp: 10, strength: 5, resolve: 1, insight: 1, agility: 1, presence: 1 },
  weaknesses: ['Dawn'],
  resistances: [],
  actions: [],
  lootTable: [],
  journalEntries: [],
}

const MIN_ROLL = (): number => 0

describe('createBattleState', () => {
  it('starts active with full HP on both sides', () => {
    const state = createBattleState(testEnemy)
    expect(state.status).toBe('active')
    expect(state.enemyHp).toBe(testEnemy.stats.hp)
    expect(state.playerHp).toBe(state.playerMaxHp)
    expect(state.log[0]).toContain('Test Sprite')
  })
})

describe('applyAttack', () => {
  it('damages the enemy and then lets it retaliate', () => {
    const before = createBattleState(testEnemy)
    const after = applyAttack(before, testEnemy, MIN_ROLL)
    expect(after.enemyHp).toBeLessThan(before.enemyHp)
    expect(after.playerHp).toBeLessThan(before.playerHp)
    expect(after.status).toBe('active')
    expect(after.log.length).toBe(before.log.length + 2)
  })

  it('wins once enemy HP reaches zero, and stops mutating after', () => {
    let state = createBattleState(testEnemy)
    // MAX_ROLL pushes damage to the top of its range each hit.
    const MAX_ROLL = (): number => 0.999
    for (let i = 0; i < 10 && state.status === 'active'; i++) {
      state = applyAttack(state, testEnemy, MAX_ROLL)
    }
    expect(state.status).toBe('won')
    expect(state.enemyHp).toBe(0)
    expect(state.log.at(-1)).toContain('defeated')

    const afterWin = applyAttack(state, testEnemy, MAX_ROLL)
    expect(afterWin).toBe(state)
  })

  it('loses if the player HP reaches zero first', () => {
    // A much stronger enemy than the player's fixed baseline guarantees a loss.
    const strongEnemy: Enemy = { ...testEnemy, stats: { ...testEnemy.stats, hp: 1000, strength: 50 } }
    let state = createBattleState(strongEnemy)
    const MAX_ROLL = (): number => 0.999
    for (let i = 0; i < 10 && state.status === 'active'; i++) {
      state = applyAttack(state, strongEnemy, MAX_ROLL)
    }
    expect(state.status).toBe('lost')
    expect(state.playerHp).toBe(0)
  })
})

describe('applyObserve', () => {
  it('reveals a weakness without damaging the enemy, but still costs a turn', () => {
    const before = createBattleState(testEnemy)
    const after = applyObserve(before, testEnemy, MIN_ROLL)
    expect(after.enemyHp).toBe(before.enemyHp)
    expect(after.playerHp).toBeLessThan(before.playerHp)
    expect(after.log.at(-2)).toContain('Dawn')
  })
})
