import { useMemo } from 'react';
import { OrderFormError } from '../types';

export function useOrderFormQuoteAmountErrorTooltipContent({
  formError,
}: {
  formError: OrderFormError | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'max_exceeded':
        return 'This trade exceeds your max position. Cancel open orders or deposit more collateral to increase funds available.';
      default:
        return null;
    }
  }, [formError]);
}
