'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Icons } from '@vertex-protocol/web-ui';
import { MetricCardWithIcon } from 'client/components/MetricCardWithIcon';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

export function SubaccountMoneyMarketsOverviewItems() {
  const { data: overview } = useSubaccountOverview();

  return (
    <div className="grid grid-rows-4 gap-y-3">
      <MetricCardWithIcon icon={Icons.ArrowDownLeft}>
        <ValueWithLabel.Vertical
          label="Total Deposits"
          value={overview?.spot.totalDepositsValueUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Vertical
          className="items-end"
          label="Avg. APR"
          tooltip={{
            id: 'depositAPR',
          }}
          value={overview?.spot.averageDepositAPRFraction}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </MetricCardWithIcon>
      <MetricCardWithIcon icon={Icons.ArrowUpRight}>
        <ValueWithLabel.Vertical
          label="Total Borrows"
          value={overview?.spot.totalBorrowsValueUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Vertical
          className="items-end"
          label="Avg. APR"
          tooltip={{
            id: 'borrowAPR',
          }}
          value={overview?.spot.averageBorrowAPRFraction}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </MetricCardWithIcon>
      <MetricCardWithIcon icon={Icons.ChartBar}>
        <ValueWithLabel.Vertical
          label="Net Interest"
          value={overview?.spot.totalNetInterestCumulativeUsd}
          valueClassName={getSignDependentColorClassName(
            overview?.spot.totalNetInterestCumulativeUsd,
          )}
          numberFormatSpecifier={
            PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP
          }
        />
      </MetricCardWithIcon>
      <MetricCardWithIcon icon={Icons.Database}>
        <ValueWithLabel.Vertical
          label="Margin Available"
          value={overview?.fundsAvailableBoundedUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
      </MetricCardWithIcon>
    </div>
  );
}
