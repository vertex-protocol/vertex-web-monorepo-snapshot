import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';

const DAYS_IN_YEAR = 365;

/**
 * Calculates the annual compounded rate based on a daily average rate.
 * Compounding is applied to derive the yearly effective rate.
 *
 * @param dailyRate The daily average rate as a `BigDecimal`.
 * @returns The annual compounded rate as a `BigDecimal`.
 */
export function calcAnnualizedInterestRate(dailyRate: BigDecimal) {
  // Convert to number for this, with some loss of precision, but using .pow() causes us to hit browser resource limits.
  return toBigDecimal(dailyRate.plus(1).toNumber() ** DAYS_IN_YEAR - 1);
}
