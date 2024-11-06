import { BigDecimal } from '@vertex-protocol/utils';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import {
  ProvideFormValidators,
  ProvideLiquidityErrorType,
} from 'client/modules/pools/types';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback } from 'react';

interface Params {
  maxBaseLpAmount?: BigDecimal;
  maxQuoteLpAmount?: BigDecimal;
}

export function useProvideLiquidityValidators({
  maxBaseLpAmount,
  maxQuoteLpAmount,
}: Params): ProvideFormValidators {
  const validateBaseAmount = useCallback<
    InputValidatorFn<string, ProvideLiquidityErrorType>
  >(
    (val) => {
      if (!val) {
        return;
      }
      if (!positiveBigDecimalValidator.safeParse(val).success) {
        return 'invalid_input';
      }
      if (maxBaseLpAmount && maxBaseLpAmount?.lt(val)) {
        return 'max_mint_exceeded';
      }
    },
    [maxBaseLpAmount],
  );

  const validateQuoteAmount = useCallback<
    InputValidatorFn<string, ProvideLiquidityErrorType>
  >(
    (val) => {
      if (!val) {
        return;
      }
      if (!positiveBigDecimalValidator.safeParse(val).success) {
        return 'invalid_input';
      }
      if (maxQuoteLpAmount && maxQuoteLpAmount?.lt(val)) {
        return 'max_mint_exceeded';
      }
    },
    [maxQuoteLpAmount],
  );

  return {
    validateBaseAmount,
    validateQuoteAmount,
  };
}
