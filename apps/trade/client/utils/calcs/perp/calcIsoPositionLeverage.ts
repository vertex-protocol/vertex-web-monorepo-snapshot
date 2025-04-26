import { BigDecimal } from '@vertex-protocol/client';

/**
 * Calculate leverage for an isolated position, which is (notional value of the position) / net margin
 * Where net margin = margin in position + unsettled USDC
 *
 * @param netMargin
 * @param notionalValue
 */
export function calcIsoPositionLeverage(
  netMargin: BigDecimal,
  notionalValue: BigDecimal,
) {
  return notionalValue.dividedBy(netMargin);
}
