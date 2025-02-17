import { BigDecimal } from '@vertex-protocol/client';
import {
  InputValidatorFn,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE } from 'client/modules/subaccounts/consts';
import { SubaccountQuoteTransferErrorType } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback } from 'react';

interface Params {
  maxAmount: BigDecimal | undefined;
}

export function useSubaccountQuoteTransferAmountValidator({
  maxAmount,
}: Params) {
  return useCallback<
    InputValidatorFn<string, SubaccountQuoteTransferErrorType>
  >(
    (transferAmount) => {
      if (!transferAmount) {
        return;
      }

      const parsedInput = safeParseForData(
        positiveBigDecimalValidator,
        transferAmount,
      );

      if (!parsedInput) {
        return 'invalid_input';
      }

      if (parsedInput.lt(SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE)) {
        return 'below_min';
      }

      if (!!maxAmount && parsedInput.gt(maxAmount)) {
        return 'max_exceeded';
      }
    },
    [maxAmount],
  );
}
