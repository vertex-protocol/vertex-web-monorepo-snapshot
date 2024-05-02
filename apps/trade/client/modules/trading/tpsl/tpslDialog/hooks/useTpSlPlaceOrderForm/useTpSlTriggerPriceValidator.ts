import {
  InputValidatorFn,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback } from 'react';
import { BigDecimal } from '@vertex-protocol/client';
import { TpSlPlaceOrderErrorType } from './types';
import { TpSlPositionData } from '../../types';

interface Params {
  tpSlPositionData: TpSlPositionData | undefined;
  isTakeProfit: boolean;
  referencePrice: BigDecimal | undefined;
}

export function useTpSlTriggerPriceValidator({
  tpSlPositionData,
  isTakeProfit,
  referencePrice,
}: Params) {
  return useCallback<InputValidatorFn<string, TpSlPlaceOrderErrorType>>(
    (triggerPrice) => {
      if (!triggerPrice) {
        return;
      }

      const parsedTriggerPrice = safeParseForData(
        positiveBigDecimalValidator,
        triggerPrice,
      );

      if (!parsedTriggerPrice) {
        return 'invalid_input';
      }

      if (tpSlPositionData == null || referencePrice == null) {
        return;
      }

      /*
       * Validate Trigger Price:
       * If Long position
       *  Take Profit = Trigger Price > Reference Price (Last or Mark)
       *  Stop Loss = Trigger Price < Reference Price (Last or Mark)
       *
       * If Short position
       *  Take Profit = Trigger Price < Reference Price (Last or Mark)
       *  Stop Loss = Trigger Price > Reference Price (Last or Mark)
       */
      if (tpSlPositionData.amount.isPositive()) {
        if (isTakeProfit) {
          if (parsedTriggerPrice.lte(referencePrice)) {
            return 'trigger_price_must_be_above_price';
          }
        } else {
          if (parsedTriggerPrice.gte(referencePrice)) {
            return 'trigger_price_must_be_below_price';
          }
        }
      } else {
        if (isTakeProfit) {
          if (parsedTriggerPrice.gte(referencePrice)) {
            return 'trigger_price_must_be_below_price';
          }
        } else {
          if (parsedTriggerPrice.lte(referencePrice)) {
            return 'trigger_price_must_be_above_price';
          }
        }
      }
    },
    [isTakeProfit, referencePrice, tpSlPositionData],
  );
}
