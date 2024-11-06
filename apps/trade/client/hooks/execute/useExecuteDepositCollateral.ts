import { useMutation } from '@tanstack/react-query';
import { DepositCollateralParams } from '@vertex-protocol/contracts';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  MAX_SIZE_QUERY_KEYS,
  SUBACCOUNT_SUMMARY_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { listSubaccountsQueryKey } from 'client/hooks/query/subaccount/useListSubaccounts';
import { subaccountCreationTimeQueryKey } from 'client/hooks/query/subaccount/useSubaccountCreationTime';
import { subaccountPaginatedCollateralEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { subaccountReferralCodeQueryKey } from 'client/hooks/query/subaccount/useSubaccountReferralCode';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  subaccountCreationTimeQueryKey(),
  subaccountReferralCodeQueryKey(),
  allDepositableTokenBalancesQueryKey(),
  tokenAllowanceQueryKey(),
  subaccountPaginatedCollateralEventsQueryKey(),
  listSubaccountsQueryKey(),
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
];

export function useExecuteDepositCollateral() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: Pick<
          DepositCollateralParams,
          'productId' | 'amount' | 'referralCode'
        >,
        context: ValidExecuteContext,
      ) => {
        console.log('Depositing Collateral', params);
        const currentSubaccountName = context.subaccount.name;
        return context.vertexClient.spot.deposit({
          subaccountName: currentSubaccountName,
          productId: params.productId,
          amount: params.amount,
          referralCode: params.referralCode,
        });
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('DepositCollateral', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
