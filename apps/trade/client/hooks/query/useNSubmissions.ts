import { useQuery } from '@tanstack/react-query';
import { toBigDecimal } from '@vertex-protocol/utils';
import {
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function useNSubmissions() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['nSubmissions', primaryChainId],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return toBigDecimal(
        await vertexClient.context.contracts.endpoint.nSubmissions(),
      );
    },
    enabled: !disabled,
    // `nSubmissions` is only updated every minute.
    refetchInterval: 60000,
  });
}
