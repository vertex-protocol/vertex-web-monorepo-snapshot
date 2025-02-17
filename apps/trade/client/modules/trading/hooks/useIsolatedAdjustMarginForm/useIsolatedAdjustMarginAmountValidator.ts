import {
  InputValidatorFn,
  safeParseForData,
} from '@vertex-protocol/web-common';
import BigDecimal from 'bignumber.js';
import { SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE } from 'client/modules/subaccounts/consts';
import { IsolatedAdjustMarginFormErrorType } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/types';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback } from 'react';

interface Params {
  maxWithdrawable: BigDecimal | undefined;
  isAddMargin: boolean;
}

export function useIsolatedAdjustMarginAmountValidator({
  maxWithdrawable,
  isAddMargin,
}: Params) {
  return useCallback<
    InputValidatorFn<string, IsolatedAdjustMarginFormErrorType>
  >(
    (amount) => {
      if (!amount) {
        return;
      }

      const parsedInput = safeParseForData(positiveBigDecimalValidator, amount);

      if (!parsedInput) {
        return 'invalid_input';
      }

      if (parsedInput.lt(SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE)) {
        return 'below_min';
      }

      if (!!maxWithdrawable && parsedInput.gt(maxWithdrawable)) {
        return isAddMargin ? 'add_max_exceeded' : 'remove_max_exceeded';
      }
    },
    [maxWithdrawable, isAddMargin],
  );
}
