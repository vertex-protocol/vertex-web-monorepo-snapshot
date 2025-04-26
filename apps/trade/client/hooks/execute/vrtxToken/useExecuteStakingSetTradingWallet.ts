import { useMutation } from '@tanstack/react-query';
import { getValidatedAddress } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountStakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [accountStakingV2StateQueryKey()];

interface Params {
  address: string;
}

/**
 * Sets a trading wallet delegate for staked VRTX. Used by Market Makers
 */
export function useExecuteStakingSetTradingWallet() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: Params, context) => {
      console.log('Setting Trading Wallet', params);
      return context.vertexClient.context.contracts.vrtxStakingV2.write.connectTradingWallet(
        [getValidatedAddress(params.address)],
      );
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('StakingSetTradingWallet', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
