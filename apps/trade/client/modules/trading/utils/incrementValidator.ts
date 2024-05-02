import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';

// Validator that asserts the value is in increments of the given increment, uses BigDecimal to avoid fp errors
export function incrementValidator(
  val: BigDecimal.Value,
  increment: BigDecimal.Value,
): boolean {
  return toBigDecimal(val).mod(toBigDecimal(increment)).eq(0);
}
