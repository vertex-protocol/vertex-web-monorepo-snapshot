import { BigDecimal, removeDecimals } from '@vertex-protocol/client';

/**
 * Calculate decimal adjusted USD Value
 * @param currentValue
 * @param primaryQuotePriceUsd
 * @returns
 */
export function calcDecimalAdjustedUsdValue<
  TValue extends BigDecimal | undefined,
>(currentValue: TValue, primaryQuotePriceUsd: BigDecimal): TValue {
  return removeDecimals(currentValue?.times(primaryQuotePriceUsd)) as TValue;
}
