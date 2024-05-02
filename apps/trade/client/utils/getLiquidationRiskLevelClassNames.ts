import { BigDecimal } from '@vertex-protocol/client';
import {
  RiskLevel,
  getLiquidationRiskLevel,
} from 'client/utils/getLiquidationRiskLevel';

/**
 * Classname object for colors based on margin usage
 * @param {RiskLevel} liquidationRiskLevel - bounded liquidation risk level fraction
 */
export function getLiquidationRiskLevelClassNames(
  liquidationRiskLevel: BigDecimal | undefined,
) {
  const riskLevel: RiskLevel | undefined =
    getLiquidationRiskLevel(liquidationRiskLevel);

  return {
    extreme: {
      text: 'text-risk-extreme',
      bg: 'bg-risk-extreme',
      shadow: 'shadow-risk-extreme/50',
    },
    high: {
      text: 'text-negative',
      bg: 'bg-risk-high',
      shadow: 'shadow-risk-high/50',
    },
    medium: {
      text: 'text-warning',
      bg: 'bg-risk-medium',
      shadow: 'shadow-risk-medium/50',
    },
    low: {
      text: 'text-positive',
      bg: 'bg-risk-low',
      shadow: 'shadow-risk-low/50',
    },
  }[riskLevel ?? 'low'];
}
