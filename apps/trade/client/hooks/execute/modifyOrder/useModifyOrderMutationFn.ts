import { ValidExecuteContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useGetRecvTime } from 'client/hooks/util/useGetRecvTime';
import { getOrderNonce } from '@vertex-protocol/contracts';
import { useCallback } from 'react';
import { ModifyOrderParams, ModifyOrderResult } from './types';
import {
  BigDecimal,
  EngineServerPlaceOrderResponse,
  getOrderDigest,
  getTriggerOrderNonce,
} from '@vertex-protocol/client';
import { useVertexClientHasLinkedSigner } from 'client/hooks/util/useVertexClientHasLinkedSigner';
import { useOrderbookAddresses } from 'client/hooks/query/markets/useOrderbookAddresses';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { OrderSlippageSettings } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { roundToIncrement } from 'client/utils/rounding';

export function useModifyOrderMutationFn() {
  const getRecvTime = useGetRecvTime();
  const hasLinkedSigner = useVertexClientHasLinkedSigner();
  const { data: orderbookAddresses } = useOrderbookAddresses();
  const { savedSettings: slippageSettings } = useOrderSlippageSettings();
  const { data: marketDataByProductId } = useAllMarketsStaticData();

  return useCallback(
    async (
      params: ModifyOrderParams,
      context: ValidExecuteContext,
    ): Promise<ModifyOrderResult> => {
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
        });
      }

      return cancelAndPlaceOrder({
        modifyOrderParams: params,
        getRecvTime,
        context,
      });
    },
    [
      getRecvTime,
      hasLinkedSigner,
      orderbookAddresses,
      slippageSettings,
      marketDataByProductId,
    ],
  );
}

interface CancelAndPlaceOrderParams {
  modifyOrderParams: ModifyOrderParams;
  getRecvTime: () => Promise<number>;
  context: ValidExecuteContext;
}

async function cancelAndPlaceOrder({
  modifyOrderParams,
  getRecvTime,
  context,
}: CancelAndPlaceOrderParams) {
  const [currentOrder, recvTime] = await Promise.all([
    context.vertexClient.context.engineClient.getOrder({
      digest: modifyOrderParams.digest,
      productId: modifyOrderParams.productId,
    }),
    getRecvTime(),
  ]);

  if (!currentOrder) {
    throw new Error('Could not fetch current order');
  }

  const nonce = getOrderNonce(recvTime);
  const result = await context.vertexClient.market.cancelAndPlace({
    cancelOrders: {
      subaccountOwner: context.subaccount.address,
      subaccountName: context.subaccount.name,
      chainId: context.primaryChain.id,
      productIds: [modifyOrderParams.productId],
      digests: [modifyOrderParams.digest],
    },
    placeOrder: {
      chainId: context.primaryChain.id,
      productId: modifyOrderParams.productId,
      order: {
        subaccountOwner: context.subaccount.address,
        subaccountName: context.subaccount.name,
        expiration: currentOrder.expiration.toString(),
        price: modifyOrderParams.newPrice.toString(),
        amount: currentOrder.unfilledAmount.toString(),
      },
      nonce,
    },
  });
  if (result.status !== 'success') {
    throw new Error('Could not cancel and place order');
  }
  return { digest: (result.data as EngineServerPlaceOrderResponse).digest };
}

interface CancelAndPlaceTriggerOrderParams {
  modifyOrderParams: ModifyOrderParams;
  context: ValidExecuteContext;
  getRecvTime: () => Promise<number>;
  verifyingAddr: string;
  slippageSettings: OrderSlippageSettings;
  priceIncrement: BigDecimal | undefined;
}

async function cancelThenPlaceTriggerOrder({
  modifyOrderParams,
  context,
  getRecvTime,
  verifyingAddr,
  slippageSettings,
  priceIncrement,
}: CancelAndPlaceTriggerOrderParams) {
  const getTriggerOrder = async () => {
    // there is currently no 1:1 getTriggerOrder(digest) lookup API so we get pending
    // trigger orders for this product and then find the order with matching digest
    const productOrders = await context.vertexClient.market.getTriggerOrders({
      subaccountOwner: context.subaccount.address,
      subaccountName: context.subaccount.name,
      chainId: context.primaryChain.id,
      pending: true,
      productId: modifyOrderParams.productId,
      limit: 50,
    });
    return productOrders.orders.find(
      (orderInfo) => orderInfo.order.digest === modifyOrderParams.digest,
    );
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
    }
    throw new Error(`Unsupported order type ${modifyOrderParams.orderType}`);
  })();

  // there is currently no atomic cancelAndPlace for trigger orders
  // so we have to cancel _then_ place the same order with the modified trigger
  const cancelResult = await context.vertexClient.market.cancelTriggerOrders({
    subaccountOwner: context.subaccount.address,
    subaccountName: context.subaccount.name,
    chainId: context.primaryChain.id,
    productIds: [modifyOrderParams.productId],
    digests: [modifyOrderParams.digest],
  });
  if (cancelResult.status !== 'success') {
    throw new Error('Could not cancel current trigger order');
  }

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
    amount: currentOrder.order.amount.toString(),
    expiration: currentOrder.order.expiration.toString(),
  };

  const nonce = getTriggerOrderNonce(recvTime);
  const placeResult = await context.vertexClient.market.placeTriggerOrder({
    chainId: context.primaryChain.id,
    productId: modifyOrderParams.productId,
    triggerCriteria: {
      type: currentOrder.order.triggerCriteria.type,
      triggerPrice: modifyOrderParams.newPrice.toString(),
    },
    order,
    nonce,
  });
  if (placeResult.status !== 'success') {
    throw new Error('Could not place new trigger order');
  }

  // placeTriggerOrder does not currently return the digest so we compute it locally
  const digest = getOrderDigest({
    order: {
      ...order,
      nonce,
    },
    verifyingAddr,
    chainId: context.primaryChain.id,
  });
  return { digest };
}
