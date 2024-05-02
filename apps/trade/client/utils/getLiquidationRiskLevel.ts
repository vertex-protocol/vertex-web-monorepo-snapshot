import { BigDecimal } from '@vertex-protocol/client';

export type RiskLevel = 'high' | 'extreme' | 'medium' | 'low';

/**
 * extreme - greater than 90%
 * high - 70-90%
 * medium - 40-70%
 * low - less than or equal to 40%
 * @param {BigDecimal} liquidationRiskFraction - bounded liquidation risk level fraction
 * @returns {RiskLevel}
 */
export function getLiquidationRiskLevel(
  liquidationRiskFraction: BigDecimal | undefined,
) {
  if (!liquidationRiskFraction) {
    return;
  }
  switch (true) {
    case liquidationRiskFraction?.gte(0.9):
      return 'extreme';
    case liquidationRiskFraction?.gte(0.7):
      return 'high';
    case liquidationRiskFraction?.gte(0.4):
      return 'medium';
    default:
      return 'low';
  }
}
