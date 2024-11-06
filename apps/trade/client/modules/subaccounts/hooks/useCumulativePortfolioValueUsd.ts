import { BigDecimals } from '@vertex-protocol/client';
import { useAllSubaccountsWithMetrics } from 'client/modules/subaccounts/hooks/useAllSubaccountsWithMetrics';
import { useMemo } from 'react';

/**
 * Returns the sum of all FE-created subaccount portfolio values.
 */
export function useCumulativePortfolioValueUsd() {
  const subaccountsWithMetrics = useAllSubaccountsWithMetrics();

  return useMemo(() => {
    return subaccountsWithMetrics.reduce((total, account) => {
      const { portfolioValueUsd } = account;

      if (!portfolioValueUsd) {
        return total;
      }

      return total.plus(portfolioValueUsd);
    }, BigDecimals.ZERO);
  }, [subaccountsWithMetrics]);
}
