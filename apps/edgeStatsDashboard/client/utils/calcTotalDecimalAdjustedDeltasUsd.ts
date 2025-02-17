import { BigDecimal } from '@vertex-protocol/client';
import { calcAllProductsTotalValue } from 'client/utils/calcAllProductsTotalValue';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { MappedNullable } from 'client/utils/types';

/**
 * @param currentCumulativeValueByProductId
 * @param earlierCumulativeValueByProductId
 * @param primaryQuotePriceUsd
 * @returns Decimal adjusted delta value in USD
 */
export function calcTotalDecimalAdjustedDeltasUsd<
  TCurrentValue extends Record<number, BigDecimal> | undefined,
  TEarlierValue extends Record<number, BigDecimal> | undefined,
>(
  currentCumulativeValueByProductId: TCurrentValue,
  earlierCumulativeValueByProductId: TEarlierValue,
  primaryQuotePriceUsd: BigDecimal,
) {
  const currentValue = calcAllProductsTotalValue(
    currentCumulativeValueByProductId,
  );
  const earlierValue = calcAllProductsTotalValue(
    earlierCumulativeValueByProductId,
  );
  const delta = (
    earlierValue ? currentValue?.minus(earlierValue) : undefined
  ) as MappedNullable<TCurrentValue & TEarlierValue, BigDecimal>;

  const deltaUsd = calcDecimalAdjustedUsdValue(delta, primaryQuotePriceUsd);

  return deltaUsd;
}
