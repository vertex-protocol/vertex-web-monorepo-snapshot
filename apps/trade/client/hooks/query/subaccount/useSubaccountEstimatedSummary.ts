import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  GetEngineEstimatedSubaccountSummaryParams,
  SubaccountTx,
} from '@vertex-protocol/engine-client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useDebounce } from 'ahooks';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  AnnotatedSubaccountSummary,
  annotateSubaccountSummary,
} from 'client/hooks/query/subaccount/annotateSubaccountSummary';

export interface EstimateSubaccountStateChangeParams {
  estimateStateTxs: SubaccountTx[];
  subaccountName?: string;
}

export function subaccountEstimatedSummaryQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  estimateStateTxs?: SubaccountTx[],
) {
  return createQueryKey(
    'subaccountEstimatedSummary',
    chainEnv,
    subaccountOwner,
    subaccountName,
    estimateStateTxs,
  );
}

/**
 * Given a set of proposed transactions, return the estimated subaccount state after applying deltas
 */
export function useSubaccountEstimatedSummary({
  estimateStateTxs,
  subaccountName,
}: EstimateSubaccountStateChangeParams) {
  const vertexClient = usePrimaryChainVertexClient();

  const { currentSubaccount } = useSubaccountContext();
  const { address: subaccountOwner } = currentSubaccount;
  const targetSubaccountName = subaccountName ?? currentSubaccount.name;
  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();

  // Force a debounce here as usages will all come from user input
  const debouncedTxs = useDebounce(estimateStateTxs, { wait: 500 });
  const disabled = !vertexClient || !debouncedTxs.length || !subaccountOwner;

  return useQuery({
    queryKey: subaccountEstimatedSummaryQueryKey(
      currentSubaccount.chainEnv,
      subaccountOwner,
      targetSubaccountName,
      debouncedTxs,
    ),
    queryFn: async (): Promise<AnnotatedSubaccountSummary> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const params: GetEngineEstimatedSubaccountSummaryParams = {
        subaccountOwner: subaccountOwner,
        subaccountName: targetSubaccountName,
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
