import { useMutation } from '@tanstack/react-query';
import { EngineWithdrawCollateralParams } from '@vertex-protocol/engine-client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  MAX_SIZE_QUERY_KEYS,
  SUBACCOUNT_SUMMARY_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { subaccountPaginatedCollateralEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { useCallback } from 'react';

const REFETCH_ENGINE_QUERY_KEYS = [
  subaccountPaginatedCollateralEventsQueryKey(),
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
];

const REFETCH_CHAIN_QUERY_KEYS = [allDepositableTokenBalancesQueryKey()];

export function useExecuteWithdrawCollateral() {
  const refetchEngineQueries = useRefetchQueries(REFETCH_ENGINE_QUERY_KEYS);
  // Longer delay so sequencer has time to hit the chain
  const refetchChainQueries = useRefetchQueries(REFETCH_CHAIN_QUERY_KEYS, 5000);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: Pick<
          EngineWithdrawCollateralParams,
          'productId' | 'amount' | 'spotLeverage'
        >,
        context: ValidExecuteContext,
      ) => {
        console.log('Withdrawing Collateral', params);
        const currentSubaccountName = context.subaccount.name;
        return context.vertexClient.spot.withdraw({
          subaccountName: currentSubaccountName,
          productId: params.productId,
          amount: params.amount,
          spotLeverage: params.spotLeverage,
        });
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onSuccess() {
      refetchEngineQueries();
      refetchChainQueries();
    },
    onError(error, variables) {
      logExecuteError('WithdrawCollateral', error, variables);
    },
  });

  return mutation;
}
