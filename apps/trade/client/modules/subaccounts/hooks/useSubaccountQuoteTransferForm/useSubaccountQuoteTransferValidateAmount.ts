import { BigDecimal } from '@vertex-protocol/client';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE } from 'client/modules/subaccounts/consts';
import { SubaccountQuoteTransferErrorType } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback } from 'react';

interface Params {
  maxAmount: BigDecimal | undefined;
}

export function useSubaccountQuoteTransferValidateAmount({
  maxAmount,
}: Params) {
  return useCallback<
    InputValidatorFn<string, SubaccountQuoteTransferErrorType>
  >(
    (transferAmount) => {
      if (!transferAmount) {
        return;
      }

      const parsedAmount =
        positiveBigDecimalValidator.safeParse(transferAmount);

      if (!parsedAmount.success) {
        return 'invalid_input';
      }

      if (parsedAmount.data.lt(SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE)) {
        return 'under_min';
      }

      if (maxAmount && parsedAmount.data.gt(maxAmount)) {
        return 'max_exceeded';
      }
    },
    [maxAmount],
  );
}
