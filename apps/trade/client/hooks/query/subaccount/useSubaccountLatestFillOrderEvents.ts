import { useQuery } from '@tanstack/react-query';
import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function subaccountLatestFillOrderEventsQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'latestFillOrderEvents',
    chainId,
    subaccountOwner,
    subaccountName,
  );
}

/**
 * Latest 10 fill order events for the current subaccount.
 */
export function useSubaccountLatestFillOrderEvents() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;

  return useQuery({
    queryKey: subaccountLatestFillOrderEventsQueryKey(
      primaryChainId,
      subaccountOwner,
      subaccountName,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const params: GetIndexerSubaccountMatchEventParams = {
        subaccountOwner,
        subaccountName,
        limit: 10,
      };
      return vertexClient.context.indexerClient.getPaginatedSubaccountMatchEvents(
        params,
      );
    },
    enabled: !disabled,
    refetchInterval: 5000,
  });
}
