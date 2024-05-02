import { useMemo } from 'react';
import { StakeVrtxFormErrorType } from './useStakeVrtxForm';

export function useStakeVrtxAmountErrorTooltipContent({
  formError,
}: {
  formError: StakeVrtxFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'max_exceeded':
        return "You can't stake more than your wallet balance. Please enter a valid amount.";
      default:
        return null;
    }
  }, [formError]);
}
