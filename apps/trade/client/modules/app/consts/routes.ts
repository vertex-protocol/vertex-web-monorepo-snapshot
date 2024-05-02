export const ROUTE_APP_PORTFOLIO_PREFIX = '/portfolio';

export const PORTFOLIO_SUBROUTES = {
  overview: 'overview',
  balances: 'balances',
  positions: 'positions',
  pools: 'pools',
  newLp: 'new-lp-positions',
  orders: 'orders',
  marginManager: 'margin-manager',
  history: 'history',
  faq: 'faq',
  faucet: 'faucet',
};

export const ROUTES = {
  portfolio: {
    base: ROUTE_APP_PORTFOLIO_PREFIX,
    overview: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.overview}`,
    balances: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.balances}`,
    positions: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.positions}`,
    orders: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.orders}`,
    marginManager: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.marginManager}`,
    history: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.history}`,
    faq: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.faq}`,
    pools: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.pools}`,
    newPools: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.newLp}`,
    faucet: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.faucet}`,
  },
  spotTrading: '/spot',
  perpTrading: '/perpetuals',
  pools: '/pools',
  markets: '/markets',
  rewards: '/rewards',
  referrals: '/referrals',
  points: '/points',
  vrtx: '/vrtx',
};
