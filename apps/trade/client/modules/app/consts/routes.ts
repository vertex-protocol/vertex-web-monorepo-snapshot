export const ROUTE_APP_PORTFOLIO_PREFIX = '/portfolio';

export const PORTFOLIO_SUBROUTES = {
  overview: 'overview',
  balances: 'balances',
  positions: 'positions',
  orders: 'orders',
  marginManager: 'margin-manager',
  history: 'history',
  faucet: 'faucet',
};

export const ROUTES = {
  gems: '/gems',
  markets: '/markets',
  moneyMarkets: '/money-markets',
  perpTrading: '/perpetuals',
  pools: '/pools',
  portfolio: {
    base: ROUTE_APP_PORTFOLIO_PREFIX,
    overview: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.overview}`,
    balances: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.balances}`,
    positions: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.positions}`,
    orders: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.orders}`,
    marginManager: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.marginManager}`,
    history: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.history}`,
    faucet: `${ROUTE_APP_PORTFOLIO_PREFIX}/${PORTFOLIO_SUBROUTES.faucet}`,
  },
  referrals: '/referrals',
  rewards: '/rewards',
  spotTrading: '/spot',
  staking: '/staking',
  vaults: '/vaults',
  vlp: '/vlp',
} as const;
