import { TriggerCriteriaType } from '@vertex-protocol/client';
import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  addDecimals,
  BigDecimal,
  BigDecimals,
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
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseOrderFormValues } from 'client/modules/trading/types';
import { calcMarketConversionPriceFromOraclePrice } from 'client/utils/calcs/calcMarketConversionPriceFromOraclePrice';
import { MutableRefObject, useCallback } from 'react';

interface Params {
  mutateAsync: ReturnType<typeof useExecutePlaceOrder>['mutateAsync'];
  allowAnyOrderSizeIncrement: boolean;
  // Used for stop orders as the stop price
  inputConversionPriceRef: MutableRefObject<BigDecimal | undefined>;
  // Used as the actual "price" field of an engine order
  executionConversionPriceRef: MutableRefObject<BigDecimal | undefined>;
  currentMarket: StaticMarketData | undefined;
  quoteProductId: number | undefined;
  // For spot
  spotLeverageEnabled?: boolean;
}

export function useOrderFormSubmitHandler({
  currentMarket,
  quoteProductId,
  inputConversionPriceRef,
  executionConversionPriceRef,
  mutateAsync,
  spotLeverageEnabled,
  allowAnyOrderSizeIncrement,
}: Params) {
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
        if (quoteProductId == null) {
          console.warn(
            '[useOrderFormSubmitHandler] Skipping stop order placement, missing quote product ID',
          );
          return;
        }

        // Avoid placing bad stop orders by deriving trigger condition from latest oracle prices
        const baseOraclePrice =
          latestOraclePricesRef.current?.[currentMarket.productId]?.oraclePrice;
        const quoteOraclePrice =
          quoteProductId === QUOTE_PRODUCT_ID
            ? BigDecimals.ONE
            : latestOraclePricesRef.current?.[quoteProductId]?.oraclePrice;

        if (
          !inputConversionPrice ||
          !baseOraclePrice ||
          !quoteOraclePrice ||
          baseOraclePrice.isZero() ||
          quoteOraclePrice.isZero()
        ) {
          console.warn(
            '[useOrderFormSubmitHandler] Skipping stop order placement, missing/invalid data.',
            toPrintableObject(inputConversionPrice),
            toPrintableObject(baseOraclePrice),
            toPrintableObject(quoteOraclePrice),
          );
          return;
        }

        const oracleConversionPrice = calcMarketConversionPriceFromOraclePrice(
          baseOraclePrice,
          quoteOraclePrice,
        );

        // Backend trigger service uses oracle price to determine when to send orders to engine, so do the same check here
        // If trigger > oracle, then we want the order to trigger when oracle rises above the trigger price, and vice versa
        const triggerCriteriaType: TriggerCriteriaType =
          inputConversionPrice.gt(oracleConversionPrice)
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
      quoteProductId,
      latestOraclePricesRef,
      cancelReduceOnlyOrdersWithNotification,
    ],
  );
}
