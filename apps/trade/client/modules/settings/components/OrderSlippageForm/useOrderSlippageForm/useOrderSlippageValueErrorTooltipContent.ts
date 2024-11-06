import { UseOrderFormSlippageErrorType } from 'client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageFormForType';
import { useMemo } from 'react';

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
