import { DepositErrorType } from 'client/modules/collateral/deposit/types';
import { useMemo } from 'react';

export function useDepositAmountErrorTooltipContent({
  formError,
}: {
  formError: DepositErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'below_min':
        return 'Please deposit more than the min amount.';
      default:
        return null;
    }
  }, [formError]);
}
