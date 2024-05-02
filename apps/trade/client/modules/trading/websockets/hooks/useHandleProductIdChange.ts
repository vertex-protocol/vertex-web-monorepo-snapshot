import { useQueryClient } from '@tanstack/react-query';
import { usePrimaryChainId, useVertexClient } from '@vertex-protocol/web-data';
import { latestOrderFillsForProductQueryKey } from 'client/hooks/query/markets/useLatestOrderFillsForProduct';
import { marketLiquidityQueryKey } from 'client/hooks/query/markets/useMarketLiquidity';
import {
  getBookDepthSubscriptionParams,
  getMarketTradeSubscriptionParams,
} from 'client/modules/trading/websockets/utils/subscriptionParams';
import { useEffect } from 'react';
import { SendMessage } from 'react-use-websocket';

interface Params {
  productId?: number;
  isActiveWebsocket: boolean;
  sendMessage: SendMessage;
}

export function useHandleProductIdChange({
  isActiveWebsocket,
  productId,
  sendMessage,
}: Params) {
  const primaryChainId = usePrimaryChainId();
  const queryClient = useQueryClient();
  const vertexClient = useVertexClient();

  useEffect(() => {
    if (!isActiveWebsocket || !vertexClient || !productId) {
      return;
    }

    // When switching between products, the old query data is stale, so invalidate the relevant queries
    queryClient.invalidateQueries({
      queryKey: marketLiquidityQueryKey(true, primaryChainId, productId),
    });
    queryClient.invalidateQueries({
      queryKey: latestOrderFillsForProductQueryKey(primaryChainId, productId),
    });

    const bookDepthParams = getBookDepthSubscriptionParams(
      vertexClient,
      productId,
    );
    const marketTradeParams = getMarketTradeSubscriptionParams(
      vertexClient,
      productId,
    );

    // Subscribe
    const subscribeMsgs = [
      vertexClient.ws.subscription.buildSubscriptionMessage(
        0,
        'subscribe',
        bookDepthParams,
      ),
      vertexClient.ws.subscription.buildSubscriptionMessage(
        0,
        'subscribe',
        marketTradeParams,
      ),
    ];
    subscribeMsgs.forEach((msg) => {
      sendMessage(JSON.stringify(msg));
    });

    // Unsubscribe to cleanup
    return () => {
      if (!isActiveWebsocket) {
        return;
      }
      const unsubscribeMsgs = [
        vertexClient.ws.subscription.buildSubscriptionMessage(
          0,
          'unsubscribe',
          bookDepthParams,
        ),
        vertexClient.ws.subscription.buildSubscriptionMessage(
          0,
          'unsubscribe',
          marketTradeParams,
        ),
      ];
      unsubscribeMsgs.forEach((msg) => {
        sendMessage(JSON.stringify(msg));
      });
    };
  }, [
    isActiveWebsocket,
    primaryChainId,
    productId,
    queryClient,
    sendMessage,
    vertexClient,
  ]);
}
