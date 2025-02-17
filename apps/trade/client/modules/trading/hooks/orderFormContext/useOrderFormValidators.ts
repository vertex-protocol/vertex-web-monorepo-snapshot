import { BigDecimal } from '@vertex-protocol/utils';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import {
  OrderFormInputError,
  OrderFormValidators,
} from 'client/modules/trading/types';
import { incrementValidator } from 'client/modules/trading/utils/incrementValidator';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { RefObject, useCallback } from 'react';

interface Params {
  inputConversionPriceRef: RefObject<BigDecimal | undefined>;
  maxAssetOrderSizeRef: RefObject<BigDecimal | undefined>;
  sizeIncrement: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
  minAssetOrderSize: BigDecimal | undefined;
  enableMaxSizeLogic: boolean;
  allowAnyOrderSizeIncrement: boolean;
}

export function useOrderFormValidators({
  inputConversionPriceRef,
  maxAssetOrderSizeRef,
  minAssetOrderSize,
  priceIncrement,
  sizeIncrement,
  enableMaxSizeLogic,
  allowAnyOrderSizeIncrement,
}: Params): OrderFormValidators {
  const validateAmount = useCallback<
    InputValidatorFn<string, OrderFormInputError>
  >(
    (val) => {
      if (!val) {
        return;
      }

      if (!positiveBigDecimalValidator.safeParse(val).success) {
        return 'invalid_input';
      }
      if (minAssetOrderSize?.gt(val)) {
        return 'below_min';
      }

      if (!allowAnyOrderSizeIncrement) {
        if (sizeIncrement && !incrementValidator(val, sizeIncrement)) {
          return 'invalid_size_increment';
        }
      }
      const maxAssetOrderSize = maxAssetOrderSizeRef.current;
      if (
        enableMaxSizeLogic &&
        maxAssetOrderSize &&
        maxAssetOrderSize.lt(val)
      ) {
        return 'max_exceeded';
      }
      return undefined;
    },
    [
      allowAnyOrderSizeIncrement,
      maxAssetOrderSizeRef,
      enableMaxSizeLogic,
      minAssetOrderSize,
      sizeIncrement,
    ],
  );

  const validateQuoteAmount = useCallback<
    InputValidatorFn<string, OrderFormInputError>
  >(
    (val) => {
      if (!val) {
        return;
      }

      if (!positiveBigDecimalValidator.safeParse(val).success) {
        return 'invalid_input';
      }
      const maxAssetOrderSize = maxAssetOrderSizeRef.current;
      const inputConversionPrice = inputConversionPriceRef.current;
      if (
        enableMaxSizeLogic &&
        maxAssetOrderSize &&
        inputConversionPrice &&
        maxAssetOrderSize.multipliedBy(inputConversionPrice).lt(val)
      ) {
        return 'max_exceeded';
      }
      return undefined;
    },
    [enableMaxSizeLogic, inputConversionPriceRef, maxAssetOrderSizeRef],
  );

  const validatePrice = useCallback<
    InputValidatorFn<string, OrderFormInputError>
  >(
    (val) => {
      if (!val) {
        return;
      }

      if (!positiveBigDecimalValidator.safeParse(val).success) {
        return 'invalid_input';
      } else if (priceIncrement && !incrementValidator(val, priceIncrement)) {
        return 'invalid_price_increment';
      }
    },
    [priceIncrement],
  );

  const validateTimeInForceInDays = useCallback<
    InputValidatorFn<string, OrderFormInputError>
  >((val) => {
    if (!val) {
      return;
    }

    const parsed = positiveBigDecimalValidator.safeParse(val);

    if (!parsed.success || !parsed.data.isInteger()) {
      return 'time_in_force_in_days_invalid_input';
    } else if (parsed.data.gt(365)) {
      return 'time_in_force_in_days_out_of_range';
    }
  }, []);

  return {
    amount: validateAmount,
    quoteAmount: validateQuoteAmount,
    price: validatePrice,
    timeInForceInDays: validateTimeInForceInDays,
  };
}
