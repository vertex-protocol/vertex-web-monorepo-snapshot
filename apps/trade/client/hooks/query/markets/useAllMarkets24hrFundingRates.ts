import { useQuery } from '@tanstack/react-query';
import {
  PrimaryChainID,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { MarketFilter } from 'client/types/MarketFilter';
import { ProductEngineType } from '@vertex-protocol/contracts';

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
  const vertexClient = useVertexClient();
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
