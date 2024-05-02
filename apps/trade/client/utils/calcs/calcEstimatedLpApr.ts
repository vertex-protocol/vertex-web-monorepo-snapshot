import { Product } from '@vertex-protocol/contracts';
import {
  BigDecimal,
  TimeInSeconds,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { BigDecimals } from 'client/utils/BigDecimals';

/**
 * Calculates a value "index" to track APR. Defined as:
 * sqrt(totalBase * totalQuote) / totalLp = sqrt(k) / totalLp
 */
function calcLpTokenValueIndex(
  totalLp: BigDecimal,
  totalBase: BigDecimal,
  totalQuote: BigDecimal,
) {
  if (totalLp.isZero()) {
    return BigDecimals.ZERO;
  }
  return totalBase.multipliedBy(totalQuote).sqrt().dividedBy(totalLp);
}

/**
 *
 * @param firstSnapshot
 * @param lastSnapshot
 * @param timeDeltaSeconds
 * @returns Estimated APR
 */
export function calcEstimatedLpApr(
  firstSnapshot: Product,
  lastSnapshot: Product,
  timeDeltaSeconds: number,
) {
  const lastTokenValue = calcLpTokenValueIndex(
    lastSnapshot.totalLpSupply,
    lastSnapshot.totalLpBaseAmount,
    lastSnapshot.totalLpQuoteAmount,
  );
  const firstTokenValue = calcLpTokenValueIndex(
    firstSnapshot.totalLpSupply,
    firstSnapshot.totalLpBaseAmount,
    firstSnapshot.totalLpQuoteAmount,
  );

  if (lastTokenValue.isZero() || firstTokenValue.isZero()) {
    return BigDecimals.ZERO;
  }

  // Ex. 1.1 = 10% gain
  const valueGainFrac = lastTokenValue.div(firstTokenValue);
  const numCompoundingPeriods = TimeInSeconds.YEAR / timeDeltaSeconds;

  // Use JS numbers here as BigDecimal pow() can be super slow dependeing on valueGainFrac
  const compoundedValueGainFrac = toBigDecimal(
    valueGainFrac.toNumber() ** numCompoundingPeriods - 1,
  );

  // With huge increases in value, compounding doesn't work well, revert to no compounding
  if (compoundedValueGainFrac.gt(1000)) {
    return valueGainFrac.minus(1).multipliedBy(numCompoundingPeriods);
  }

  return compoundedValueGainFrac;
}
