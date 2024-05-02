import { useMemo } from 'react';
import { UseOrderFormSlippageErrorType } from './useOrderSlippageFormForType';

export function useOrderSlippageValueErrorTooltipContent({
  formError,
}: {
  formError: UseOrderFormSlippageErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      default:
        return null;
    }
  }, [formError]);
}
