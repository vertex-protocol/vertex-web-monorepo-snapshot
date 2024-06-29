import { useQuery } from '@tanstack/react-query';
import {
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function serverTimeQueryKey() {
  return ['serverTime'];
}

/**
 * Query for server time that refreshes every 5 seconds.
 */
export function useServerTime() {
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: serverTimeQueryKey(),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.engineClient.getTime();
    },
    enabled: !disabled,
    refetchInterval: 5000,
  });
}
