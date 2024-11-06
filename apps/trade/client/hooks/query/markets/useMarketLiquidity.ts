import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetEngineMarketLiquidityResponse } from '@vertex-protocol/engine-client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
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
  chainEnv?: ChainEnv,
  productId?: number,
) {
  return createQueryKey(
    includeWebsocketUpdates ? 'marketLiquidityWs' : 'marketLiquidity',
    chainEnv,
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
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient || !productId;
  return useQuery({
    queryKey: marketLiquidityQueryKey(
      includeWebsocketUpdates,
      primaryChainEnv,
      productId,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient?.market.getMarketLiquidity({
        productId,
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
