import { toBigDecimal, TriggerCriteriaType } from '@vertex-protocol/client';
import { addDecimals } from '@vertex-protocol/utils';
import { ExecutePlaceTriggerOrderParams } from 'client/hooks/execute/placeOrder/types';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { roundToString } from 'client/utils/rounding';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TpSlPositionData, TriggerCriteriaPriceType } from '../../types';
import { TpSlPlaceOrderFormValues } from './types';

interface Params {
  productId: number;
  isTakeProfit: boolean;
  tpSlPositionData: TpSlPositionData | undefined;
  isTriggerPriceAbove: boolean;
  useTpSlPlaceOrderForm: UseFormReturn<TpSlPlaceOrderFormValues>;
  setSavedTpSlTriggerPriceType: (
    triggerCriteriaPriceType: TriggerCriteriaPriceType,
  ) => void;
  mutateAsync: ReturnType<typeof useExecutePlaceOrder>['mutateAsync'];
}

export function useTpSlPlaceOrderFormSubmitHandler({
  productId,
  isTakeProfit,
  tpSlPositionData,
  useTpSlPlaceOrderForm,
  isTriggerPriceAbove,
  setSavedTpSlTriggerPriceType,
  mutateAsync,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const {
    savedSettings: {
      takeProfit: tpSlippageFraction,
      stopLoss: slSlippageFraction,
    },
  } = useOrderSlippageSettings();

  const slippageFraction = isTakeProfit
    ? tpSlippageFraction
    : slSlippageFraction;

  return useCallback(
    (values: TpSlPlaceOrderFormValues) => {
      if (!tpSlPositionData) return;

      const triggerCriteriaType: TriggerCriteriaType = (() => {
        if (values.triggerCriteriaPriceType === 'last_price') {
          return isTriggerPriceAbove ? 'last_price_above' : 'last_price_below';
        }

        return isTriggerPriceAbove
          ? 'oracle_price_above'
          : 'oracle_price_below';
      })();

      const orderAmount = addDecimals(tpSlPositionData.amount).negated();
      const triggerPrice = toBigDecimal(values.triggerPrice);

      // If current order amount is positive, we're going to buy, so increase the price, & vice versa
      const orderPrice = orderAmount.isPositive()
        ? triggerPrice.times(1 + slippageFraction)
        : triggerPrice.times(1 - slippageFraction);

      const mutationParams: ExecutePlaceTriggerOrderParams = {
        priceType: 'stop',
        reduceOnly: true,
        triggerCriteriaType,
        price: orderPrice,
        amount: roundToString(orderAmount, 0),
        triggerPrice,
        productId,
      };

      const serverExecutionResult = mutateAsync(mutationParams, {
        onSuccess: () => {
          // Update user settings
          setSavedTpSlTriggerPriceType(values.triggerCriteriaPriceType);
          // Reset the form
          useTpSlPlaceOrderForm.setValue('pnlFrac', 0);
          useTpSlPlaceOrderForm.resetField('triggerPrice');
          useTpSlPlaceOrderForm.setValue('priceSource', 'absolute');
        },
      });

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Place TP/SL Order Failed',
          executionData: {
            serverExecutionResult,
          },
        },
      });
    },
    [
      tpSlPositionData,
      slippageFraction,
      productId,
      mutateAsync,
      dispatchNotification,
      isTriggerPriceAbove,
      setSavedTpSlTriggerPriceType,
      useTpSlPlaceOrderForm,
    ],
  );
}
