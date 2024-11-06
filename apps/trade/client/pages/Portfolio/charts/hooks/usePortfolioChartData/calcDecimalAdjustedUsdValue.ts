import { BigDecimal } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';

/**
 * @param value
 * @param primaryQuotePriceUsd
 * @returns Decimal adjusted USD value
 */
export function calcDecimalAdjustedUsdValue(
  value: BigDecimal,
  primaryQuotePriceUsd: BigDecimal,
) {
  const usdValue = value.multipliedBy(primaryQuotePriceUsd);
  const decimalAdjustedUsdValue = removeDecimals(usdValue);

  return decimalAdjustedUsdValue.toNumber();
}
