import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

function engineStatusQueryKey(chainEnv?: ChainEnv) {
  return ['engineStatus', chainEnv];
}

export function useEngineStatus() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: engineStatusQueryKey(primaryChainEnv),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.engineClient.getStatus();
    },
    enabled: !disabled,
    // 1 min refresh
    refetchInterval: 60000,
  });
}
