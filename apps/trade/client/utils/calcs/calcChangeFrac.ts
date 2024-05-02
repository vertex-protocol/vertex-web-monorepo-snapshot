import { BigDecimal } from '@vertex-protocol/utils';
import { BigDecimals } from 'client/utils/BigDecimals';

/**
 * Calculate change frac as defined by (new - old) / old, but defaults to using the new value if the old value is 0
 * If both values are zero, then zero is returned
 *
 * @param newValue
 * @param oldValue
 */
export function calcChangeFrac(newValue: BigDecimal, oldValue: BigDecimal) {
  const diff = newValue.minus(oldValue);
  if (!oldValue.isZero()) {
    return diff.dividedBy(oldValue);
  }
  if (!newValue.isZero()) {
    return diff.dividedBy(newValue);
  }
  return BigDecimals.ZERO;
}
