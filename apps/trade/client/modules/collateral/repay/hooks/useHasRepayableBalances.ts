import { useMemo } from 'react';
import { some } from 'lodash';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { ProductEngineType } from '@vertex-protocol/contracts';

export function useHasRepayableBalances() {
  const { data: subaccountSummary } = useCurrentSubaccountSummary();
  return useMemo(() => {
    if (!subaccountSummary?.balances) return false;

    return some(
      subaccountSummary.balances,
      (balance) =>
        balance.type === ProductEngineType.SPOT && balance.amount.isNegative(),
    );
  }, [subaccountSummary]);
}
