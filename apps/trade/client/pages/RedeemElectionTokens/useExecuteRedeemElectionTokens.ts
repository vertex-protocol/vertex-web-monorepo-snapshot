import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useCallback } from 'react';
import { parseAbi } from 'viem';
import { useWriteContract } from 'wagmi';

const REFETCH_QUERY_KEYS = [allDepositableTokenBalancesQueryKey()];

export function useExecuteRedeemElectionTokens() {
  const { writeContractAsync } = useWriteContract();

  const mutationFn = useExecuteInValidContext(
    useCallback(async () => {
      console.log('Redeeming election tokens');

      const abi = parseAbi(['function redeem() external']);

      const hash = await writeContractAsync({
        abi,
        // OutcomeMarket contract address is the same on all chains
        address: '0x93cB55d606246EedaC753f30B09f7fB5349586e7',
        functionName: 'redeem',
      });

      return { hash };
    }, [writeContractAsync]),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('RedeemElectionTokens', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
