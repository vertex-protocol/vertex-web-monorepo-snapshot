import { QueryObserverOptions, useQueryClient } from '@tanstack/react-query';
import { ENGINE_WS_SUBSCRIPTION_CLIENT_ENDPOINTS } from '@vertex-protocol/engine-client';
import { useEVMContext, useVertexClient } from '@vertex-protocol/web-data';
import { useDocumentVisibility } from 'ahooks';
import { latestOrderFillsForProductQueryKey } from 'client/hooks/query/markets/useLatestOrderFillsForProduct';
import { marketLiquidityQueryKey } from 'client/hooks/query/markets/useMarketLiquidity';
import { useHandleProductIdChange } from 'client/modules/trading/websockets/hooks/useHandleProductIdChange';
import { useOnMessageHandler } from 'client/modules/trading/websockets/hooks/useOnMessageHandler';
import { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export function useTradingWebsocketSubscriptions(productId?: number) {
  const { primaryChainEnv } = useEVMContext();
  const queryClient = useQueryClient();
  const vertexClient = useVertexClient();

  const wsEndpoint = useMemo(() => {
    return ENGINE_WS_SUBSCRIPTION_CLIENT_ENDPOINTS[primaryChainEnv];
  }, [primaryChainEnv]);

  const isReady = !!productId && !!vertexClient;
  const onMessage = useOnMessageHandler({ productId });

  // Terminate WS subscriptions if tab is in background for an extended period of time
  const [enableWebsocket, setEnableWebsocket] = useState(true);
  const documentVisibility = useDocumentVisibility();
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (documentVisibility === 'hidden') {
      timeout = setTimeout(() => {
        setEnableWebsocket(false);
        // 5min timeout
      }, 5 * 60000);
    } else {
      setEnableWebsocket(true);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [documentVisibility]);

  const { sendMessage, readyState } = useWebSocket(
    wsEndpoint,
    {
      onMessage,
      shouldReconnect: () => {
        return true;
      },
      // No limit on attempts
      reconnectAttempts: Infinity,
      reconnectInterval: (attemptNumber) => {
        /**
         * attemptNumber will be 0 the first time it attempts to reconnect,
         * so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds,
         * and then caps at 10 seconds until the maximum number of attempts is reached
         */
        if (attemptNumber > 3) {
          return 10000;
        }
        return Math.pow(2, attemptNumber) * 1000;
      },
      /**
       * This filters out all updates for tracked state variables from useWebSocket (ex. lastMessage)
       * This does not affect the onMessage handler. Without this, state changes will force surrounding
       * components to rerender, which leads to unnecessary rerenders.
       */
      filter: () => false,
    },
    isReady && enableWebsocket,
  );

  const isActiveWebsocket = readyState === ReadyState.OPEN;

  // Default queries to fast refetch when not connected
  useEffect(() => {
    const queryOptions: Partial<QueryObserverOptions> = isActiveWebsocket
      ? {
          staleTime: Infinity,
          refetchInterval: false,
        }
      : {
          staleTime: 5000,
          refetchInterval: 5000,
        };

    queryClient.setQueryDefaults(marketLiquidityQueryKey(true), queryOptions);
    queryClient.setQueryDefaults(
      latestOrderFillsForProductQueryKey(),
      queryOptions,
    );
  }, [isActiveWebsocket, queryClient]);

  // Handle product ID change effects
  useHandleProductIdChange({
    productId,
    isActiveWebsocket,
    sendMessage,
  });
}
