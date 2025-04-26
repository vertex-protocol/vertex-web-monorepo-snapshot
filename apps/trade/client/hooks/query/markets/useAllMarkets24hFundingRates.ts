import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { MarketFilter } from 'client/types/MarketFilter';

export function allMarkets24hFundingRatesQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[],
) {
  return createQueryKey('allMarkets24hFundingRates', chainEnv, productIds);
}

const PERP_MARKET_FILTER: MarketFilter = {
  marketCategory: 'perp',
};

export function useAllMarkets24hFundingRates() {
  const vertexClient = usePrimaryChainVertexClient();
  const { primaryChainEnv } = useEVMContext();
  const { filteredProductIds } = useFilteredMarkets(PERP_MARKET_FILTER);

  const disabled = !vertexClient || !filteredProductIds.length;

  return useQuery({
    queryKey: allMarkets24hFundingRatesQueryKey(
      primaryChainEnv,
      filteredProductIds,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.market.getMultiProductFundingRates({
        productIds: filteredProductIds,
      });
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
