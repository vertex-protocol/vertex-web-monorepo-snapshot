import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { first } from 'lodash';

export function subaccountCreationTimeQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountCreationTime',
    chainEnv,
    subaccountOwner,
    subaccountName,
  );
}

/**
 * Returns the creation time for the subaccount, indicated by the time of the first
 * deposit or quote transfer event. Data is null if the subaccount does not exist.
 */
export function useSubaccountCreationTime() {
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
    queryKey: subaccountCreationTimeQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const events = await vertexClient.context.indexerClient.getEvents({
        subaccount: {
          subaccountOwner,
          subaccountName,
        },
        limit: {
          type: 'events',
          value: 1,
        },
        desc: false,
        eventTypes: ['deposit_collateral', 'transfer_quote'],
      });

      // Return a number instead of `BigDecimal`, as `BigDecimal` is not a stable reference when used in `useMemo` dependencies, which can cause unnecessary re-computations.
      return first(events)?.timestamp.toNumber() ?? null;
    },
    enabled: !disabled,
    refetchInterval: (data) => {
      // If a subaccount is not yet created, refetch at some interval, but if we already have data, then the creation
      // time will not change, so we don't need to refetch
      return data == null ? 30000 : false;
    },
  });
}
