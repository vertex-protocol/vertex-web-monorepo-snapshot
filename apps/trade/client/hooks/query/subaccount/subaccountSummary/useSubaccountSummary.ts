import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  GetSubaccountSummaryParams,
} from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  AnnotatedSubaccountSummary,
  annotateSubaccountSummary,
} from 'client/hooks/query/subaccount/subaccountSummary/annotateSubaccountSummary';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import { zeroAddress } from 'viem';

export function subaccountSummaryQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountSummary',
    chainEnv,
    subaccountOwner,
    subaccountName,
  );
}

export function useSubaccountSummary({
  subaccountName,
}: {
  subaccountName?: string;
} = {}) {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'subaccountSummary',
    true,
  );
  const vertexClient = usePrimaryChainVertexClient();

  const { currentSubaccount } = useSubaccountContext();
  const { address: subaccountOwner } = currentSubaccount;
  const targetSubaccountName = subaccountName ?? currentSubaccount.name;

  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();

  const disabled = !vertexClient;

  const subaccountOwnerForQuery = subaccountOwner ?? zeroAddress;

  const queryFn = async (): Promise<AnnotatedSubaccountSummary> => {
    if (disabled) {
      throw new QueryDisabledError();
    }
    const params: GetSubaccountSummaryParams = {
      subaccountOwner: subaccountOwnerForQuery,
      subaccountName: targetSubaccountName,
    };

    startProfiling();
    const baseResponse =
      await vertexClient.subaccount.getEngineSubaccountSummary(params);
    endProfiling();

    return annotateSubaccountSummary({
      summary: baseResponse,
      getSpotMetadata,
      getPerpMetadata,
    });
  };

  return useQuery({
    queryKey: subaccountSummaryQueryKey(
      currentSubaccount.chainEnv,
      subaccountOwnerForQuery,
      targetSubaccountName,
    ),
    queryFn,
    enabled: !disabled,
    // Refetch logic should handle query updates
    refetchInterval: subaccountOwner ? 30000 : undefined,
  });
}
