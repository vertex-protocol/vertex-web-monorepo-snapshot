import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function subaccountLatestFillOrderEventsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'latestFillOrderEvents',
    chainEnv,
    subaccountOwner,
    subaccountName,
  );
}

/**
 * Latest 10 fill order events for the current subaccount.
 */
export function useSubaccountLatestFillOrderEvents() {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: {
      address: subaccountOwner,
      name: subaccountName,
      chainEnv,
    },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;

  return useQuery({
    queryKey: subaccountLatestFillOrderEventsQueryKey(
      chainEnv,
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
