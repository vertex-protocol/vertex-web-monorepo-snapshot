import { QueryClient } from '@tanstack/react-query';
import { EnginePriceTickLiquidity } from '@vertex-protocol/engine-client';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';
import { PrimaryChainID } from '@vertex-protocol/react-client';
import {
  LatestOrderFill,
  latestOrderFillsForProductQueryKey,
} from 'client/hooks/query/markets/useLatestOrderFillsForProduct';
import {
  MarketLiquidityData,
  marketLiquidityQueryKey,
} from 'client/hooks/query/markets/useMarketLiquidity';
import {
  BatchBookDepthUpdateData,
  BatchMarketTradeUpdateData,
} from 'client/modules/trading/websockets/types';
import { first, random } from 'lodash';

function updateBookTicks(
  prevTicks: EnginePriceTickLiquidity[],
  updates: EnginePriceTickLiquidity[],
  isBid: boolean,
): EnginePriceTickLiquidity[] {
  const ticks = [...prevTicks];
  updates.forEach((update) => {
    const existingTick = ticks.find((tick) => tick.price.eq(update.price));
    if (existingTick) {
      existingTick.liquidity = update.liquidity;
    } else {
      // This is out of order, but we're sorting at the end
      ticks.push(update);
    }
  });

  return (
    ticks
      // Filter ticks that are now gone
      .filter((tick) => tick.liquidity.gt(0))
      .sort((a, b) => {
        // Bids in descending, asks in ascending, so flip the comparison if bid
        const multiplier = isBid ? -1 : 1;
        return a.price.comparedTo(b.price) * multiplier;
      })
  );
}

export function handleBatchedMarketTradeEvents(
  chainId: PrimaryChainID,
  batchedUpdateData: BatchMarketTradeUpdateData,
  productId: number,
  queryClient: QueryClient,
) {
  const hasUpdates = batchedUpdateData.length > 0;
  if (!hasUpdates) {
    return;
  }

  // The unfortunate thing here is that if a fetch happens in the useLatestOrderFills query, the more up to date data (from WS)
  // will be wiped out. Indexer is always _slightly_ behind WS, so it's going to miss the latest fill.
  queryClient.setQueriesData<LatestOrderFill[]>(
    {
      queryKey: latestOrderFillsForProductQueryKey(chainId, productId),
    },
    (prev) => {
      if (!prev) {
        // Skip updates if there's no previous data
        return prev;
      }

      const newFills = batchedUpdateData.map((event): LatestOrderFill => {
        return {
          // Subscription events don't give digest / submission index, so use JSON of the entire event - this should be unique in most circumstances
          // but there are noticeable cases where these are the same, so prefix with a random number
          id: `${random(0, 100)}_${JSON.stringify(event)}`,
          // Adjust to negative amount if the taker is the seller
          amount: toBigDecimal(event.taker_qty).multipliedBy(
            event.is_taker_buyer ? 1 : -1,
          ),
          price: fromX18(event.price),
          // Event timestamp is in nanoseconds, so convert to seconds to be the same as order fills REST API data
          timestamp: toBigDecimal(event.timestamp).div(1e9).toNumber(),
        };
      });

      // Trim the earliest and add the latest - data is in descending order
      return [...newFills, ...prev.slice(0, -1 * newFills.length)];
    },
  );
}

export function handleBatchedBookDepthEvents(
  chainId: PrimaryChainID,
  batchedUpdateData: BatchBookDepthUpdateData,
  productId: number,
  queryClient: QueryClient,
) {
  const bidUpdateEvents = Object.values(batchedUpdateData.bids);
  const askUpdateEvents = Object.values(batchedUpdateData.asks);

  const hasUpdates = bidUpdateEvents.length > 0 || askUpdateEvents.length > 0;
  if (!hasUpdates) {
    return;
  }

  queryClient.setQueriesData<MarketLiquidityData>(
    {
      queryKey: marketLiquidityQueryKey(true, chainId, productId),
    },
    (prev) => {
      if (!prev) {
        // Skip updates if there's no previous data
        return prev;
      }

      const bidUpdates: EnginePriceTickLiquidity[] = bidUpdateEvents.map(
        ([priceX18, size]): EnginePriceTickLiquidity => {
          return {
            price: fromX18(priceX18),
            liquidity: toBigDecimal(size),
          };
        },
      );
      const askUpdates: EnginePriceTickLiquidity[] = askUpdateEvents.map(
        ([priceX18, size]): EnginePriceTickLiquidity => {
          return {
            price: fromX18(priceX18),
            liquidity: toBigDecimal(size),
          };
        },
      );

      const newBids = updateBookTicks(prev.bids, bidUpdates, true);
      const newAsks = updateBookTicks(prev.asks, askUpdates, false);

      // Sanity check for crossed book, in case of existing stale query data
      const firstBid = first(newBids);
      const firstAsk = first(newAsks);
      if (firstBid && firstAsk && firstBid.price.gt(firstAsk.price)) {
        console.warn(
          '[useTradingWebsocketSubscriptions] Encountered crossed book, invalidating queries',
          productId,
        );
        queryClient.invalidateQueries(
          {
            queryKey: marketLiquidityQueryKey(true, chainId, productId),
          },
          {
            // This guards against multiple overriding invalidations when fast websocket updates occur and book is
            // out of sync. If the underlying REST query is slow to update query data, then invalidation will occur multiple
            // times. This skips subsequent invalidation calls
            cancelRefetch: false,
          },
        );
        return;
      }

      return {
        bids: newBids,
        asks: newAsks,
      };
    },
  );
}
