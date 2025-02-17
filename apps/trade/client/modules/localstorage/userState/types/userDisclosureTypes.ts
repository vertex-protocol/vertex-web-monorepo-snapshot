/**
 * Disclosure keys for feature notifications
 */
export const FEATURE_NOTIFICATION_DISCLOSURE_KEYS = [
  'feb_13_delisting',
  'bera_perp_feb_13',
] as const;

export type FeatureNotificationDisclosureKey =
  (typeof FEATURE_NOTIFICATION_DISCLOSURE_KEYS)[number];

/**
 * Disclosure keys for promo banners
 */
export const PROMO_BANNER_DISCLOSURE_KEYS = [
  'abstract_launch',
  'abstract_discover_upvote',
  'sonic_points_page_banner',
];

export type PromoBannerDisclosureKey =
  (typeof PROMO_BANNER_DISCLOSURE_KEYS)[number];

/**
 * Disclosure keys for user info
 */
const USER_INFO_DISCLOSURE_KEYS = [
  'cross_chain_deposit',
  'borrow_risk_warning',
  'repay_convert_info',
  'spot_leverage_on_risk',
  'spot_leverage_off_orders',
  'stop_market_order_on_risk',
  'max_repay_warning',
  'withdraw_lba_liquidity',
  'swap_weth',
  'swap_wmnt',
  'swap_wsei',
  'swap_ws',
  'blast_native_yield_deposit_dialog',
  'edit_order_via_chart_dialog',
  'blitz_vaults_rewards',
  'blitz_market_boosts',
  'skate_vault_withdrawal',
  'stake_vrtx',
  'no_partial_unstaking',
  'perp_margin_mode_iso_info',
  'perp_margin_mode_cross_info',
] as const;

export const USER_DISCLOSURE_KEYS = [
  ...USER_INFO_DISCLOSURE_KEYS,
  ...FEATURE_NOTIFICATION_DISCLOSURE_KEYS,
  ...PROMO_BANNER_DISCLOSURE_KEYS,
] as const;

export type UserDisclosureKey = (typeof USER_DISCLOSURE_KEYS)[number];
