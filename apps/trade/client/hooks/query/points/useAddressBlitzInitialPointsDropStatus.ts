import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useIsChainType,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function addressBlitzInitialPointsDropStatusQueryKey(sender?: string) {
  return createQueryKey('addressBlitzInitialPointsDropStatus', sender);
}

export function useAddressBlitzInitialPointsDropStatus() {
  const { isBlast } = useIsChainType();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !isBlast;
  const addressForQuery =
    currentSubaccount.address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressBlitzInitialPointsDropStatusQueryKey(addressForQuery),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getBlitzInitialDropConditions({
        address: addressForQuery,
      });
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
