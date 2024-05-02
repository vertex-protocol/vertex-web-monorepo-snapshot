import { LatestMarketPrice } from 'client/hooks/query/markets/types';

interface Params {
  isSell: boolean;
  marketSlippageFraction: number;
  latestMarketPrices: LatestMarketPrice | undefined;
}

/**
 * Get the execution price for a market order with the configured slippage
 */
export function getMarketOrderExecutionPrice({
  isSell,
  marketSlippageFraction,
  latestMarketPrices,
}: Params) {
  // Apply the slippage on the top-of-book price to ensure spread is included in price with slippage
  return isSell
    ? latestMarketPrices?.safeAsk?.times(1 - marketSlippageFraction)
    : latestMarketPrices?.safeBid?.times(1 + marketSlippageFraction);
}
