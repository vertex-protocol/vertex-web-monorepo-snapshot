import {
  asyncResult,
  BalanceSide,
  toBigDecimal,
  TriggerCriteriaType,
  TriggerOrderInfo,
} from '@vertex-protocol/client';
import { useExecuteCancelOrders } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrders';
import { ExecutePlaceTriggerOrderParams } from 'client/hooks/execute/placeOrder/types';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { TP_SL_ORDER_SIZE_WITH_DECIMALS } from 'client/modules/trading/tpsl/consts';
import { TpSlPlaceOrderFormValues } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { roundToString } from 'client/utils/rounding';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  productId: number | undefined;
  isTakeProfit: boolean;
  positionSide: BalanceSide | undefined;
  isTriggerPriceAbove: boolean;
  existingTriggerOrder: TriggerOrderInfo | undefined;
  useTpSlPlaceOrderForm: UseFormReturn<TpSlPlaceOrderFormValues>;
  setSavedTpSlTriggerPriceType: (
    triggerCriteriaPriceType: TriggerCriteriaPriceType,
  ) => void;
  mutateAsync: ReturnType<typeof useExecutePlaceOrder>['mutateAsync'];
  /**
   * Used for analytics to determine what event data to send.
   */
  isPerpOrderForm?: boolean;
}

export function useTpSlPlaceOrderFormSubmitHandler({
  productId,
  isTakeProfit,
  positionSide,
  existingTriggerOrder,
  isTriggerPriceAbove,
  useTpSlPlaceOrderForm,
  setSavedTpSlTriggerPriceType,
  mutateAsync,
  isPerpOrderForm,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const {
    savedSettings: {
      takeProfit: tpSlippageFraction,
      stopLoss: slSlippageFraction,
    },
  } = useOrderSlippageSettings();
  const { mutateAsync: cancelOrdersAsync } = useExecuteCancelOrders();
  const { trackEvent } = useAnalyticsContext();

  const slippageFraction = isTakeProfit
    ? tpSlippageFraction
    : slSlippageFraction;

  return useCallback(
    async (values: TpSlPlaceOrderFormValues) => {
      if (!values.triggerPrice || !productId || !positionSide) {
        return;
      }

      trackEvent({
        type: 'tpsl_order_submit',
        data: {
          location: isPerpOrderForm ? 'perp_order_form' : 'tpsl_dialog',
          type: isTakeProfit ? 'take_profit' : 'stop_loss',
        },
      });

      const triggerCriteriaType: TriggerCriteriaType = (() => {
        if (values.triggerCriteriaPriceType === 'last_price') {
          return isTriggerPriceAbove ? 'last_price_above' : 'last_price_below';
        }

        return isTriggerPriceAbove
          ? 'oracle_price_above'
          : 'oracle_price_below';
      })();

      const orderAmount =
        positionSide === 'short'
          ? TP_SL_ORDER_SIZE_WITH_DECIMALS
          : TP_SL_ORDER_SIZE_WITH_DECIMALS.negated();

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

      // This path is currently only used when invoked from the perp TP/SL form.
      if (existingTriggerOrder) {
        const cancelMutationResult = cancelOrdersAsync({
          orders: [
            {
              digest: existingTriggerOrder.order.digest,
              isTrigger: true,
              productId,
            },
          ],
        });

        const [, mutationError] = await asyncResult(cancelMutationResult);

        if (mutationError) {
          dispatchNotification({
            type: 'action_error_handler',
            data: {
              errorNotificationTitle: 'Place TP/SL Order Failed',
              executionData: { serverExecutionResult: cancelMutationResult },
            },
          });

          return;
        }
      }

      const serverExecutionResult = mutateAsync(mutationParams, {
        onSuccess: () => {
          // Update user settings
          setSavedTpSlTriggerPriceType(values.triggerCriteriaPriceType);
          // Reset the form
          useTpSlPlaceOrderForm.resetField('triggerPrice');
          useTpSlPlaceOrderForm.resetField('gainOrLossPercentage');
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
      productId,
      positionSide,
      trackEvent,
      isPerpOrderForm,
      isTakeProfit,
      slippageFraction,
      existingTriggerOrder,
      mutateAsync,
      dispatchNotification,
      isTriggerPriceAbove,
      cancelOrdersAsync,
      setSavedTpSlTriggerPriceType,
      useTpSlPlaceOrderForm,
    ],
  );
}
