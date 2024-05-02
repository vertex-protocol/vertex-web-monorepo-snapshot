import { useQuery } from '@tanstack/react-query';
import { toBigDecimal } from '@vertex-protocol/utils';
import { usePrimaryChainId, useVertexClient } from '@vertex-protocol/web-data';

import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function useNSubmissions() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
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
