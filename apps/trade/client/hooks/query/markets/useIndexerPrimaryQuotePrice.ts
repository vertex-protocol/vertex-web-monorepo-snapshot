import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function useIndexerPrimaryQuotePrice() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: createQueryKey('primaryQuotePrice', primaryChainEnv),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getQuotePrice();
    },
    enabled: !disabled,
  });
}
