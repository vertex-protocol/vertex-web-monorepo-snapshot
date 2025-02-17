import { BigDecimal } from '@vertex-protocol/client';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';

/**
 * @param valueByProductId
 * @param earlierValueByProductId
 * @param primaryQuotePriceUsd
 * @returns Decimal adjusted delta value in USD for each product separately
 */
export function getDecimalAdjustedDeltasUsdByProductId(
  valueByProductId: Record<number, BigDecimal> | undefined,
  earlierValueByProductId: Record<number, BigDecimal> | undefined,
  primaryQuotePriceUsd: BigDecimal,
) {
  const deltasByProductId: Record<number, BigDecimal | undefined> = {};

  Object.entries(valueByProductId ?? {}).map(([productId, currentValue]) => {
    const productIdAsNum = Number(productId);

    const prevValue = earlierValueByProductId?.[productIdAsNum];

    if (!prevValue) {
      return;
    }

    const delta = currentValue.minus(prevValue);
    const deltaUsd = calcDecimalAdjustedUsdValue(delta, primaryQuotePriceUsd);

    deltasByProductId[productIdAsNum] = deltaUsd;
  });

  return deltasByProductId;
}
