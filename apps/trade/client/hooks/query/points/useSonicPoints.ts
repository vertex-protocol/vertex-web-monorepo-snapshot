import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useIsChainEnvType,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function sonicPointsQueryKey(sender?: string) {
  return createQueryKey('sonicPoints', sender);
}

export function useSonicPoints() {
  const vertexClient = usePrimaryChainVertexClient();
  const { currentSubaccount } = useSubaccountContext();
  const { isSonic } = useIsChainEnvType();

  const addressForQuery =
    currentSubaccount.address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  const disabled = !vertexClient || !isSonic;

  return useQuery({
    queryKey: sonicPointsQueryKey(addressForQuery),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getSonicPoints({
        address: addressForQuery,
      });
    },
    enabled: !disabled,
    refetchInterval: 60000,
  });
}
