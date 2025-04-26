import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';

const DAYS_IN_YEAR = 365;

/**
 * Calculates the annualized interest rate from a given daily interest rate.
 *
 * @param {BigDecimal | undefined} dailyRate - The daily interest rate as a BigDecimal.
 * @returns {BigDecimal} The annualized interest rate as a BigDecimal.
 */
export function calcAnnualizedInterestRate(dailyRate: BigDecimal | undefined) {
  if (dailyRate === undefined) {
    return;
  }
  // Convert to number for this, with some loss of precision, but using .pow() causes us to hit browser resource limits.
  return toBigDecimal(dailyRate.plus(1).toNumber() ** DAYS_IN_YEAR - 1);
}
