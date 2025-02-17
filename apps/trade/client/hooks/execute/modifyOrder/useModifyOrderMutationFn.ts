import {
  BigDecimal,
  getOrderDigest,
  getTriggerOrderNonce,
} from '@vertex-protocol/client';
import { getOrderNonce } from '@vertex-protocol/contracts';
import {
  ModifyOrderParams,
  ModifyOrderResult,
} from 'client/hooks/execute/modifyOrder/types';
import {
  validateModifiedLimitOrderPrice,
  validateModifiedTriggerOrderPrice,
} from 'client/hooks/execute/modifyOrder/validateModifiedOrderPrice';
import { ValidExecuteContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useOrderbookAddresses } from 'client/hooks/query/markets/useOrderbookAddresses';
import { useGetRecvTime } from 'client/hooks/util/useGetRecvTime';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useVertexClientHasLinkedSigner } from 'client/hooks/util/useVertexClientHasLinkedSigner';
import { OrderSlippageSettings } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { getIsIsoEngineOrder } from 'client/modules/trading/utils/isoOrderChecks';
import { roundToIncrement } from 'client/utils/rounding';
import { useCallback } from 'react';

export function useModifyOrderMutationFn() {
  const getRecvTime = useGetRecvTime();
  const hasLinkedSigner = useVertexClientHasLinkedSigner();
  const { data: orderbookAddresses } = useOrderbookAddresses();
  const { savedSettings: slippageSettings } = useOrderSlippageSettings();
  const { data: marketDataByProductId } = useAllMarketsStaticData();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();
  const latestMarketPricesRef = useSyncedRef(latestMarketPrices);

  return useCallback(
    async (
      params: ModifyOrderParams,
      context: ValidExecuteContext,
    ): Promise<ModifyOrderResult> => {
      const marketPrice =
        latestMarketPricesRef.current?.[params.productId].safeAverage;

      if (params.isTrigger) {
        if (!hasLinkedSigner) {
          throw new Error('Cannot modify trigger order without linked signer');
        }
        if (!orderbookAddresses?.[params.productId]) {
          throw new Error('Could not find orderbook address for product');
        }

        return cancelThenPlaceTriggerOrder({
          modifyOrderParams: params,
          context,
          getRecvTime,
          verifyingAddr: orderbookAddresses[params.productId],
          slippageSettings,
          priceIncrement:
            marketDataByProductId?.all[params.productId]?.priceIncrement,
          marketPrice,
        });
      }

      return cancelAndPlaceOrder({
        modifyOrderParams: params,
        getRecvTime,
        context,
        marketPrice,
      });
    },
    [
      getRecvTime,
      hasLinkedSigner,
      orderbookAddresses,
      slippageSettings,
      marketDataByProductId,
      latestMarketPricesRef,
    ],
  );
}

interface CancelAndPlaceOrderParams {
  modifyOrderParams: ModifyOrderParams;
  getRecvTime: () => Promise<number>;
  context: ValidExecuteContext;
  marketPrice: BigDecimal | undefined;
}

async function cancelAndPlaceOrder({
  modifyOrderParams,
  getRecvTime,
  context,
  marketPrice,
}: CancelAndPlaceOrderParams) {
  const [currentOrder, recvTime] = await Promise.all([
    context.vertexClient.context.engineClient.getOrder({
      digest: modifyOrderParams.digest,
      productId: modifyOrderParams.productId,
    }),
    getRecvTime(),
  ]);

  if (!currentOrder) {
    throw new Error(
      `Could not find order with digest ${modifyOrderParams.digest}.`,
    );
  }
  if (getIsIsoEngineOrder(currentOrder)) {
    throw new Error(
      'Modifying isolated order is not supported. Please cancel and place a new order.',
    );
  }

  // Validate the new order price.
  // The function throws an error if the price is invalid.
  validateModifiedLimitOrderPrice({
    marketPrice,
    newPrice: modifyOrderParams.newPrice,
    isLongOrder: currentOrder.totalAmount.isPositive(),
  });

  const nonce = getOrderNonce(recvTime);
  const result = await context.vertexClient.market.cancelAndPlace({
    cancelOrders: {
      subaccountOwner: context.subaccount.address,
      subaccountName: context.subaccount.name,
      chainId: context.subaccount.chainId,
      productIds: [modifyOrderParams.productId],
      digests: [modifyOrderParams.digest],
    },
    placeOrder: {
      chainId: context.subaccount.chainId,
      productId: modifyOrderParams.productId,
      order: {
        subaccountOwner: context.subaccount.address,
        subaccountName: context.subaccount.name,
        expiration: currentOrder.expiration.toString(),
        price: modifyOrderParams.newPrice.toString(),
        amount: currentOrder.unfilledAmount.toFixed(),
      },
      nonce,
    },
  });
  return { digest: result.data.digest };
}

interface CancelAndPlaceTriggerOrderParams {
  modifyOrderParams: ModifyOrderParams;
  context: ValidExecuteContext;
  getRecvTime: () => Promise<number>;
  verifyingAddr: string;
  slippageSettings: OrderSlippageSettings;
  priceIncrement: BigDecimal | undefined;
  marketPrice: BigDecimal | undefined;
}

async function cancelThenPlaceTriggerOrder({
  modifyOrderParams,
  context,
  getRecvTime,
  verifyingAddr,
  slippageSettings,
  priceIncrement,
  marketPrice,
}: CancelAndPlaceTriggerOrderParams) {
  const getTriggerOrder = async () => {
    // there is currently no 1:1 getTriggerOrder(digest) lookup API so we get pending
    // trigger orders for this product and then find the order with matching digest
    const productOrders = await context.vertexClient.market.getTriggerOrders({
      subaccountOwner: context.subaccount.address,
      subaccountName: context.subaccount.name,
      chainId: context.subaccount.chainId,
      pending: true,
      productId: modifyOrderParams.productId,
      digests: [modifyOrderParams.digest],
    });
    return productOrders.orders[0];
  };

  const [currentOrder, recvTime] = await Promise.all([
    getTriggerOrder(),
    getRecvTime(),
  ]);
  if (!currentOrder) {
    throw new Error('Could not find current trigger order');
  }

  // calculate new order price with slippage
  const slippageFraction = (() => {
    switch (modifyOrderParams.orderType) {
      case 'stop':
        return slippageSettings.stopMarket;
      case 'take_profit':
        return slippageSettings.takeProfit;
      case 'stop_loss':
        return slippageSettings.stopLoss;
      default:
        throw new Error(
          `Unsupported order type ${modifyOrderParams.orderType}`,
        );
    }
  })();

  // Validate the new trigger price.
  // The function throws an error if the price is invalid.
  validateModifiedTriggerOrderPrice({
    marketPrice,
    newPrice: modifyOrderParams.newPrice,
    orderType: modifyOrderParams.orderType,
    triggerCriteriaType: currentOrder.order.triggerCriteria.type,
  });

  // there is currently no atomic cancelAndPlace for trigger orders
  // so we have to cancel _then_ place the same order with the modified trigger
  await context.vertexClient.market.cancelTriggerOrders({
    subaccountOwner: context.subaccount.address,
    subaccountName: context.subaccount.name,
    chainId: context.subaccount.chainId,
    productIds: [modifyOrderParams.productId],
    digests: [modifyOrderParams.digest],
  });

  const isBuy = currentOrder.order.amount.isPositive();
  const newOrderPrice = roundToIncrement(
    isBuy
      ? modifyOrderParams.newPrice.times(1 + slippageFraction)
      : modifyOrderParams.newPrice.times(1 - slippageFraction),
    priceIncrement ?? 0,
  );

  const order = {
    subaccountOwner: context.subaccount.address,
    subaccountName: context.subaccount.name,
    price: newOrderPrice.toString(),
    amount: currentOrder.order.amount.toFixed(),
    expiration: currentOrder.order.expiration.toString(),
  };

  const nonce = getTriggerOrderNonce(recvTime);
  await context.vertexClient.market.placeTriggerOrder({
    chainId: context.subaccount.chainId,
    productId: modifyOrderParams.productId,
    triggerCriteria: {
      type: currentOrder.order.triggerCriteria.type,
      triggerPrice: modifyOrderParams.newPrice.toString(),
    },
    order,
    nonce,
  });

  // placeTriggerOrder does not currently return the digest so we compute it locally
  const digest = getOrderDigest({
    order: {
      ...order,
      nonce,
    },
    verifyingAddr,
    chainId: context.subaccount.chainId,
  });
  return { digest };
}
