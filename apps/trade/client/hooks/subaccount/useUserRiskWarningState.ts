import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { getLiquidationRiskLevel } from 'client/utils/getLiquidationRiskLevel';

export type UserRiskWarningState =
  | 'extreme_liquidation_risk'
  | 'no_funds_available';

export function useUserRiskWarningState(): UserRiskWarningState | undefined {
  const { data: overview } = useSubaccountOverview();
  const userStateError = useUserStateError();

  const riskLevel = getLiquidationRiskLevel(
    overview?.liquidationRiskFractionBounded,
  );

  // No subaccount case
  if (
    userStateError === 'not_connected' ||
    userStateError === 'requires_initial_deposit'
  ) {
    return undefined;
  }

  if (riskLevel === 'extreme') {
    return 'extreme_liquidation_risk';
  }

  if (overview?.fundsAvailableBounded.lt(0.01)) {
    return 'no_funds_available';
  }

  return undefined;
}
