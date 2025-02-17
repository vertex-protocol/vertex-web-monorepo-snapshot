import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainEnv, SubaccountSummaryResponse } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { annotateSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/annotateSubaccountSummary';
import { subaccountSummaryQueryKey } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';

export function summariesForAppSubaccountsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountNames?: string[],
) {
  return createQueryKey(
    'summariesForAppSubaccounts',
    chainEnv,
    subaccountOwner,
    subaccountNames,
  );
}

/**
 * Returns all subaccount summaries associated with app subaccounts (excludes API subaccounts)
 */
export function useSummariesForAppSubaccounts() {
  const queryClient = useQueryClient();
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: { address, chainEnv },
    appSubaccountNames,
  } = useSubaccountContext();
  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();

  const disabled = !vertexClient || !address || !appSubaccountNames;

  return useQuery({
    queryKey: summariesForAppSubaccountsQueryKey(
      chainEnv,
      address,
      appSubaccountNames,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const summaries = await Promise.all(
        appSubaccountNames.map((name) =>
          vertexClient.subaccount.getEngineSubaccountSummary({
            subaccountName: name,
            subaccountOwner: address,
          }),
        ),
      );

      const summariesBySubaccountName: Record<
        string,
        SubaccountSummaryResponse
      > = {};

      summaries.forEach((summary, i) => {
        const subaccountName = appSubaccountNames[i];

        const annotatedSummary = annotateSubaccountSummary({
          summary,
          getPerpMetadata,
          getSpotMetadata,
        });

        // Since we have all subaccount summaries here, we can manually update the cache.
        queryClient.setQueryData(
          subaccountSummaryQueryKey(chainEnv, address, subaccountName),
          annotatedSummary,
        );

        summariesBySubaccountName[subaccountName] = annotatedSummary;
      });

      return summariesBySubaccountName;
    },
    enabled: !disabled,
    // This query is expensive, so we don't refetch on a set interval
    refetchInterval: false,
  });
}
