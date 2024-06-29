import { useMutation } from '@tanstack/react-query';
import { BigDecimal } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { addressOnChainReferralRewardsQueryKey } from 'client/modules/referrals/hooks/query/useAddressOnChainReferralRewards';
import { useCallback } from 'react';
import { Address, parseAbi } from 'viem';
import { useWriteContract } from 'wagmi';

const REFETCH_QUERY_KEYS = [addressOnChainReferralRewardsQueryKey()];

export function useExecuteClaimReferralRewards() {
  const { writeContractAsync } = useWriteContract();
  const { claimContractAddress, projectAddress, payoutToken } =
    useFuulReferralsContext();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: { amount: BigDecimal }) => {
        console.log('Claiming Referral Rewards', params);

        const abi = parseAbi([
          'struct ClaimCheck { address projectAddress; address currency; uint256 amount; uint256[] tokenIds; uint256[] amounts; }',
          'function claim(ClaimCheck[] calldata claimChecks) external',
        ]);

        const hash = await writeContractAsync({
          abi,
          address: claimContractAddress,
          functionName: 'claim',
          args: [
            [
              {
                projectAddress,
                currency: payoutToken.address as Address,
                amount: BigInt(params.amount.toString()),
                tokenIds: [],
                amounts: [],
              },
            ],
          ],
        });

        return { hash };
      },
      [
        claimContractAddress,
        payoutToken.address,
        projectAddress,
        writeContractAsync,
      ],
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
