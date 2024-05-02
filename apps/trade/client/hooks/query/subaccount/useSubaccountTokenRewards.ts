import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function subaccountTokenRewardsQueryKey(sender?: string) {
  return createQueryKey('subaccountTokenRewards', sender);
}

// Address to use for rewards to get zeros returned when not connected, AddressZero does not work.
const NOT_CONNECTED_REWARDS_ADDRESS =
  '0xfffffffffffffffffffffffffffffffffffffffe';

export function useSubaccountTokenRewards() {
  const { isArb } = useIsChainType();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = useVertexClient();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  // Rewards on non-arb chains follow a points structure
  const disabled = !vertexClient || !isArb || !enableSubaccountQueries;
  const addressForQuery =
    currentSubaccount.address ?? NOT_CONNECTED_REWARDS_ADDRESS;

  return useQuery({
    queryKey: subaccountTokenRewardsQueryKey(addressForQuery),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getRewards({
        address: addressForQuery,
      });
    },
    enabled: !disabled,
  });
}
