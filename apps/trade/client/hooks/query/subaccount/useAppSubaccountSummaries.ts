import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainEnv, SubaccountSummaryResponse } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { annotateSubaccountSummary } from 'client/hooks/query/subaccount/annotateSubaccountSummary';
import { subaccountSummaryQueryKey } from 'client/hooks/query/subaccount/useSubaccountSummary';

export function appSubaccountSummariesQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountNames?: string[],
) {
  return createQueryKey(
    'appSubaccountSummaries',
    chainEnv,
    subaccountOwner,
    subaccountNames,
  );
}

/**
 * Returns all subaccount summaries associated with app subaccounts (excludes API subaccounts)
 */
export function useAppSubaccountSummaries() {
  const queryClient = useQueryClient();
  const vertexClient = usePrimaryChainVertexClient();
  const { currentSubaccount, appSubaccountNames } = useSubaccountContext();
  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();

  const subaccountsOwnerForQuery = currentSubaccount.address;

  const disabled =
    !vertexClient || !subaccountsOwnerForQuery || !appSubaccountNames;

  return useQuery({
    queryKey: appSubaccountSummariesQueryKey(
      currentSubaccount.chainEnv,
      subaccountsOwnerForQuery,
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
            subaccountOwner: subaccountsOwnerForQuery,
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
          subaccountSummaryQueryKey(
            currentSubaccount.chainEnv,
            subaccountsOwnerForQuery,
            subaccountName,
          ),
          annotatedSummary,
        );

        summariesBySubaccountName[subaccountName] = annotatedSummary;
      });

      return summariesBySubaccountName;
    },
    enabled: !disabled,
    // As this query may fetch several subaccount summaries at a time and can
    // thus get expensive, we don't refetch at a set interval.
    refetchInterval: false,
  });
}
