import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';

export function accountFoundationRewardsClaimStateQueryKey(
  chainId?: PrimaryChainID,
  address?: string,
) {
  return createQueryKey('accountFoundationRewardsClaimState', chainId, address);
}

export interface AccountFoundationRewardsClaimState {
  // Week is the index
  claimedAmounts: BigDecimal[];
  totalClaimableAmounts: BigDecimal[];
}

/**
 * A multicall query that returns a summary of an address claim state for foundation rewards
 */
export function useAccountFoundationRewardsClaimState() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const disabled = !vertexClient;
  const addressForQuery = address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  const queryFn = async (): Promise<AccountFoundationRewardsClaimState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const claimedAmountsResponse =
      await vertexClient.context.contracts.foundationRewardsAirdrop.getClaimed(
        addressForQuery,
      );

    const foundationClaimProofsResponse =
      await vertexClient.context.indexerClient.getClaimFoundationRewardsMerkleProofs(
        {
          address: addressForQuery,
        },
      );

    return {
      claimedAmounts: claimedAmountsResponse.map(toBigDecimal),
      totalClaimableAmounts: foundationClaimProofsResponse.map(
        (week) => week.totalAmount,
      ),
    };
  };

  return useQuery({
    queryKey: accountFoundationRewardsClaimStateQueryKey(
      primaryChainId,
      addressForQuery,
    ),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
