import { BigDecimalish, toBigDecimal } from '@vertex-protocol/client';

/**
 * @param value
 * @param threshold
 * @description Returns true if the value is roughly zero, false otherwise
 * @returns boolean
 */
export function isRoughlyZero(value: BigDecimalish, threshold = 1e-6) {
  return toBigDecimal(value).abs().lt(threshold);
}
