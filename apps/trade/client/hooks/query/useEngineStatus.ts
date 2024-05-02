import { useQuery } from '@tanstack/react-query';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import {
  PrimaryChainID,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';

function engineStatusQueryKey(chainId?: PrimaryChainID) {
  return ['engineStatus', chainId];
}

export function useEngineStatus() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
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
