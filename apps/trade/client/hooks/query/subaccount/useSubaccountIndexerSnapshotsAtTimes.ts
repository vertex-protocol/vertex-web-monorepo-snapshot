import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  GetIndexerMultiSubaccountSnapshotsParams,
} from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { get } from 'lodash';
import { zeroAddress } from 'viem';

export function subaccountIndexerSnapshotsAtTimesQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  timestampsInSeconds?: number[],
) {
  return createQueryKey(
    'subaccountIndexerSnapshotsAtTimes',
    chainEnv,
    subaccountOwner,
    subaccountName,
    timestampsInSeconds,
  );
}

/**
 * Fetches subaccount snapshots for the specified times. This should be used CAREFULLY as the array of timestamps
 * must be stable to prevent excessive refetching.
 */
export function useSubaccountIndexerSnapshotsAtTimes(
  timestampsInSeconds: number[],
) {
  const {
    currentSubaccount: {
      name: subaccountName,
      address: subaccountOwner,
      chainEnv,
    },
  } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  // If no current subaccount, query for a subaccount that does not exist to ensure that we have data
  const subaccountOwnerForQuery = subaccountOwner ?? zeroAddress;

  const disabled = !vertexClient || !timestampsInSeconds?.length;

  const queryFn = async () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const params: GetIndexerMultiSubaccountSnapshotsParams = {
      subaccounts: [
        {
          subaccountOwner: subaccountOwnerForQuery,
          subaccountName,
        },
      ],
      timestamps: timestampsInSeconds,
    };

    const response =
      await vertexClient.context.indexerClient.getMultiSubaccountSnapshots(
        params,
      );

    // We have the invariant that we always query for 1 subaccount, so this is safe
    const subaccountHexId = response.subaccountHexIds[0];
    const snapshotsForSubaccount = get(
      response.snapshots,
      subaccountHexId,
      undefined,
    );

    // Return an array of balance snapshots in the same order as the timestamps
    // If backend is correct, then the nonNullFilter should never be hit
    return timestampsInSeconds
      .map((timestamp) => snapshotsForSubaccount?.[timestamp])
      .filter(nonNullFilter);
  };

  return useQuery({
    queryKey: subaccountIndexerSnapshotsAtTimesQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
      timestampsInSeconds,
    ),
    queryFn,
    enabled: !disabled,
    // With the same timestamps, data should never change
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
