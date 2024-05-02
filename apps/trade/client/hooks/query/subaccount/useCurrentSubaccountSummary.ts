import { useQuery } from '@tanstack/react-query';
import { GetSubaccountSummaryParams } from '@vertex-protocol/contracts';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import { ZeroAddress } from 'ethers';
import {
  AnnotatedSubaccountSummary,
  annotateSubaccountSummary,
} from './annotateSubaccountSummary';

export function currentSubaccountSummaryQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountSummary',
    chainId,
    subaccountOwner,
    subaccountName,
  );
}

export function useCurrentSubaccountSummary() {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'subaccountSummary',
    true,
  );
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
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
      subaccountName,
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
    queryKey: currentSubaccountSummaryQueryKey(
      primaryChainId,
      subaccountOwnerForQuery,
      subaccountName,
    ),
    queryFn,
    enabled: !disabled,
    refetchInterval: 5000,
  });
}
