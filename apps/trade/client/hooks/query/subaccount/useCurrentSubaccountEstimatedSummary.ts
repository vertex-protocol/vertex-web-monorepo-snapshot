import { useQuery } from '@tanstack/react-query';
import {
  GetEngineEstimatedSubaccountSummaryParams,
  SubaccountTx,
} from '@vertex-protocol/engine-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

import {
  AnnotatedSubaccountSummary,
  annotateSubaccountSummary,
} from './annotateSubaccountSummary';
import { useDebounce } from 'ahooks';

export interface EstimateSubaccountStateChangeParams {
  estimateStateTxs: SubaccountTx[];
}

export function currentSubaccountEstimatedSummaryQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  estimateStateTxs?: SubaccountTx[],
) {
  return createQueryKey(
    'subaccountEstimatedSummary',
    chainId,
    subaccountOwner,
    subaccountName,
    estimateStateTxs,
  );
}

/**
 * Given a set of proposed transactions, return the estimated subaccount state after applying deltas
 */
export function useCurrentSubaccountEstimatedSummary({
  estimateStateTxs,
}: EstimateSubaccountStateChangeParams) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();

  // Force a debounce here as usages will all come from user input
  const debouncedTxs = useDebounce(estimateStateTxs, { wait: 500 });
  const disabled = !vertexClient || !debouncedTxs.length || !subaccountOwner;

  return useQuery({
    queryKey: currentSubaccountEstimatedSummaryQueryKey(
      primaryChainId,
      subaccountOwner,
      subaccountName,
      debouncedTxs,
    ),
    queryFn: async (): Promise<AnnotatedSubaccountSummary> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const params: GetEngineEstimatedSubaccountSummaryParams = {
        subaccountOwner: subaccountOwner,
        subaccountName,
        txs: debouncedTxs,
      };
      return annotateSubaccountSummary({
        summary:
          await vertexClient.subaccount.getEngineEstimatedSubaccountSummary(
            params,
          ),
        getSpotMetadata,
        getPerpMetadata,
      });
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
