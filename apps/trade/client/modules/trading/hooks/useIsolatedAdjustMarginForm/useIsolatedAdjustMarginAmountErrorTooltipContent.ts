import { SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE } from 'client/modules/subaccounts/consts';
import { IsolatedAdjustMarginFormErrorType } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/types';
import { useMemo } from 'react';

export function useIsolatedAdjustMarginAmountErrorTooltipContent({
  formError,
}: {
  formError: IsolatedAdjustMarginFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'add_max_exceeded':
        return "You can't add more than your available balance. Please enter a valid amount.";
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'remove_max_exceeded':
        return 'This amount exceeds your withdrawable margin. Please enter a valid amount.';
      case 'below_min':
        return `The entered amount is less than the minimum transfer amount. Please enter an amount greater than ${SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE}.`;
      default:
        return null;
    }
  }, [formError]);
}
