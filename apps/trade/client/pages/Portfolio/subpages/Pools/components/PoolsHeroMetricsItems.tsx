import { WithClassnames } from '@vertex-protocol/web-common';
import { LineItemMetricProps } from 'client/components/LineItem/types';
import { DerivedSubaccountOverviewData } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useMemo } from 'react';

export function PoolsHeroMetricsItems({
  className,
  overview,
}: WithClassnames<{ overview?: DerivedSubaccountOverviewData }>) {
  const poolsMetricsItems: LineItemMetricProps[] = useMemo(
    () => [
      {
        tooltip: {
          id: 'poolsAverageAPR',
        },
        label: 'Avg. APR',
        value: overview?.lp.averageYieldFraction,
        renderValue: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
      {
        tooltip: {
          id: 'poolsTotalUnrealizedPnL',
        },
        label: 'Unrealized PnL',
        value: overview?.lp.totalUnrealizedPnlUsd,
        valueClassName: signDependentValue(overview?.lp.totalUnrealizedPnlUsd, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-secondary',
        }),
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
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
      {poolsMetricsItems.map(
        ({ tooltip, label, value, renderValue, valueClassName }, index) => (
          <PortfolioHeroMetricsPane.LineItem
            key={index}
            label={label}
            value={value}
            tooltip={tooltip}
            renderValue={renderValue}
            valueClassName={valueClassName}
          />
        ),
      )}
    </PortfolioHeroMetricsPane.Items>
  );
}
