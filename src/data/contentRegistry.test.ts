import { describe, it, expect } from 'vitest'
import { loadContent, hasContent } from './contentRegistry'
import type { Enemy } from '../types/combat'
import type { Region } from '../types/region'

describe('contentRegistry', () => {
  it('loads seeded content by id', () => {
    const enemy = loadContent<Enemy>('echo_raven_001')
    expect(enemy.displayName).toBe('Frightened Raven Echo')
    expect(enemy.region).toBe('iron_mountains')
  })

  it('loads the Ash Hollow region', () => {
    const region = loadContent<Region>('ash_hollow')
    expect(region.displayName).toBe('Ash Hollow')
  })

  it('reports whether an id exists', () => {
    expect(hasContent('echo_raven_001')).toBe(true)
    expect(hasContent('not_a_real_id')).toBe(false)
  })

  it('throws a clear error for an unknown id', () => {
    expect(() => loadContent('not_a_real_id')).toThrowError('Content not found: not_a_real_id')
  })
})
