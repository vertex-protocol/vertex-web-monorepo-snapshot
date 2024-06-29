import { BigDecimal } from '@vertex-protocol/client';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';
import { removeDecimals } from '@vertex-protocol/utils';

/**
 * @param currentValue
 * @param prevValue
 * @returns Decimal adjusted delta value in USD and delta fraction
 */
export function calcDecimalAdjustedDeltas(
  currentValue: BigDecimal,
  prevValue: BigDecimal,
  quotePrice: BigDecimal,
) {
  const deltaUsd = currentValue.minus(prevValue).multipliedBy(quotePrice);
  const decimalAdjustedDeltaUsd = removeDecimals(deltaUsd).toNumber();
  const deltaFraction = calcChangeFrac(currentValue, prevValue).toNumber();

  return { deltaUsd: decimalAdjustedDeltaUsd, deltaFraction };
}
