const ROUTE_PREFIX = '/competitions/blitz';

const SUBROUTES = { tier1: 'tier-1', tier2: 'tier-2' };

export const BLITZ_TRADING_COMPETITION_ROUTES = {
  base: ROUTE_PREFIX,
  tier1: `${ROUTE_PREFIX}/${SUBROUTES.tier1}`,
  tier2: `${ROUTE_PREFIX}/${SUBROUTES.tier2}`,
};
