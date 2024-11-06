import { ProvideLiquidityErrorType } from 'client/modules/pools/types';
import { useMemo } from 'react';

export function useProvideLiquidityAmountErrorTooltipContent({
  formError,
}: {
  formError: ProvideLiquidityErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'max_mint_exceeded':
        return 'This exceeds your max. Please enter a valid amount.';
      default:
        return null;
    }
  }, [formError]);
}
