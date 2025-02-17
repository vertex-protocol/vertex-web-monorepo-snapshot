import { LatestMarketPrice } from 'client/hooks/query/markets/useAllMarketsLatestPrices';

/**
 * Retrieves the estimated exit price for a position:
 * - If the position is long, we are selling to bids, so use the bid price
 * - If the position is short, we are selling to asks, so use the ask price
 *
 * @param isLong whether the current position is long
 * @param marketPrices current market prices
 */
export function getEstimatedExitPrice(
  isLong: boolean,
  marketPrices: LatestMarketPrice | undefined,
) {
  return isLong ? marketPrices?.safeBid : marketPrices?.safeAsk;
}
