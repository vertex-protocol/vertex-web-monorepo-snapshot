import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  GetIndexerMultiSubaccountSnapshotsParams,
} from '@vertex-protocol/client';
import { IndexerSubaccountSnapshot } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { nowInSeconds } from '@vertex-protocol/utils';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import { get } from 'lodash';
import { zeroAddress } from 'viem';

export function subaccountIndexerSnapshotsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  secondsBeforeNow?: number[],
) {
  return createQueryKey(
    'subaccountIndexerSnapshots',
    chainEnv,
    subaccountOwner,
    subaccountName,
    secondsBeforeNow,
  );
}

type Data = IndexerSubaccountSnapshot[];

interface Params<TSelectedData> {
  secondsBeforeNow?: number[];
  select?: (data: Data) => TSelectedData;
  refetchInterval?: number;
}

/**
 * Historical subaccount snapshots for multiple points in time
 */
export function useSubaccountIndexerSnapshots<TSelectedData = Data>({
  secondsBeforeNow,
  select,
  refetchInterval,
}: Params<TSelectedData>) {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'subaccountIndexerSnapshots',
    true,
  );
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

  const disabled = !vertexClient || !secondsBeforeNow?.length;
  const defaultRefetchInterval = subaccountOwner ? 30000 : undefined;

  const queryFn = async () => {
    if (disabled) {
      throw new QueryDisabledError();
    }
    const nowTime = nowInSeconds();
    const timestamps = secondsBeforeNow.map((seconds) => nowTime - seconds);
    const params: GetIndexerMultiSubaccountSnapshotsParams = {
      subaccounts: [
        {
          subaccountOwner: subaccountOwnerForQuery,
          subaccountName,
        },
      ],
      timestamps,
    };

    startProfiling();
    const response =
      await vertexClient.context.indexerClient.getMultiSubaccountSnapshots(
        params,
      );
    endProfiling();

    // We have the invariant that we always query for 1 subaccount, so this is safe
    const subaccountHexId = response.subaccountHexIds[0];
    const snapshotsForSubaccount = get(
      response.snapshots,
      subaccountHexId,
      undefined,
    );

    // Return an array of balance snapshots in the same order as the timestamps
    // If backend is correct, then the nonNullFilter should never be hit
    return timestamps
      .map((timestamp) => snapshotsForSubaccount?.[timestamp])
      .filter(nonNullFilter);
  };

  return useQuery({
    queryKey: subaccountIndexerSnapshotsQueryKey(
      chainEnv,
      subaccountOwnerForQuery,
      subaccountName,
      secondsBeforeNow,
    ),
    queryFn,
    enabled: !disabled,
    refetchInterval: refetchInterval ?? defaultRefetchInterval,
    select,
  });
}
