import { useQuery } from '@tanstack/react-query';
import { usePrimaryChainId, useVertexClient } from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function useIndexerQuotePrice() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['quotePrice', primaryChainId],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getQuotePrice();
    },
    enabled: !disabled,
  });
}
