import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function addressTakerRewardsQueryKey(sender?: string) {
  return createQueryKey('addressTakerRewards', sender);
}

export function useAddressTakerRewards() {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = useVertexClient();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const disabled = !vertexClient || !enableSubaccountQueries;
  const addressForQuery =
    currentSubaccount.address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressTakerRewardsQueryKey(addressForQuery),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getTakerRewards({
        address: addressForQuery,
      });
    },
    enabled: !disabled,
  });
}
