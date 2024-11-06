import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function addressTakerRewardsQueryKey(sender?: string) {
  return createQueryKey('addressTakerRewards', sender);
}

export function useAddressTakerRewards() {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;
  const addressForQuery =
    currentSubaccount.address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

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
