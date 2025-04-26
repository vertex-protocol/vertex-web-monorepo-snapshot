/**
 * Disclosure keys for feature notifications
 */
export const FEATURE_NOTIFICATION_DISCLOSURE_KEYS = ['ws_feb_21'] as const;

export type FeatureNotificationDisclosureKey =
  (typeof FEATURE_NOTIFICATION_DISCLOSURE_KEYS)[number];

/**
 * Disclosure keys for banners
 */
export const BANNER_DISCLOSURE_KEYS = [
  'isolated_launch',
  'sonic_incentives_app_banner',
  'sonic_incentives_rewards_page_banner',
  'sonic_points_page_banner',
  'money_market_details_promo_banner',
  'avax_launch_app_banner',
];

export type BannerDisclosureKey = (typeof BANNER_DISCLOSURE_KEYS)[number];

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
  'swap_wavax',
  'blast_native_yield_deposit_dialog',
  'edit_order_via_chart_dialog',
  'blitz_vaults_rewards',
  'blitz_market_boosts',
  'skate_vault_withdrawal',
  'stake_vrtx',
  'no_partial_unstaking',
  'perp_margin_mode_iso_info',
  'perp_margin_mode_cross_info',
  'trading_market_order_rewards',
] as const;

export const USER_DISCLOSURE_KEYS = [
  ...USER_INFO_DISCLOSURE_KEYS,
  ...FEATURE_NOTIFICATION_DISCLOSURE_KEYS,
  ...BANNER_DISCLOSURE_KEYS,
] as const;

export type UserDisclosureKey = (typeof USER_DISCLOSURE_KEYS)[number];
