import { useQuery } from '@tanstack/react-query';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { MarketFilter } from 'client/types/MarketFilter';

export function allMarkets24HrFundingRatesQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
) {
  return createQueryKey('allMarkets24HrFundingRates', chainId, productIds);
}

const PERP_MARKET_FILTER: MarketFilter = {
  marketType: ProductEngineType.PERP,
};

export function useAllMarkets24HrFundingRates() {
  const vertexClient = usePrimaryChainVertexClient();
  const primaryChainId = usePrimaryChainId();
  const { filteredProductIds } = useFilteredMarkets(PERP_MARKET_FILTER);

  const disabled = !vertexClient || !filteredProductIds.length;

  return useQuery({
    queryKey: allMarkets24HrFundingRatesQueryKey(
      primaryChainId,
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
