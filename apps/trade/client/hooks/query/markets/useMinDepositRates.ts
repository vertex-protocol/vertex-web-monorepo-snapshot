import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function minDepositRatesQueryKey(chainEnv?: ChainEnv) {
  return createQueryKey('minDepositRates', chainEnv);
}

export function useMinDepositRates() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: minDepositRatesQueryKey(primaryChainEnv),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.engineClient.getMinDepositRates();
    },
    enabled: !disabled,
    refetchInterval: 60000,
  });
}
