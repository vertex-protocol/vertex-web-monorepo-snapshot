import { useQuery } from '@tanstack/react-query';
import { BigDecimal, ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useVertexClientContext,
  getRecordKeyedByChainEnvWithEdge,
} from '@vertex-protocol/react-client';

export function useQueryEdgeInsuranceFunds() {
  const { vertexClientsByChainEnv } = useVertexClientContext();
  const disabled = !vertexClientsByChainEnv;

  return useQuery({
    queryKey: createQueryKey('insuranceFunds'),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const insuranceByChainEnv: Record<ChainEnv, BigDecimal | undefined> =
        getRecordKeyedByChainEnvWithEdge(undefined);

      const insuranceFundsPromises = Object.values(vertexClientsByChainEnv).map(
        async ({ chainEnv, client }) => {
          const insurance = await client.context.engineClient.getInsurance();

          return {
            chainEnv,
            insurance,
          };
        },
      );

      const insuranceFundsResults = await Promise.all(insuranceFundsPromises);

      insuranceFundsResults.forEach(({ chainEnv, insurance }) => {
        insuranceByChainEnv[chainEnv] = insurance;
      });

      return insuranceByChainEnv;
    },
    enabled: !disabled,
  });
}
