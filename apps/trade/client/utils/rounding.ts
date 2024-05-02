import {
  BigDecimal,
  BigDecimalish,
  toBigDecimal,
} from '@vertex-protocol/utils';

export function roundToDecimalPlaces<T extends number | BigDecimal>(
  val: T,
  decimalPlaces = 4,
  roundingMode?: BigDecimal.RoundingMode,
): T {
  const rounded = toBigDecimal(val).decimalPlaces(decimalPlaces, roundingMode);
  return (typeof val === 'number' ? rounded.toNumber() : rounded) as T;
}

export function roundToPrecision<T extends number | BigDecimal>(
  val: T,
  significantDigits = 8,
  roundingMode?: BigDecimal.RoundingMode,
): T {
  const rounded = toBigDecimal(val).precision(significantDigits, roundingMode);
  return (typeof val === 'number' ? rounded.toNumber() : rounded) as T;
}

export function roundToIncrement<T extends number | BigDecimal>(
  val: T,
  increment: BigDecimalish,
  roundingMode?: BigDecimal.RoundingMode,
): T {
  const inc = toBigDecimal(increment);
  if (inc.eq(0)) {
    return val;
  }
  const rounded = toBigDecimal(val)
    .div(inc)
    .dp(0, roundingMode)
    .multipliedBy(inc);
  return (typeof val === 'number' ? rounded.toNumber() : rounded) as T;
}

/**
 * @param {BigDecimal.Value} val - The value to round
 * @param {number} decimals - The number of decimal places to round to
 * @param {BigDecimal.RoundingMode} roundingMode - The `BigDecimal` rounding mode to use
 * @returns {string}
 */
export function roundToString<T extends BigDecimal.Value>(
  val: T,
  decimals: number,
  roundingMode: BigDecimal.RoundingMode = BigDecimal.ROUND_DOWN,
): string {
  if (!val) {
    return '';
  }
  return toBigDecimal(val).toFixed(decimals, roundingMode);
}
