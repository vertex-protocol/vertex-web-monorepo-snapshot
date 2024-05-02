import { useMemo } from 'react';
import { WithdrawLiquidityErrorType } from '../../types';

export function useWithdrawLiquidityAmountErrorTooltipContent({
  formError,
}: {
  formError: WithdrawLiquidityErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'max_burn_exceeded':
        return 'This exceeds the max LP tokens to withdraw. Please enter a valid amount.';
      default:
        return null;
    }
  }, [formError]);
}
