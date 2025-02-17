import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { SubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/types';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { signDependentValue } from '@vertex-protocol/react-client';
import { useMemo } from 'react';

export function PoolsHeroMetricsItems({
  className,
  overview,
}: WithClassnames<{ overview?: SubaccountOverview }>) {
  const poolsMetricsItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'poolsAverageAPR',
          },
          label: 'Avg. APR',
          value: overview?.lp.averageYieldFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
        {
          tooltip: {
            id: 'poolsTotalUnrealizedPnL',
          },
          label: 'Unrealized PnL',
          value: overview?.lp.totalUnrealizedPnlUsd,
          valueClassName: signDependentValue(
            overview?.lp.totalUnrealizedPnlUsd,
            {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-secondary',
            },
          ),
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
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
      {poolsMetricsItems.map(
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
    </PortfolioHeroMetricsPane.Items>
  );
}
