export const ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS = [
  1, 2, 5, 10, 50, 100, 250,
] as const;

export type OrderbookPriceTickSpacingMultiplier =
  (typeof ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS)[number];

export type OrderbookViewType = 'bids_and_asks' | 'only_bids' | 'only_asks';
