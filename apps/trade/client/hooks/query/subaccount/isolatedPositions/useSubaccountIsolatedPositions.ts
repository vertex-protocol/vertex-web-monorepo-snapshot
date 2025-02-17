import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  GetSubaccountSummaryParams,
} from '@vertex-protocol/contracts';
import {
  AnnotatedIsolatedPositionWithProduct,
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { annotateIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/annotateIsolatedPositions';
import { zeroAddress } from 'viem';

export function subaccountIsolatedPositionsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountIsolatedPositions',
    chainEnv,
    subaccountOwner,
    subaccountName,
  );
}

export function useSubaccountIsolatedPositions() {
  const vertexClient = usePrimaryChainVertexClient();

  const { getSpotMetadata, getPerpMetadata } = useVertexMetadataContext();
  const { currentSubaccount } = useSubaccountContext();
  const { address: subaccountOwner, name: subaccountName } = currentSubaccount;

  const disabled = !vertexClient;

  const subaccountOwnerForQuery = subaccountOwner ?? zeroAddress;

  const queryFn = async (): Promise<AnnotatedIsolatedPositionWithProduct[]> => {
    if (disabled) {
      throw new QueryDisabledError();
    }
    const params: GetSubaccountSummaryParams = {
      subaccountOwner: subaccountOwnerForQuery,
      subaccountName,
    };

    const baseResponse =
      await vertexClient.subaccount.getIsolatedPositions(params);

    return annotateIsolatedPositions({
      isolatedPositions: baseResponse,
      getSpotMetadata,
      getPerpMetadata,
    });
  };

  return useQuery({
    queryKey: subaccountIsolatedPositionsQueryKey(
      currentSubaccount.chainEnv,
      subaccountOwnerForQuery,
      subaccountName,
    ),
    queryFn,
    enabled: !disabled,
    // Refetch logic should handle query updates
    refetchInterval: subaccountOwner ? 30000 : undefined,
  });
}
