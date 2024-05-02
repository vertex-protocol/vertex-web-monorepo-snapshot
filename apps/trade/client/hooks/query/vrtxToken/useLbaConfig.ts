import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function lbaConfigQueryKey() {
  return createQueryKey('lbaConfig');
}

export function useLbaConfig() {
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();

  const disabled = !vertexClient || !isArb;

  return useQuery({
    queryKey: lbaConfigQueryKey(),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.contracts.vrtxLba.getConfig();
    },
    enabled: !disabled,
    // No refetching needed as LBA config is immutable
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    refetchInterval: false,
  });
}
