import { BridgeFormErrorType } from 'client/modules/collateral/bridge/hooks/form/types';
import { useMemo } from 'react';

export function useBridgeAmountErrorTooltipContent({
  formError,
}: {
  formError: BridgeFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'max_exceeded':
        return "You can't bridge more than your wallet balance. Please enter a valid amount.";
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'under_min':
        return 'Please bridge more than the min amount.';
      default:
        return null;
    }
  }, [formError]);
}
