import { useQuery } from '@tanstack/react-query';
import { GetIndexerMultiSubaccountSnapshotsParams } from '@vertex-protocol/client';
import { IndexerSubaccountSnapshot } from '@vertex-protocol/indexer-client';
import { nowInSeconds } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { ZeroAddress } from 'ethers';
import { get } from 'lodash';

export function subaccountIndexerSnapshotsQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  secondsBeforeNow?: number[],
) {
  return createQueryKey(
    'subaccountIndexerSnapshots',
    chainId,
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
  const primaryChainId = usePrimaryChainId();
  const {
    currentSubaccount: { name: subaccountName, address: subaccountOwner },
  } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  // If no current subaccount, query for a subaccount that does not exist to ensure that we have data
  const subaccountOwnerForQuery = subaccountOwner ?? ZeroAddress;

  const disabled = !vertexClient || !secondsBeforeNow?.length;

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
      primaryChainId,
      subaccountOwnerForQuery,
      subaccountName,
      secondsBeforeNow,
    ),
    queryFn,
    enabled: !disabled,
    refetchInterval: refetchInterval ?? 10000,
    select,
  });
}
