import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { first } from 'lodash';

function latestEpochQueryKey(chainEnv: ChainEnv) {
  return createQueryKey('latestEpoch', chainEnv);
}

// Address to use for rewards to get zeros returned when not connected, AddressZero does not work.
const NOT_CONNECTED_REWARDS_ADDRESS =
  '0xfffffffffffffffffffffffffffffffffffffffe';

/** Get the latest epoch for the current chain. */
export function useLatestEpoch() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;
  const addressForQuery = NOT_CONNECTED_REWARDS_ADDRESS;

  return useQuery({
    queryKey: latestEpochQueryKey(primaryChainEnv),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      // We use rewards to get the latest epoch.
      const rewards = await vertexClient.context.indexerClient.getRewards({
        address: addressForQuery,
        limit: 1,
      });

      return first(rewards.epochs);
    },
    enabled: !disabled,
  });
}
