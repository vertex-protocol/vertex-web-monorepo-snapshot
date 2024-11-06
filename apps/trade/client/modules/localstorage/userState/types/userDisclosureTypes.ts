// Used for "hardcoded" feature notifications
export const NEW_FEATURE_DISCLOSURE_KEYS = ['new_markets_oct_31'] as const;

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
  'swap_wmnt',
  'swap_wsei',
  'blast_native_yield_deposit_dialog',
  'how_to_stake',
  'blitz_points_banner_phase_2',
  'arbitrum_rewards_banner',
  'sei_season_3_rewards_banner',
  'edit_order_via_chart_dialog',
  'blitz_vaults_rewards',
  'blitz_market_boosts',
  'skate_vault_withdrawal',
  'no_partial_unstaking',
  'base_trade_degen_rewards',
] as const;

export const USER_DISCLOSURE_KEYS = [
  ...USER_INFO_DISCLOSURE_KEYS,
  ...NEW_FEATURE_DISCLOSURE_KEYS,
] as const;

export type UserDisclosureKey = (typeof USER_DISCLOSURE_KEYS)[number];
