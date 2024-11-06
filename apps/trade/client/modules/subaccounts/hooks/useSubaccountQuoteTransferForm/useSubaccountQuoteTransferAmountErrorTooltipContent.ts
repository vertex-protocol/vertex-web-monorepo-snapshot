import { SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE } from 'client/modules/subaccounts/consts';
import { SubaccountQuoteTransferErrorType } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';

interface Params {
  formError: SubaccountQuoteTransferErrorType | undefined;
  primaryQuoteTokenSymbol: string;
}

export function useSubaccountQuoteTransferAmountErrorTooltipContent({
  formError,
  primaryQuoteTokenSymbol,
}: Params) {
  switch (formError) {
    case 'invalid_input':
      return 'Please enter a valid amount.';
    case 'under_min':
      return `Minimum transfer: ${SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE} ${primaryQuoteTokenSymbol}`;
    case 'max_exceeded':
      return 'The transfer amount cannot be greater than the max amount.';
    default:
      return null;
  }
}
