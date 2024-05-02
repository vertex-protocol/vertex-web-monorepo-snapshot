import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useEVMContext,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function accountArbRewardsClaimStateQueryKey(address?: string) {
  return createQueryKey('accountArbRewardsClaimState', address);
}

export interface AccountArbRewardsClaimState {
  // Week is the index
  claimedAmounts: BigDecimal[];
  totalClaimableAmounts: BigDecimal[];
}

/**
 * A multicall query that returns a summary of an address claim state for ARB rewards
 */
export function useAccountArbRewardsClaimState() {
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const disabled = !vertexClient || !isArb;
  const addressForQuery = address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  const queryFn = async (): Promise<AccountArbRewardsClaimState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const claimedAmountsResponse =
      await vertexClient.context.contracts.arbAirdrop.getClaimed(
        addressForQuery,
      );

    const arbClaimProofsResponse =
      await vertexClient.context.indexerClient.getClaimArbMerkleProofs({
        address: addressForQuery,
      });

    return {
      claimedAmounts: claimedAmountsResponse.map(toBigDecimal),
      totalClaimableAmounts: arbClaimProofsResponse.map(
        (week) => week.totalAmount,
      ),
    };
  };

  return useQuery({
    queryKey: accountArbRewardsClaimStateQueryKey(addressForQuery),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
