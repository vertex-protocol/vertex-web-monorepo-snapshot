import { SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE } from 'client/modules/subaccounts/consts';
import { SubaccountQuoteTransferErrorType } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';

interface Params {
  formError: SubaccountQuoteTransferErrorType | undefined;
}

export function useSubaccountQuoteTransferAmountErrorTooltipContent({
  formError,
}: Params) {
  switch (formError) {
    case 'invalid_input':
      return 'Please enter a valid amount.';
    case 'max_exceeded':
      return 'The transfer amount cannot be greater than the max amount.';
    case 'below_min':
      return `The entered amount is below the minimum transfer amount. Please enter an amount greater than ${SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE}.`;
    default:
      return null;
  }
}
