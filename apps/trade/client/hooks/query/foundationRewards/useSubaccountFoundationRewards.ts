import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  QueryDisabledError,
  createQueryKey,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function subaccountFoundationRewardsQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
) {
  return createQueryKey('subaccountFoundationRewards', chainEnv, sender);
}

export function useSubaccountFoundationRewards() {
  const {
    currentSubaccount: { address, chainEnv },
  } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;
  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: subaccountFoundationRewardsQueryKey(chainEnv, addressForQuery),
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
