import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';

export function allMarkets24hFundingRatesQueryKey() {
  return createQueryKey('allMarkets24hFundingRates');
}

export function useQueryAllMarkets24hFundingRates() {
  const { data: allEdgeMarketsData } = useQueryAllEdgeMarkets();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !allEdgeMarketsData;

  return useQuery({
    queryKey: allMarkets24hFundingRatesQueryKey(),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.market.getMultiProductFundingRates({
        productIds: allEdgeMarketsData.perpMarketsProductIds,
      });
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
