import { BigDecimal } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';

/**
 * @param value
 * @param quotePrice
 * @returns Decimal adjusted USD value
 */
export function calcDecimalAdjustedUsdValue(
  value: BigDecimal,
  quotePrice: BigDecimal,
) {
  const usdValue = value.multipliedBy(quotePrice);
  const decimalAdjustedUsdValue = removeDecimals(usdValue);

  return decimalAdjustedUsdValue.toNumber();
}
