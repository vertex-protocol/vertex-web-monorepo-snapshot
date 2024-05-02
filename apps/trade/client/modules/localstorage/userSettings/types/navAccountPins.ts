export const NAV_ACCOUNT_PIN_STORAGE_IDS = [
  'accountValue',
  'assets',
  'borrows',
  'perpPnl',
  '24hPnl',
  'fundsAvailable',
  'fundsUntilLiquidation',
  'marginUsage',
  'leverage',
  'liquidationRisk',
  'lpPositions',
] as const;

export type NavAccountPinID = (typeof NAV_ACCOUNT_PIN_STORAGE_IDS)[number];
