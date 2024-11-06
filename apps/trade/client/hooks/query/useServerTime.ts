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

      const timeOfRequestMillis = Date.now();
      const serverTimeMillis =
        await vertexClient.context.engineClient.getTime();
      return {
        serverTimeMillis,
        latencyMillis: Date.now() - timeOfRequestMillis,
      };
    },
    enabled: !disabled,
    refetchInterval: 5000,
  });
}
