import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { SubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/types';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { signDependentValue } from '@vertex-protocol/react-client';
import { useMemo } from 'react';

export function BalancesHeroMetricsItems({
  className,
  overview,
}: WithClassnames<{ overview?: SubaccountOverview }>) {
  const aprItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'balancesNetAPR',
          },
          label: 'Net APR',
          value: overview?.spot.averageAPRFraction,
          valueClassName: signDependentValue(
            overview?.spot.averageAPRFraction,
            {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-primary',
            },
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
          valueClassName: signDependentValue(
            overview?.spot.totalNetInterestCumulativeUsd,
            {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-primary',
            },
          ),
        },
      ] satisfies ValueWithLabelProps[],
    [overview],
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
            id: 'balancesTotalDepositAPR',
          },
          label: 'Deposit APR',
          value: overview?.spot.averageDepositAPRFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
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
            id: 'balancesTotalBorrowAPR',
          },
          label: 'Borrow APR',
          value: overview?.spot.averageBorrowAPRFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [overview],
  );
  return (
    <PortfolioHeroMetricsPane.Items
      className={className}
      childContainerClassNames="flex flex-col gap-y-0.5"
    >
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
      <Divider />
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
    </PortfolioHeroMetricsPane.Items>
  );
}
