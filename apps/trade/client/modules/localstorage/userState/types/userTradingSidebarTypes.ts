export const TRADING_SIDEBAR_WATCHLIST_TAB_IDS = [
  'watchlist',
  'all_markets',
] as const;
export const TRADING_SIDEBAR_TAB_IDS = [
  'market_info',
  'sentiment',
  'news',
] as const;

export type TradingSidebarWatchlistTabID =
  (typeof TRADING_SIDEBAR_WATCHLIST_TAB_IDS)[number];
export type TradingSidebarTabID = (typeof TRADING_SIDEBAR_TAB_IDS)[number];

export interface TradingSidebarState {
  isOpen: boolean;
  selectedWatchlistTabId: TradingSidebarWatchlistTabID;
  selectedTabId: TradingSidebarTabID;
}
