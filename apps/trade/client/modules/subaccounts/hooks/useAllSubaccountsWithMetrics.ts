import { BigDecimal, removeDecimals } from '@vertex-protocol/client';
import { sumBigDecimalBy } from '@vertex-protocol/utils';
import { useSubaccountNames } from 'client/context/subaccount/hooks/useSubaccountNames';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useIsolatedPositionsForAppSubaccounts } from 'client/hooks/query/subaccount/isolatedPositions/useIsolatedPositionsForAppSubaccounts';
import { useSummariesForAppSubaccounts } from 'client/hooks/query/subaccount/subaccountSummary/useSummariesForAppSubaccounts';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { calcIsoPositionNetMargin } from 'client/utils/calcs/perp/calcIsoPositionNetMargin';
import { calcTotalPortfolioValues } from 'client/utils/calcs/subaccount/subaccountInfoCalcs';
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
  const { data: summariesForAppSubaccounts } = useSummariesForAppSubaccounts();
  const { data: isoPositionsForAppSubaccounts } =
    useIsolatedPositionsForAppSubaccounts();

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  return useMemo(() => {
    return subaccountNames.all.map((subaccountName) => {
      const summary = summariesForAppSubaccounts?.[subaccountName];
      const isolatedPositions = isoPositionsForAppSubaccounts?.[subaccountName];

      const portfolioValueUsd = (() => {
        // Return `undefined` if we don't have summaries so we can show placeholders (e.g. `-`).
        if (!summary || !isolatedPositions) {
          return;
        }

        const totalCrossPortfolioValues = calcTotalPortfolioValues(summary);
        const totalIsolatedNetMargin = sumBigDecimalBy(
          isolatedPositions,
          (position) => {
            return calcIsoPositionNetMargin(
              position.baseBalance,
              position.quoteBalance,
            );
          },
        );

        return removeDecimals(
          totalCrossPortfolioValues.netTotal.plus(totalIsolatedNetMargin),
        ).multipliedBy(primaryQuotePriceUsd);
      })();

      return {
        subaccountName,
        profile: getSubaccountProfile(subaccountName),
        portfolioValueUsd,
      };
    });
  }, [
    subaccountNames.all,
    summariesForAppSubaccounts,
    isoPositionsForAppSubaccounts,
    getSubaccountProfile,
    primaryQuotePriceUsd,
  ]);
}
