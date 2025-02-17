const ROUND_1_ROUTE_PREFIX = '/competitions/vertex-1';

const SUBROUTES = { tier1: 'tier-1', tier2: 'tier-2' };

export const VERTEX_TRADING_COMP_ROUND_1_ROUTES = {
  base: ROUND_1_ROUTE_PREFIX,
  tier1: `${ROUND_1_ROUTE_PREFIX}/${SUBROUTES.tier1}`,
  tier2: `${ROUND_1_ROUTE_PREFIX}/${SUBROUTES.tier2}`,
};
