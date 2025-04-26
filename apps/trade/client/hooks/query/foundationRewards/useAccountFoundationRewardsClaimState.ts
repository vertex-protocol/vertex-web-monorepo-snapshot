import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  getValidatedAddress,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function accountFoundationRewardsClaimStateQueryKey(
  chainEnv?: ChainEnv,
  address?: string,
) {
  return createQueryKey(
    'accountFoundationRewardsClaimState',
    chainEnv,
    address,
  );
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
  const vertexClient = usePrimaryChainVertexClient();
  const {
    connectionStatus: { address },
    primaryChainEnv,
  } = useEVMContext();

  const disabled = !vertexClient;
  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  const queryFn = async (): Promise<AccountFoundationRewardsClaimState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const claimedAmountsResponse =
      await vertexClient.context.contracts.foundationRewardsAirdrop.read.getClaimed(
        [getValidatedAddress(addressForQuery)],
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
      primaryChainEnv,
      addressForQuery,
    ),
    queryFn,
    enabled: !disabled,
  });
}
