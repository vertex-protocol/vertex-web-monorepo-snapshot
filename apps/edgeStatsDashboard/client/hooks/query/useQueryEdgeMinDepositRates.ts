import { useQuery } from '@tanstack/react-query';
import { BigDecimal, ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useVertexClientContext,
} from '@vertex-protocol/react-client';
import { getRecordKeyedByChainEnvWithEdge } from 'client/hooks/utils';
import { mapValues } from 'lodash';

export function useQueryEdgeMinDepositRates() {
  const { vertexClientsByChainEnv } = useVertexClientContext();
  const disabled = !vertexClientsByChainEnv;

  return useQuery({
    queryKey: createQueryKey('edgeMinDepositRates'),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const minDepositRatePromises = Object.values(vertexClientsByChainEnv).map(
        async ({ chainEnv, client }) => {
          const minDepositRates =
            await client.context.engineClient.getMinDepositRates();

          return {
            chainEnv,
            minDepositRates: mapValues(
              minDepositRates.minDepositRates,
              ({ minDepositRate }) => minDepositRate,
            ),
          };
        },
      );

      const minDepositRatesByChainEnv: Record<
        ChainEnv,
        Record<number, BigDecimal>
      > = getRecordKeyedByChainEnvWithEdge({});

      const minDepositRatesResults = await Promise.all(minDepositRatePromises);

      minDepositRatesResults.forEach(({ chainEnv, minDepositRates }) => {
        minDepositRatesByChainEnv[chainEnv] = minDepositRates;
      });

      return minDepositRatesByChainEnv;
    },
    enabled: !disabled,
  });
}
