import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  GetSubaccountSummaryParams,
} from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import {
  AnnotatedSubaccountSummary,
  annotateSubaccountSummary,
} from 'client/hooks/query/subaccount/annotateSubaccountSummary';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import { ZeroAddress } from 'ethers';

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

  // If no current subaccount, query (for now) for a subaccount that does not exist
  const subaccountOwnerForQuery = subaccountOwner ?? ZeroAddress;

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
      subaccountName,
    ),
    queryFn,
    enabled: !disabled,
    refetchInterval: 5000,
  });
}
