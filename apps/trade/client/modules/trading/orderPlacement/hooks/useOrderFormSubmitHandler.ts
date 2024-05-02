import { TriggerCriteriaType } from '@vertex-protocol/client';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  BigDecimal,
  toBigDecimal,
  toPrintableObject,
} from '@vertex-protocol/utils';
import { useExecuteCancelReduceOnlyOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelReduceOnlyOrdersWithNotification';
import {
  CommonOrderParams,
  ExecutePlaceEngineOrderParams,
  ExecutePlaceOrderParams,
  ExecutePlaceTriggerOrderParams,
} from 'client/hooks/execute/placeOrder/types';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useTradingConsolePosition } from 'client/modules/trading/hooks/useTradingConsolePosition';
import { BaseOrderFormValues } from 'client/modules/trading/types';
import { addDecimals } from 'client/utils/decimalAdjustment';
import { MutableRefObject, useCallback } from 'react';

interface Params {
  mutateAsync: ReturnType<typeof useExecutePlaceOrder>['mutateAsync'];
  allowAnyOrderSizeIncrement: boolean;
  // Used for stop orders as the stop price
  inputConversionPriceRef: MutableRefObject<BigDecimal | undefined>;
  // Used as the actual "price" field of an engine order
  executionConversionPriceRef: MutableRefObject<BigDecimal | undefined>;
  currentMarket?: StaticMarketData;
  // For spot
  spotLeverageEnabled?: boolean;
}

export function useOrderFormSubmitHandler({
  currentMarket,
  inputConversionPriceRef,
  executionConversionPriceRef,
  mutateAsync,
  spotLeverageEnabled,
  allowAnyOrderSizeIncrement,
}: Params) {
  const { trackEvent } = useAnalyticsContext();
  const { consolePosition } = useTradingConsolePosition();
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: latestOraclePrices } = useLatestOraclePrices();
  const latestOraclePricesRef = useSyncedRef(latestOraclePrices);
  const { cancelReduceOnlyOrdersWithNotification } =
    useExecuteCancelReduceOnlyOrdersWithNotification();

  return useCallback(
    (data: BaseOrderFormValues) => {
      const inputConversionPrice = inputConversionPriceRef.current;
      const executionConversionPrice = executionConversionPriceRef.current;

      if (!currentMarket || !data.assetAmount || !executionConversionPrice) {
        return;
      }

      const marketData = (() => {
        if (currentMarket.type === ProductEngineType.SPOT) {
          return currentMarket.metadata.token;
        }
        return currentMarket.metadata;
      })();

      const orderAmount = toBigDecimal(data.assetAmount);
      const decimalAdjustedAmount = addDecimals(
        data.side === 'long' ? orderAmount : orderAmount.multipliedBy(-1),
      );
      const timeInForceInDays = data.timeInForceInDays
        ? toBigDecimal(data.timeInForceInDays)
        : undefined;

      const spotLeverage = (() => {
        if (currentMarket.type !== ProductEngineType.SPOT) {
          return;
        }
        // Default to no leverage
        return spotLeverageEnabled ?? false;
      })();

      let mutationParams: ExecutePlaceOrderParams;
      const commonOrderParams: CommonOrderParams = {
        productId: currentMarket.productId,
        price: executionConversionPrice,
        amount: decimalAdjustedAmount,
        spotLeverage,
        allowAnyOrderSizeIncrement,
        timeInForceType: data.timeInForceType,
        timeInForceInDays,
        postOnly: data.postOnly,
        reduceOnly: data.reduceOnly,
      };

      if (data.priceType === 'stop') {
        // Avoid placing bad stop orders
        const latestOraclePrice =
          latestOraclePricesRef.current?.[currentMarket.productId]?.oraclePrice;
        if (!inputConversionPrice || !latestOraclePrice) {
          console.warn(
            'Skipping stop order placement, missing data.',
            toPrintableObject(inputConversionPrice),
            toPrintableObject(latestOraclePrice),
          );
          return;
        }

        // Backend trigger service uses oracle price to determine when to send orders to engine, so do the same check ehre
        // If trigger > oracle, then we want the order to trigger when oracle rises above the trigger price, and vice versa
        const triggerCriteriaType: TriggerCriteriaType =
          inputConversionPrice.gt(latestOraclePrice)
            ? 'oracle_price_above'
            : 'oracle_price_below';

        // Create a new const for IDE autocompletion
        const triggerParams: ExecutePlaceTriggerOrderParams = {
          ...commonOrderParams,
          triggerCriteriaType,
          priceType: data.priceType,
          triggerPrice: inputConversionPrice,
        };
        mutationParams = triggerParams;
      } else {
        const engineParams: ExecutePlaceEngineOrderParams = {
          ...commonOrderParams,
          priceType: data.priceType,
        };
        mutationParams = engineParams;
      }

      const orderActionResult = mutateAsync(mutationParams, {
        onSuccess: () => {
          // Cancel all reduce only orders for product
          cancelReduceOnlyOrdersWithNotification([currentMarket.productId]);

          trackEvent({
            type: 'trade_placed',
            data: { consolePosition: consolePosition },
          });
        },
      });

      dispatchNotification({
        type: 'place_order',
        data: {
          placeOrderParams: mutationParams,
          metadata: {
            icon: marketData.icon,
            symbol: marketData.symbol,
            marketName: currentMarket.metadata.marketName,
            priceIncrement: currentMarket.priceIncrement,
          },
          orderMarketType: currentMarket.type,
          orderPriceType: data.priceType,
          executeResult: orderActionResult,
        },
      });
    },
    [
      inputConversionPriceRef,
      executionConversionPriceRef,
      currentMarket,
      allowAnyOrderSizeIncrement,
      mutateAsync,
      dispatchNotification,
      spotLeverageEnabled,
      latestOraclePricesRef,
      cancelReduceOnlyOrdersWithNotification,
      consolePosition,
      trackEvent,
    ],
  );
}
