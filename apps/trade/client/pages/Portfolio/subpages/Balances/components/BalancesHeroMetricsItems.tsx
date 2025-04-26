import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { SubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/types';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { useMemo } from 'react';

export function BalancesHeroMetricsItems({
  overview,
}: {
  overview?: SubaccountOverview;
}) {
  const aprItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'balancesNetAPR',
          },
          label: 'Net APR',
          value: overview?.spot.averageAPRFraction,
          valueClassName: getSignDependentColorClassName(
            overview?.spot.averageAPRFraction,
          ),
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
        {
          tooltip: {
            id: 'balancesTotalCumulativeInterest',
          },
          label: 'Cum. Interest',
          value: overview?.spot.totalNetInterestCumulativeUsd,
          numberFormatSpecifier:
            PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
          valueClassName: getSignDependentColorClassName(
            overview?.spot.totalNetInterestCumulativeUsd,
          ),
        },
      ] satisfies ValueWithLabelProps[],
    [
      overview?.spot.averageAPRFraction,
      overview?.spot.totalNetInterestCumulativeUsd,
    ],
  );

  const balancesItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'balancesTotalDeposits',
          },
          label: 'Deposits',
          value: overview?.spot.totalDepositsValueUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'balancesTotalBorrows',
          },
          label: 'Borrows',
          value: overview?.spot.totalBorrowsValueUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [overview?.spot.totalDepositsValueUsd, overview?.spot.totalBorrowsValueUsd],
  );

  return (
    <PortfolioHeroMetricsPane.ItemsGroup header="Totals">
      {aprItems.map(
        (
          { tooltip, label, value, numberFormatSpecifier, valueClassName },
          index,
        ) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={index}
            label={label}
            value={value}
            tooltip={tooltip}
            numberFormatSpecifier={numberFormatSpecifier}
            valueClassName={valueClassName}
          />
        ),
      )}
      {balancesItems.map(
        ({ tooltip, label, value, numberFormatSpecifier }, index) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={index}
            label={label}
            value={value}
            tooltip={tooltip}
            numberFormatSpecifier={numberFormatSpecifier}
          />
        ),
      )}
    </PortfolioHeroMetricsPane.ItemsGroup>
  );
}
