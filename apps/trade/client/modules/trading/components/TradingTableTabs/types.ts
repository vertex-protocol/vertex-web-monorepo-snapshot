export const POSITIONS_FILTER_OPTION_IDS = ['all', 'current_market'] as const;

export const BALANCES_FILTER_OPTION_IDS = [
  'all',
  'nonzero',
  'current_market',
] as const;

export const OPEN_ORDERS_FILTER_OPTION_IDS = [
  'all',
  'spot_only',
  'perp_only',
  'current_market',
] as const;

export const HISTORICAL_TRADES_FILTER_OPTION_IDS = [
  'all',
  'spot_only',
  'perp_only',
  'current_market',
] as const;

export const REALIZED_PNL_EVENTS_FILTER_OPTION_IDS = [
  'all',
  'current_market',
] as const;

export type PositionsFilterOptionID =
  (typeof POSITIONS_FILTER_OPTION_IDS)[number];

export type BalancesFilterOptionID =
  (typeof BALANCES_FILTER_OPTION_IDS)[number];

export type OpenOrdersFilterOptionID =
  (typeof OPEN_ORDERS_FILTER_OPTION_IDS)[number];

export type HistoricalTradesFilterOptionID =
  (typeof HISTORICAL_TRADES_FILTER_OPTION_IDS)[number];

export type RealizedPnlEventsFilterOptionID =
  (typeof REALIZED_PNL_EVENTS_FILTER_OPTION_IDS)[number];
