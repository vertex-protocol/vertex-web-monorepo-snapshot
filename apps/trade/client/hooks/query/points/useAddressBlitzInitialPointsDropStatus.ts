import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function addressBlitzInitialPointsDropStatusQueryKey(sender?: string) {
  return createQueryKey('addressBlitzInitialPointsDropStatus', sender);
}

export function useAddressBlitzInitialPointsDropStatus() {
  const { isBlast } = useIsChainType();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = useVertexClient();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const disabled = !vertexClient || !enableSubaccountQueries || !isBlast;
  const addressForQuery =
    currentSubaccount.address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

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
