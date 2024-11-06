import { useQuery } from '@tanstack/react-query';
import { toBigDecimal } from '@vertex-protocol/utils';
import {
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function useNSubmissions() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['nSubmissions', primaryChainEnv],
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
