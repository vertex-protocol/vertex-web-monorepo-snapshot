import { useMutation } from '@tanstack/react-query';
import { BigDecimal, toBigInt } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { addressOnChainFuulReferralRewardsQueryKey } from 'client/modules/referrals/fuul/hooks/query/useAddressOnChainFuulReferralRewards';
import { useCallback } from 'react';
import { parseAbi } from 'viem';

const REFETCH_QUERY_KEYS = [addressOnChainFuulReferralRewardsQueryKey()];

export function useExecuteClaimFuulReferralRewards() {
  const { claimContractAddress, projectAddress, payoutToken } =
    useFuulReferralsContext();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: { amount: BigDecimal }, context) => {
        console.log('Claiming Referral Rewards', params);

        const abi = parseAbi([
          'struct ClaimCheck { address projectAddress; address currency; uint256 amount; uint256[] tokenIds; uint256[] amounts; }',
          'function claim(ClaimCheck[] calldata claimChecks) external',
        ]);

        return context.walletClient.writeContract({
          abi,
          address: claimContractAddress,
          functionName: 'claim',
          args: [
            [
              {
                projectAddress,
                currency: payoutToken.address,
                amount: toBigInt(params.amount.toString()),
                tokenIds: [],
                amounts: [],
              },
            ],
          ],
        });
      },
      [claimContractAddress, payoutToken.address, projectAddress],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimReferralRewards', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
