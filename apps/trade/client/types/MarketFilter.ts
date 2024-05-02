import { ProductEngineType } from '@vertex-protocol/contracts';

export type BalanceAmountMarketFilter = 'nonzero' | 'positive' | 'negative';

export interface MarketFilter {
  // If not given, all markets will be included
  marketType?: ProductEngineType;
  amount?: BalanceAmountMarketFilter;
  productIds?: number[];
}
