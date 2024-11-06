import { useMemo } from 'react';
import { some } from 'lodash';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/useSubaccountSummary';
import { ProductEngineType } from '@vertex-protocol/contracts';

export function useHasRepayableBalances() {
  const { data: subaccountSummary } = useSubaccountSummary();
  return useMemo(() => {
    if (!subaccountSummary?.balances) return false;

    return some(
      subaccountSummary.balances,
      (balance) =>
        balance.type === ProductEngineType.SPOT && balance.amount.isNegative(),
    );
  }, [subaccountSummary]);
}
