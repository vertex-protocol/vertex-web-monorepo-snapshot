import { useQuery } from '@tanstack/react-query';
import {
  PrimaryChainID,
  QueryDisabledError,
  createQueryKey,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';

export function subaccountFoundationRewardsQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
) {
  return createQueryKey('subaccountFoundationRewards', chainId, sender);
}

export function useSubaccountFoundationRewards() {
  const primaryChainId = usePrimaryChainId();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;
  const addressForQuery =
    currentSubaccount.address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  return useQuery({
    queryKey: subaccountFoundationRewardsQueryKey(
      primaryChainId,
      addressForQuery,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getFoundationTakerRewards({
        address: addressForQuery,
      });
    },
    enabled: !disabled,
  });
}
