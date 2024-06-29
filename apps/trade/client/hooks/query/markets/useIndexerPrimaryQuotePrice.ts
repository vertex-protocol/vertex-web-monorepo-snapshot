import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function useIndexerPrimaryQuotePrice() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: createQueryKey('primaryQuotePrice', primaryChainId),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getQuotePrice();
    },
    enabled: !disabled,
  });
}
