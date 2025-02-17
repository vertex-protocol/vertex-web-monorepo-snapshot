import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function useQueryPrimaryQuotePrice() {
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: createQueryKey('primaryQuotePrice'),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getQuotePrice();
    },
    enabled: !disabled,
  });
}
