import {
  BigDecimal,
  BigDecimalish,
  PlaceOrderParams,
  PlaceTriggerOrderParams,
  millisToSeconds,
  toBigDecimal,
} from '@vertex-protocol/client';
import {
  getExpirationTimestamp,
  getOrderNonce,
  getTriggerOrderNonce,
  OrderExpirationType,
} from '@vertex-protocol/contracts';
import { toPrintableObject } from '@vertex-protocol/utils';
import { ExecutePlaceOrderParams } from 'client/hooks/execute/placeOrder/types';
import { ValidExecuteContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useOrderbookAddresses } from 'client/hooks/query/markets/useOrderbookAddresses';
import { useGetRecvTime } from 'client/hooks/util/useGetRecvTime';
import { VERTEX_PRODUCT_DECIMALS } from 'client/utils/decimalAdjustment';
import { roundToIncrement, roundToString } from 'client/utils/rounding';
import { addDays, getTime } from 'date-fns';
import { useCallback } from 'react';

export function usePlaceOrderMutationFn() {
  const { data: marketDataByProductId } = useAllMarketsStaticData();
  const { data: orderbookAddresses } = useOrderbookAddresses();
  const getRecvTime = useGetRecvTime();

  return useCallback(
    async (params: ExecutePlaceOrderParams, context: ValidExecuteContext) => {
      // Round amount & price
      const increments = marketDataByProductId?.all[params.productId];
      const roundedAmount = toMutationAmountInput(
        params.amount,
        // Undefined size increment will skip rounding
        params.allowAnyOrderSizeIncrement
          ? undefined
          : increments?.sizeIncrement,
      );
      const roundedPrice = toMutationPriceInput(
        params.price,
        increments?.priceIncrement,
      );

      const nonce = await (async () => {
        const recvTime = await getRecvTime();
        if (params.priceType === 'stop') {
          return getTriggerOrderNonce(recvTime);
        }
        return getOrderNonce(recvTime);
      })();

      // Create the relevant expiration type depending on order type
      const expirationType = ((): OrderExpirationType => {
        if (params.priceType === 'limit') {
          switch (params.timeInForceType) {
            case 'good_until':
              return params.postOnly ? 'post_only' : 'default';
            case 'fok':
              return 'fok';
            case 'ioc':
              return 'ioc';
            default:
              return 'default'; // In case timeInForceType is not defined and It's limit order.
          }
        }
        // Stop & market order
        return 'fok';
      })();

      const expirationTime = (() => {
        const nowMillis = Date.now();

        if (
          params.priceType === 'limit' &&
          params.timeInForceType === 'good_until' &&
          params.timeInForceInDays
        ) {
          return millisToSeconds(
            getTime(addDays(nowMillis, params.timeInForceInDays.toNumber())),
          );
        }

        // Infinite / no expiration, because now is in millis, but expirationTime is in seconds.
        return nowMillis;
      })();

      // Order is common across engine & trigger
      const order: PlaceOrderParams['order'] = {
        subaccountOwner: context.subaccount.address,
        subaccountName: context.subaccount.name,
        price: roundedPrice,
        amount: roundedAmount,
        expiration: getExpirationTimestamp({
          type: expirationType,
          expirationTime,
          reduceOnly: params.reduceOnly,
        }),
      };

      const sharedParams: PlaceTriggerOrderParams | PlaceOrderParams = {
        productId: params.productId,
        spotLeverage: params.spotLeverage,
        order,
        nonce,
        verifyingAddr: orderbookAddresses?.[params.productId],
        chainId: context.primaryChain.id,
      };

      // Mutate depending on whether we are placing a trigger order or not
      if (params.priceType === 'stop') {
        const roundedTriggerPrice = toMutationPriceInput(
          params.triggerPrice,
          increments?.priceIncrement,
        );

        const triggerOrderParams: PlaceTriggerOrderParams = {
          triggerCriteria: {
            type: params.triggerCriteriaType,
            triggerPrice: toMutationPriceInput(
              roundedTriggerPrice,
              increments?.priceIncrement,
            ),
          },
          ...sharedParams,
        };

        console.log(
          'Placing trigger order',
          toPrintableObject(triggerOrderParams),
        );
        return context.vertexClient.market.placeTriggerOrder(
          triggerOrderParams,
        );
      } else {
        const engineOrderParams: PlaceOrderParams = sharedParams;

        console.log(
          'Placing engine order',
          toPrintableObject(engineOrderParams),
        );
        return context.vertexClient.market.placeOrder(engineOrderParams);
      }
    },
    [getRecvTime, marketDataByProductId?.all, orderbookAddresses],
  );
}

function toMutationPriceInput(price: BigDecimalish, increment?: BigDecimal) {
  const roundedPrice = increment
    ? roundToIncrement(toBigDecimal(price), increment)
    : toBigDecimal(price);
  // Prevent "e-11" to improve parsing compatibility, as we have X18, the max decimal places we need to support is 18
  return roundToString(roundedPrice, VERTEX_PRODUCT_DECIMALS);
}

function toMutationAmountInput(amount: BigDecimalish, increment?: BigDecimal) {
  const roundedAmount = increment
    ? roundToIncrement(toBigDecimal(amount), increment)
    : toBigDecimal(amount);
  return roundToString(roundedAmount, 0);
}
