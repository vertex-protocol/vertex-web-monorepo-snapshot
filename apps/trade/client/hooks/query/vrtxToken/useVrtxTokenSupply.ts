import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function vrtxTokenSupplyQueryKey() {
  return createQueryKey('vrtxTokenSupply');
}

interface Data {
  /**
   * Total supply without token decimals: i.e 1 = 1 VRTX
   */
  totalSupply: BigDecimal;
  /**
   * Circulating (liquid) supply without token decimals: i.e 1 = 1 VRTX
   */
  liquidSupply: BigDecimal;
}

export function useVrtxTokenSupply() {
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: vrtxTokenSupplyQueryKey(),
    queryFn: async (): Promise<Data> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const [totalSupply, circulatingSupply] = await Promise.all([
        vertexClient.context.indexerClient.getVrtxTokenInfo({
          tokenInfoType: 'total_supply',
        }),
        vertexClient.context.indexerClient.getVrtxTokenInfo({
          tokenInfoType: 'circulating_supply',
        }),
      ]);

      return {
        totalSupply: toBigDecimal(totalSupply),
        liquidSupply: toBigDecimal(circulatingSupply),
      };
    },
    enabled: !disabled,
    // No refetching needed as total supply is immutable and illiquid balances rarely change
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    refetchInterval: false,
  });
}
