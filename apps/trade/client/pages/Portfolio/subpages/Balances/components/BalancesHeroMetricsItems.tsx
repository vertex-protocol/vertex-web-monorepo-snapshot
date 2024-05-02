import { WithClassnames } from '@vertex-protocol/web-common';
import { LineItemMetricProps } from 'client/components/LineItem/types';
import { DerivedSubaccountOverviewData } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';

export function BalancesHeroMetricsItems({
  className,
  overview,
}: WithClassnames<{ overview?: DerivedSubaccountOverviewData }>) {
  const balancesMetricsItems: LineItemMetricProps[] = useMemo(
    () => [
      {
        tooltip: {
          id: 'balancesTotalDeposits',
        },
        label: 'Deposits',
        value: overview?.spot.totalDepositsValueUsd,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        tooltip: {
          id: 'balancesTotalBorrows',
        },
        label: 'Borrows',
        value: overview?.spot.totalBorrowsValueUsd.abs(),
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        tooltip: {
          id: 'balancesTotalDepositAPR',
        },
        label: 'Deposit APR',
        value: overview?.spot.averageDepositAPRFraction,
        renderValue: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
      {
        tooltip: {
          id: 'balancesTotalBorrowAPR',
        },
        label: 'Borrow APR',
        value: overview?.spot.averageBorrowAPRFraction,
        renderValue: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
      {
        tooltip: {
          id: 'balancesNetAPR',
        },
        label: 'Net APR',
        value: overview?.spot.averageAPRFraction,
        renderValue: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
    ],
    [overview],
  );

  return (
    <PortfolioHeroMetricsPane.Items
      header="Totals"
      className={className}
      childContainerClassNames="flex flex-col gap-y-0.5"
    >
      {balancesMetricsItems.map(
        ({ tooltip, label, value, renderValue }, index) => (
          <PortfolioHeroMetricsPane.LineItem
            key={index}
            label={label}
            value={value}
            tooltip={tooltip}
            renderValue={renderValue}
          />
        ),
      )}
    </PortfolioHeroMetricsPane.Items>
  );
}
