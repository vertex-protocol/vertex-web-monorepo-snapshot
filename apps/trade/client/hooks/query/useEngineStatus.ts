import { useQuery } from '@tanstack/react-query';
import {
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

function engineStatusQueryKey(chainId?: PrimaryChainID) {
  return ['engineStatus', chainId];
}

export function useEngineStatus() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: engineStatusQueryKey(primaryChainId),
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
