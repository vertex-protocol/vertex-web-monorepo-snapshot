import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useIsChainType,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function addressBlitzPointsQueryKey(sender?: string) {
  return createQueryKey('addressBlitzPoints', sender);
}

export function useAddressBlitzPoints() {
  const { isBlast } = useIsChainType();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !isBlast;
  const addressForQuery =
    currentSubaccount.address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

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
