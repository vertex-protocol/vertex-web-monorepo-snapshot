// Used for "hardcoded" feature notifications
export const NEW_FEATURE_DISCLOSURE_KEYS = [] as const;

export type NewFeatureDisclosureKey =
  (typeof NEW_FEATURE_DISCLOSURE_KEYS)[number];

const USER_INFO_DISCLOSURE_KEYS = [
  'cross_chain_deposit',
  'borrow_risk_warning',
  'repay_convert_info',
  'spot_leverage_on_risk',
  'spot_leverage_off_orders',
  'stop_market_order_on_risk',
  'max_repay_warning',
  'withdraw_lba_liquidity',
  'stake_vrtx',
  'swap_weth',
  'usdb_rebase_yield',
  'how_to_stake',
  'blitz_points_banner',
  'blitz_points_claim_complete',
] as const;

export const USER_DISCLOSURE_KEYS = [
  ...USER_INFO_DISCLOSURE_KEYS,
  ...NEW_FEATURE_DISCLOSURE_KEYS,
] as const;

export type UserDisclosureKey = (typeof USER_DISCLOSURE_KEYS)[number];
