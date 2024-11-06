import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

function epochsQueryKey(chainEnv: ChainEnv) {
  return createQueryKey('epochs', chainEnv);
}

// Address to use for rewards to get zeros returned when not connected, AddressZero does not work.
const NOT_CONNECTED_REWARDS_ADDRESS =
  '0xfffffffffffffffffffffffffffffffffffffffe';

/** Get the epochs for the current chain. */
export function useEpochs() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;
  const addressForQuery = NOT_CONNECTED_REWARDS_ADDRESS;

  return useQuery({
    queryKey: epochsQueryKey(primaryChainEnv),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      // We use rewards to get the epochs.
      const rewards = await vertexClient.context.indexerClient.getRewards({
        address: addressForQuery,
      });

      return rewards.epochs;
    },
    enabled: !disabled,
  });
}
