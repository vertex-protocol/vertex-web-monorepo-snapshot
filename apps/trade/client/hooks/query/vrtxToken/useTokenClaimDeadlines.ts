import { useQuery } from '@tanstack/react-query';
import { toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  useIsChainEnvType,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { ChainEnv } from '@vertex-protocol/client';

export function tokenClaimDeadlinesQueryKey(chainEnv?: ChainEnv) {
  return createQueryKey('tokenClaimDeadlines', chainEnv);
}

/**
 * Returns deadlines, in seconds, to claim tokens, where the index is the epoch.
 * ex: deadlines[8] is the deadline to claim tokens for epoch 8.
 * Deadlines start at LBA_AIRDROP_EPOCH, because LBA_AIRDROP_EPOCH is the airdrop epoch for LBA
 */
export function useTokenClaimDeadlines() {
  const { isArb } = useIsChainEnvType();
  const vertexClient = usePrimaryChainVertexClient();
  const { primaryChainEnv } = useEVMContext();

  const disabled = !vertexClient || !isArb;

  return useQuery({
    queryKey: tokenClaimDeadlinesQueryKey(primaryChainEnv),
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
