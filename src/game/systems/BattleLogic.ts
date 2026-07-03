import type { BattleState, Enemy } from '../../types/combat'

const PLAYER_MAX_HP = 30
const PLAYER_BASE_DAMAGE = 5
const PLAYER_DAMAGE_VARIANCE = 3
const ENEMY_DAMAGE_VARIANCE = 2

// No Firestore-backed player profile yet, so battle starts from a fixed
// local baseline rather than real player stats — matches the Playbook's
// "local test player data" idea, just inlined here instead of a separate
// profile system (nothing else needs player stats yet).
export function createBattleState(enemy: Enemy): BattleState {
  return {
    enemyId: enemy.id,
    playerHp: PLAYER_MAX_HP,
    playerMaxHp: PLAYER_MAX_HP,
    enemyHp: enemy.stats.hp,
    enemyMaxHp: enemy.stats.hp,
    log: [`A ${enemy.displayName} appears!`],
    status: 'active',
  }
}

// Injectable RNG so the win/loss branches are actually testable instead of
// flaky — pass () => 0 / () => 0.999 in tests to hit exact damage values.
export type RandomSource = () => number

function enemyTurn(state: BattleState, enemy: Enemy, log: string[], random: RandomSource): BattleState {
  const enemyDamage = enemy.stats.strength + Math.floor(random() * ENEMY_DAMAGE_VARIANCE)
  const nextPlayerHp = Math.max(0, state.playerHp - enemyDamage)
  const logAfterEnemyTurn = [...log, `The ${enemy.displayName} strikes back for ${enemyDamage} damage.`]

  if (nextPlayerHp <= 0) {
    return {
      ...state,
      playerHp: 0,
      status: 'lost',
      log: [...logAfterEnemyTurn, 'You were defeated...'],
    }
  }

  return { ...state, playerHp: nextPlayerHp, log: logAfterEnemyTurn }
}

export function applyAttack(state: BattleState, enemy: Enemy, random: RandomSource = Math.random): BattleState {
  if (state.status !== 'active') return state

  const playerDamage = PLAYER_BASE_DAMAGE + Math.floor(random() * PLAYER_DAMAGE_VARIANCE)
  const nextEnemyHp = Math.max(0, state.enemyHp - playerDamage)
  const log = [...state.log, `You attack the ${enemy.displayName} for ${playerDamage} damage.`]

  if (nextEnemyHp <= 0) {
    return {
      ...state,
      enemyHp: 0,
      status: 'won',
      log: [...log, `You defeated the ${enemy.displayName}!`],
    }
  }

  return enemyTurn({ ...state, enemyHp: nextEnemyHp }, enemy, log, random)
}

export function applyObserve(state: BattleState, enemy: Enemy, random: RandomSource = Math.random): BattleState {
  if (state.status !== 'active') return state

  const [weakness] = enemy.weaknesses
  const observeLine = weakness
    ? `You observe the ${enemy.displayName}. It looks weak to ${weakness}.`
    : `You observe the ${enemy.displayName}, but learn nothing new.`

  return enemyTurn(state, enemy, [...state.log, observeLine], random)
}
