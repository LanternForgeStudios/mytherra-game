import type { TilePosition } from './GridMovement'
import type { RegionNpcPlacement } from '../../types/region'

// Manhattan-adjacent (exactly one tile away, not diagonal, not the same
// tile). GridMovement blocks NPC tiles, so "adjacent" is the only way a
// player can ever reach one — this stays a pure function so it's cheap to
// unit test without spinning up a Phaser scene.
export function findAdjacentNpc(
  playerTile: TilePosition,
  placements: RegionNpcPlacement[],
): RegionNpcPlacement | undefined {
  return placements.find((placement) => {
    const distance = Math.abs(placement.tileX - playerTile.x) + Math.abs(placement.tileY - playerTile.y)
    return distance === 1
  })
}
