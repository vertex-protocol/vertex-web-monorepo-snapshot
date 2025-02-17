export const ROUTE_APP_PORTFOLIO_PREFIX = '/portfolio';

export const PORTFOLIO_SUBROUTES = {
  overview: 'overview',
  balances: 'balances',
  positions: 'positions',
  pools: 'pools',
  orders: 'orders',
  marginManager: 'margin-manager',
  history: 'history',
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
    pools: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.pools}`,
    faucet: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.faucet}`,
  },
  spotTrading: '/spot',
  perpTrading: '/perpetuals',
  pools: '/pools',
  markets: '/markets',
  moneyMarkets: '/money-markets',
  rewards: '/rewards',
  referrals: '/referrals',
  staking: '/staking',
  gems: '/gems',
  vaults: '/vaults',
} as const;
