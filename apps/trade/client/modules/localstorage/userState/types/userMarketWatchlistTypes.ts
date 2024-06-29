export type MarketWatchlistTabID = 'watchlist' | 'all_markets';

export interface MarketWatchlistState {
  isOpen: boolean;
  selectedTabId: MarketWatchlistTabID;
}
