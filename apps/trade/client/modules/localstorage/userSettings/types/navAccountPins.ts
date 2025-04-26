export const NAV_ACCOUNT_PIN_STORAGE_IDS = [
  'accountValue',
  '24hChange',
  'fundsAvailable',
  'unrealizedPnl',
  'leverage',
  'liquidationRisk',
  'isoMargin',
] as const;

export type NavAccountPinID = (typeof NAV_ACCOUNT_PIN_STORAGE_IDS)[number];
