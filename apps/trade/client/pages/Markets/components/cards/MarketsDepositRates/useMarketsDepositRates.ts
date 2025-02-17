import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { sortAndTrim } from 'client/pages/Markets/utils/sortAndTrim';
import { useMemo } from 'react';

/**
 * The top 6 markets' deposit rates descending order
 */
export function useMarketsDepositRates() {
  const { balances, isLoading } = useSpotBalances();

  const depositRates = useMemo(() => {
    if (!balances) {
      return;
    }

    return sortAndTrim(Object.values(balances), 'depositAPR');
  }, [balances]);

  return {
    depositRates,
    isLoading,
  };
}
