import { useQuery } from '@tanstack/react-query';
import { GetEngineMarketLiquidityResponse } from '@vertex-protocol/engine-client';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { QueryState } from 'client/types/QueryState';

interface Params {
  productId?: number;
  includeWebsocketUpdates: boolean;
}

export type MarketLiquidityData = GetEngineMarketLiquidityResponse;

export function marketLiquidityQueryKey(
  includeWebsocketUpdates: boolean,
  chainId?: PrimaryChainID,
  productId?: number,
) {
  return createQueryKey(
    includeWebsocketUpdates ? 'marketLiquidityWs' : 'marketLiquidity',
    chainId,
    productId,
  );
}

/**
 * Fetches liquidity at each price tick up to the given depth per side of the book.
 * The depth is specified in multiples of the `priceIncrement` for the market.
 *
 * The data returned behaves as follows:
 * - If there are ticks with no liquidity, these are not returned
 * - If we've traversed the entire side of the book, no additional ticks are returned
 */
export function useMarketLiquidity({
  productId,
  includeWebsocketUpdates,
}: Params): QueryState<MarketLiquidityData> {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient || !productId;
  return useQuery({
    queryKey: marketLiquidityQueryKey(
      includeWebsocketUpdates,
      primaryChainId,
      productId,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient?.market.getMarketLiquidity({
        productId: productId ?? 0,
        // Backend returns a max depth of 100, to prevent excessive queries from different depths, we hardcode it here
        depth: 100,
      });
    },
    enabled: !disabled,
    // Refetch intervals are handled in useTradingWebsocketSubscriptions when websockets are enabled
    // IMPORTANT: If this is ever used outside of a trading page, we need to add refetch interval to params
    refetchInterval: includeWebsocketUpdates ? undefined : 10000,
  });
}
