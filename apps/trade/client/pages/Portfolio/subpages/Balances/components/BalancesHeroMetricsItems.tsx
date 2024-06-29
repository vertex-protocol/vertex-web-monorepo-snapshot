import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { DerivedSubaccountOverviewData } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { useMemo } from 'react';

export function BalancesHeroMetricsItems({
  className,
  overview,
}: WithClassnames<{ overview?: DerivedSubaccountOverviewData }>) {
  const balancesMetricsItems = useMemo(
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
          value: overview?.spot.totalBorrowsValueUsd.abs(),
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'balancesTotalDepositAPR',
          },
          label: 'Deposit APR',
          value: overview?.spot.averageDepositAPRFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
        {
          tooltip: {
            id: 'balancesTotalBorrowAPR',
          },
          label: 'Borrow APR',
          value: overview?.spot.averageBorrowAPRFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
        {
          tooltip: {
            id: 'balancesNetAPR',
          },
          label: 'Net APR',
          value: overview?.spot.averageAPRFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [overview],
  );

  return (
    <PortfolioHeroMetricsPane.Items
      header="Totals"
      className={className}
      childContainerClassNames="flex flex-col gap-y-0.5"
    >
      {balancesMetricsItems.map(
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
    </PortfolioHeroMetricsPane.Items>
  );
}
