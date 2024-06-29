import { ProductEngineType } from '@vertex-protocol/contracts';

export type BalanceAmountMarketFilter = 'nonzero' | 'positive' | 'negative';

export interface MarketFilter {
  // If not given, all markets will be included
  marketType?: ProductEngineType;
  // If true, returns only favorited markets
  isFavorited?: boolean;
  // If provided, only markets with balances matching the given amount filter will be included
  amount?: BalanceAmountMarketFilter;
  // If provided, only markets matching provided productIds will be included
  productIds?: number[];
}
