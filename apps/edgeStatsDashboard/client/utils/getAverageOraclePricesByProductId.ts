import { BigDecimal } from '@vertex-protocol/client';
import { mapValues } from 'lodash';

/**
 * Calculates the average oracle prices by product ID.
 *
 * @param currentOraclePrices - A record mapping product IDs to their current snapshot oracle prices.
 * @param earlierOraclePrices - A record mapping product IDs to their earlier snapshot oracle prices.
 * @returns A record mapping product IDs to their average oracle prices.
 */
export function getAverageOraclePricesByProductId(
  currentOraclePrices: Record<number, BigDecimal> | undefined,
  earlierOraclePrices: Record<number, BigDecimal> | undefined,
) {
  return mapValues(currentOraclePrices, (currentOraclePrice, productId) => {
    const productIdAsNum = Number(productId);
    const earlierOraclePrice = earlierOraclePrices?.[productIdAsNum];

    // If no earlier oracle price exists for this product ID, return the current oracle price.
    if (!earlierOraclePrice) {
      return currentOraclePrice;
    }

    // Compute the average of the current and earlier oracle prices.
    return currentOraclePrice.plus(earlierOraclePrice).div(2);
  });
}
