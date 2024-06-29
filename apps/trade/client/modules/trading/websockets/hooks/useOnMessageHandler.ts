import { useQueryClient } from '@tanstack/react-query';
import { EngineServerSubscriptionBookDepthEvent } from '@vertex-protocol/client';
import {
  EngineServerPriceTickLiquidity,
  EngineServerSubscriptionTradeEvent,
} from '@vertex-protocol/engine-client';
import { usePrimaryChainId } from '@vertex-protocol/react-client';
import {
  BatchBookDepthUpdateData,
  BatchMarketTradeUpdateData,
} from 'client/modules/trading/websockets/types';
import {
  handleBatchedBookDepthEvents,
  handleBatchedMarketTradeEvents,
} from 'client/modules/trading/websockets/utils/eventHandlers';
import { useCallback, useEffect, useRef } from 'react';

interface Params {
  productId?: number;
}

export function useOnMessageHandler({ productId }: Params) {
  const primaryChainId = usePrimaryChainId();
  const queryClient = useQueryClient();

  // Chunk updates to be processed in batches. Backend can issue updates as frequently as 50ms, and we don't want to run
  // computations every time.
  const batchedBookDepthEventsRef = useRef<BatchBookDepthUpdateData>({
    // This uses a mapping so that subsequent updates in the SAME batch overwrite previous ones of the same price
    // This helps to lower computation
    bids: {},
    asks: {},
  });
  const batchedTradeEventsRef = useRef<BatchMarketTradeUpdateData>([]);

  // Process batches handler
  const processBatches = useCallback(() => {
    if (!productId) {
      return;
    }

    const batchedBookDepthEvents = batchedBookDepthEventsRef.current;
    const batchedTradeEvents = batchedTradeEventsRef.current;

    // Clear first, then process (because processing might take a while)
    batchedBookDepthEventsRef.current = {
      bids: {},
      asks: {},
    };
    batchedTradeEventsRef.current = [];

    handleBatchedBookDepthEvents(
      primaryChainId,
      batchedBookDepthEvents,
      productId,
      queryClient,
    );
    handleBatchedMarketTradeEvents(
      primaryChainId,
      batchedTradeEvents,
      productId,
      queryClient,
    );
  }, [primaryChainId, productId, queryClient]);

  // Clear batches on product ID change
  useEffect(() => {
    batchedBookDepthEventsRef.current = {
      bids: {},
      asks: {},
    };
    batchedTradeEventsRef.current = [];
  }, [productId]);

  // Clear batches on an interval
  useEffect(() => {
    const interval = setInterval(() => {
      processBatches();
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [processBatches]);

  // Single event handlers
  const handleBookDepthEvent = useCallback(
    (event: EngineServerSubscriptionBookDepthEvent) => {
      if (!productId) {
        return;
      }
      event.bids.forEach((bid: EngineServerPriceTickLiquidity) => {
        const [priceX18] = bid;
        batchedBookDepthEventsRef.current.bids[priceX18] = bid;
      });
      event.asks.forEach((ask: EngineServerPriceTickLiquidity) => {
        const [priceX18] = ask;
        batchedBookDepthEventsRef.current.asks[priceX18] = ask;
      });
    },
    [productId],
  );

  const handleMarketTradeEvent = useCallback(
    (event: EngineServerSubscriptionTradeEvent) => {
      if (!productId) {
        return;
      }
      // Add to beginning so that the array remains in descending chronological order
      batchedTradeEventsRef.current.unshift(event);
    },
    [productId],
  );

  // Message handler simply adds to batches
  return useCallback(
    (event: MessageEvent<any>) => {
      let data: any | undefined;
      try {
        data = JSON.parse(event.data);
      } catch (err) {
        console.error(
          '[useTradingWebsocketSubscriptions] Error parsing WS message',
          err,
        );
      }
      if (!productId || data?.product_id !== productId) {
        return;
      }

      switch (data?.type) {
        case 'book_depth': {
          handleBookDepthEvent(data);
          break;
        }
        case 'trade': {
          handleMarketTradeEvent(data);
          break;
        }
      }
    },
    [handleBookDepthEvent, handleMarketTradeEvent, productId],
  );
}
