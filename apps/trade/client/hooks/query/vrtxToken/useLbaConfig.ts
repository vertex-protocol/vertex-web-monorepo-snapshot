import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useIsChainEnvType,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function lbaConfigQueryKey() {
  return createQueryKey('lbaConfig');
}

export function useLbaConfig() {
  const { isArb } = useIsChainEnvType();
  const vertexClient = usePrimaryChainVertexClient();

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
