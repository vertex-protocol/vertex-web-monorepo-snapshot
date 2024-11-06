const ROUTE_PREFIX = '/competitions/sei';

const ROUNDS = { round1: 'round-1', round2: 'round-2', round3: 'round-3' };

const SUBROUTES = { tier1: 'tier-1', tier2: 'tier-2', tier3: 'tier-3' };

const ROUND1_LANDING = `${ROUTE_PREFIX}/${ROUNDS.round1}`;
const ROUND2_LANDING = `${ROUTE_PREFIX}/${ROUNDS.round2}`;
const ROUND3_LANDING = `${ROUTE_PREFIX}/${ROUNDS.round3}`;

export const SEI_TRADING_COMPETITION_ROUTES = {
  round1Landing: ROUND1_LANDING,
  round1tier1: `${ROUND1_LANDING}/${SUBROUTES.tier1}`,
  round1tier2: `${ROUND1_LANDING}/${SUBROUTES.tier2}`,
  round2Landing: ROUND2_LANDING,
  round2tier1: `${ROUND2_LANDING}/${SUBROUTES.tier1}`,
  round2tier2: `${ROUND2_LANDING}/${SUBROUTES.tier2}`,
  round3Landing: ROUND3_LANDING,
  round3tier1: `${ROUND3_LANDING}/${SUBROUTES.tier1}`,
  round3tier2: `${ROUND3_LANDING}/${SUBROUTES.tier2}`,
};
