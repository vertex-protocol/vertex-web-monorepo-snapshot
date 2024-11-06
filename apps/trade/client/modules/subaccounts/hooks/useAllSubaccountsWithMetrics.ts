import {
  BigDecimal,
  calcTotalPortfolioValues,
  removeDecimals,
} from '@vertex-protocol/client';
import { useSubaccountNames } from 'client/context/subaccount/hooks/useSubaccountNames';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAppSubaccountSummaries } from 'client/hooks/query/subaccount/useAppSubaccountSummaries';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { mapValues } from 'lodash';
import { useMemo } from 'react';

export interface SubaccountWithMetrics {
  subaccountName: string;
  profile: SubaccountProfile;
  portfolioValueUsd: BigDecimal | undefined;
}

/**
 * Returns the name, profile, and portfolio value (USD) for all subaccounts, including API subaccounts.
 * Portfolio values are not fetched for API subaccounts via `useAppSubaccountSummaries`
 */
export function useAllSubaccountsWithMetrics(): SubaccountWithMetrics[] {
  const { getSubaccountProfile } = useSubaccountContext();
  // Use the subaccount names hook directly so that we can access the API subaccount names
  const subaccountNames = useSubaccountNames();
  const { data: appSubaccountSummaries } = useAppSubaccountSummaries();

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  return useMemo(() => {
    return subaccountNames.all.map((subaccountName) => {
      const portfolioValueUsd = (() => {
        // This can return `undefined` if `appSubaccountSummaries` hasn't yet resolved or
        // if our hooks have diverged and we're no longer using the same known subaccount
        // names that we build `appSubaccountSummaries` with to access it.
        const summary = appSubaccountSummaries?.[subaccountName];

        // Return `undefined` if we don't have summaries so we can show placeholders (e.g. `-`).
        if (!summary) {
          return;
        }

        const decimalAdjustedTotalPortfolioValues = mapValues(
          calcTotalPortfolioValues(summary),
          (val) => removeDecimals(val),
        );

        return decimalAdjustedTotalPortfolioValues.netTotal.multipliedBy(
          primaryQuotePriceUsd,
        );
      })();

      return {
        subaccountName,
        profile: getSubaccountProfile(subaccountName),
        portfolioValueUsd,
      };
    });
  }, [
    subaccountNames.all,
    appSubaccountSummaries,
    getSubaccountProfile,
    primaryQuotePriceUsd,
  ]);
}
