import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function addressBlitzPointsQueryKey(sender?: string) {
  return createQueryKey('addressBlitzPoints', sender);
}

export function useAddressBlitzPoints() {
  const { isBlast } = useIsChainType();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = useVertexClient();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const disabled = !vertexClient || !enableSubaccountQueries || !isBlast;
  const addressForQuery =
    currentSubaccount.address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressBlitzPointsQueryKey(addressForQuery),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const params = {
        address: addressForQuery,
      };
      const indexerClient = vertexClient.context.indexerClient;
      // Combine blast & blitz points - there isn't much benefit to separating them
      const [blitz, blast] = await Promise.all([
        indexerClient.getBlitzPoints(params),
        indexerClient.getBlastPoints(params),
      ]);

      return {
        blitz: {
          ...blitz,
          // For simplicity, derive total points here
          totalPoints: blitz.referralPoints
            .plus(blitz.tradingPoints)
            .plus(blitz.initialPoints),
        },
        blast,
      };
    },
    enabled: !disabled,
    // Refetch every 30min or so, not really relevant - Blitz metrics refresh hourly and Blast metrics are manually updated / via a 2hr cron job
    refetchInterval: 60 * 30 * 1000,
  });
}
