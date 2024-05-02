import { useQuery } from '@tanstack/react-query';
import { toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function tokenClaimDeadlinesQueryKey() {
  return createQueryKey('tokenClaimDeadlines');
}

/**
 * Returns deadlines, in seconds, to claim tokens, where the index is the epoch.
 * ex: deadlines[8] is the deadline to claim tokens for epoch 8.
 * Deadlines start at LBA_AIRDROP_EPOCH, because LBA_AIRDROP_EPOCH is the airdrop epoch for LBA
 */
export function useTokenClaimDeadlines() {
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();

  const disabled = !vertexClient || !isArb;

  return useQuery({
    queryKey: tokenClaimDeadlinesQueryKey(),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const baseResponse =
        await vertexClient.context.contracts.vrtxAirdrop.getClaimingDeadlines();

      return baseResponse.map((deadline) => toBigDecimal(deadline));
    },
    enabled: !disabled,
    // No refetching needed as this is unlikely to change in a single frontend session
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    refetchInterval: false,
  });
}
