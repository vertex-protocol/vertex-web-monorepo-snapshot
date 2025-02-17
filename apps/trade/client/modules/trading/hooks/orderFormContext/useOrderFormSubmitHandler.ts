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
import {
  CommonOrderParams,
  ExecutePlaceEngineOrderIsolatedParams,
  ExecutePlaceEngineOrderParams,
  ExecutePlaceOrderParams,
  ExecutePlaceTriggerOrderParams,
} from 'client/hooks/execute/placeOrder/types';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';

import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseOrderFormValues } from 'client/modules/trading/types';
import { calcMarketConversionPriceFromOraclePrice } from 'client/utils/calcs/calcMarketConversionPriceFromOraclePrice';
import { RefObject, useCallback } from 'react';

interface BaseParams {
  mutateAsync: ReturnType<typeof useExecutePlaceOrder>['mutateAsync'];
  // Used for stop orders as the stop price
  inputConversionPriceRef: RefObject<BigDecimal | undefined>;
  // Used as the actual "price" field of an engine order
  executionConversionPriceRef: RefObject<BigDecimal | undefined>;
  currentMarket: StaticMarketData | undefined;
  quoteProductId: number | undefined;
}

interface SpotParams {
  spotLeverageEnabled: boolean;
  allowAnyOrderSizeIncrement: boolean;
  marginMode?: never;
  tpsl?: never;
  iso?: never;
}

export interface OrderFormSubmitHandlerIsoParams {
  // The subaccount name of the isolated subaccount, undefined if there isn't an existing isolated position
  subaccountName: string | undefined;
  isReducingIsoPosition: boolean;
}

interface PerpParams {
  spotLeverageEnabled?: never;
  allowAnyOrderSizeIncrement?: never;
  marginMode: MarginMode;
  tpsl: {
    isTpSlEnabled: boolean;
    takeProfitOrderFormOnSubmit: () => void;
    stopLossOrderFormOnSubmit: () => void;
  };
  iso: OrderFormSubmitHandlerIsoParams | undefined;
}

type Params = BaseParams & (SpotParams | PerpParams);

export function useOrderFormSubmitHandler({
  currentMarket,
  quoteProductId,
  inputConversionPriceRef,
  executionConversionPriceRef,
  mutateAsync,
  spotLeverageEnabled,
  allowAnyOrderSizeIncrement,
  tpsl,
  marginMode,
  iso,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: latestOraclePrices } = useLatestOraclePrices();
  const latestOraclePricesRef = useSyncedRef(latestOraclePrices);

  return useCallback(
    (data: BaseOrderFormValues) => {
      const inputConversionPrice = inputConversionPriceRef.current;
      const executionConversionPrice = executionConversionPriceRef.current;

      if (
        !currentMarket ||
        !data.assetAmount ||
        !executionConversionPrice ||
        !inputConversionPrice
      ) {
        console.warn(
          '[useOrderFormSubmitHandler] Skipping order placement, missing/invalid data.',
          toPrintableObject(inputConversionPrice),
          toPrintableObject(executionConversionPrice),
          toPrintableObject(currentMarket),
          data,
        );
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

      // Use the subaccount name of the isolated subaccount if reducing an iso position because `PlaceIsolatedOrder` does not support `reduce_only`
      // Otherwise, we want to use `PlaceIsolatedOrder` with the parent cross subaccount, so that open orders can be queried via the cross subaccount
      const reduceOnlyIsoSubaccountName = data.reduceOnly
        ? iso?.subaccountName
        : undefined;

      let mutationParams: ExecutePlaceOrderParams;
      const commonOrderParams: CommonOrderParams = {
        subaccountName: reduceOnlyIsoSubaccountName,
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
        console.log(
          '[useOrderFormSubmitHandler] Stop order mutation params',
          toPrintableObject(triggerParams),
        );
        mutationParams = triggerParams;
      } else {
        const isolatedParams:
          | ExecutePlaceEngineOrderIsolatedParams
          | undefined = (() => {
          if (marginMode?.mode === 'isolated') {
            // No margin transfer if reducing
            if (iso?.isReducingIsoPosition) {
              return {
                margin: BigDecimals.ZERO,
                borrowMargin: false,
              };
            }

            const leverage = marginMode.leverage;
            // Use input conversion price to get the est. notional
            const margin = decimalAdjustedAmount
              .multipliedBy(inputConversionPrice)
              .dividedBy(leverage)
              .abs();

            return {
              margin,
              borrowMargin: marginMode.enableBorrows,
            };
          }
        })();

        const engineParams: ExecutePlaceEngineOrderParams = {
          ...commonOrderParams,
          priceType: data.priceType,
          iso: isolatedParams,
        };
        console.log(
          '[useOrderFormSubmitHandler] Engine order mutation params',
          toPrintableObject(engineParams),
        );
        mutationParams = engineParams;
      }

      const orderActionResult = mutateAsync(mutationParams, {
        async onSuccess() {
          if (!tpsl?.isTpSlEnabled) {
            return;
          }

          tpsl.takeProfitOrderFormOnSubmit();
          tpsl.stopLossOrderFormOnSubmit();
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
      iso?.isReducingIsoPosition,
      iso?.subaccountName,
      allowAnyOrderSizeIncrement,
      mutateAsync,
      dispatchNotification,
      spotLeverageEnabled,
      quoteProductId,
      latestOraclePricesRef,
      marginMode?.mode,
      marginMode?.leverage,
      marginMode?.enableBorrows,
      tpsl,
    ],
  );
}
