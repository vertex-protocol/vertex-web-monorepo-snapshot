import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { get } from 'lodash';

interface TokenPair {
  pool_apy: number;
  product_id: number;
}

interface ElixirLpYieldData {
  data: {
    tvl_per_exchange: {
      VERTEX: {
        token_pairs: Record<string, TokenPair>;
      };
    };
  };
}

export function useElixirLpYields() {
  return useQuery({
    queryKey: ['elixirApyData'],
    queryFn: async () => {
      const baseResponse = await fetch(
        'https://metrics-api.trusted-mainnet.elixir.finance/metrics/apy',
      );
      const responseData: ElixirLpYieldData = await baseResponse.json();

      const elixirLpYieldData = get(
        responseData,
        'data.tvl_per_exchange.VERTEX.token_pairs',
        undefined,
      );

      if (!elixirLpYieldData) {
        console.error('[useElixirLpYields] Invalid data', responseData);
        throw new Error('Invalid elixir data');
      }

      const elixirLpYieldsByProductId = Object.values(elixirLpYieldData).reduce(
        (mapping, { pool_apy, product_id }) => {
          // Data is returned in percentages ie) 10.00%, dividing by 100 so we can format accordingly
          mapping[product_id] = toBigDecimal(pool_apy / 100);
          return mapping;
        },
        {} as Record<number, BigDecimal>,
      );
      return elixirLpYieldsByProductId;
    },
  });
}
