import { useMemo } from 'react';
import { UnstakeVrtxFormErrorType } from './useUnstakeVrtxForm';

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
