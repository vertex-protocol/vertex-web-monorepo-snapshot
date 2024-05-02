import { BigDecimal } from '@vertex-protocol/utils';

export interface LatestMarketPrice {
  bid: BigDecimal;
  ask: BigDecimal;
  average: BigDecimal;
  safeBid: BigDecimal | undefined;
  safeAsk: BigDecimal | undefined;
  safeAverage: BigDecimal | undefined;
}

// Product ID -> LatestMarketPrice
export type AllLatestMarketPricesData = Record<number, LatestMarketPrice>;
