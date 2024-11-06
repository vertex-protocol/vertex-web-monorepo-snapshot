import { UnstakeVrtxFormErrorType } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/useUnstakeVrtxForm';
import { useMemo } from 'react';

export function useUnstakeVrtxAmountErrorTooltipContent({
  formError,
}: {
  formError: UnstakeVrtxFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'max_exceeded':
        return "You can't unstake more than your staked amount. Please enter a valid amount.";
      default:
        return null;
    }
  }, [formError]);
}
