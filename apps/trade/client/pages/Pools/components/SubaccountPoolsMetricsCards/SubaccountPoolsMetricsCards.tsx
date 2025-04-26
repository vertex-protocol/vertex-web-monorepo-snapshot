'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Icons } from '@vertex-protocol/web-ui';
import { MetricCardWithIcon } from 'client/components/MetricCardWithIcon';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { SubaccountPoolsPnlTimeframeSelect } from 'client/pages/Pools/components/SubaccountPoolsMetricsCards/SubaccountPoolsPnlTimeframeSelect';
import { useSubaccountPoolsPnlData } from 'client/pages/Pools/components/SubaccountPoolsMetricsCards/useSubaccountPoolsPnlData';
import { useSubaccountPoolsPnlTimeframeSelect } from 'client/pages/Pools/components/SubaccountPoolsMetricsCards/useSubaccountPoolsPnlTimeframeSelect';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

export function SubaccountPoolsMetricsCards() {
  const { data: overview } = useSubaccountOverview();

  const {
    poolsPnlSecondsBeforeNow,
    onOpenChange,
    onValueChange,
    open,
    value,
    selectOptions,
    selectedOption,
  } = useSubaccountPoolsPnlTimeframeSelect();

  const { data: subaccountPoolsPnlData } = useSubaccountPoolsPnlData(
    poolsPnlSecondsBeforeNow,
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCardWithIcon icon={Icons.ArrowDownLeft}>
        <ValueWithLabel.Vertical
          label="Your Total Provided"
          value={overview?.lp.totalValueUsd}
          tooltip={{ id: 'lpTotalProvided' }}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Vertical
          label="Avg. APR"
          tooltip={{
            id: 'lpAverageAPR',
          }}
          value={overview?.lp.averageYieldFraction}
          valueClassName={getSignDependentColorClassName(
            overview?.lp.averageYieldFraction,
          )}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </MetricCardWithIcon>
      <MetricCardWithIcon icon={Icons.Intersect}>
        <ValueWithLabel.Vertical
          label="Your Pools PnL"
          tooltip={{ id: 'lpTotalPnL' }}
          value={subaccountPoolsPnlData?.cumulativeLpPnlDeltaUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <SubaccountPoolsPnlTimeframeSelect
          className="self-start"
          onOpenChange={onOpenChange}
          open={open}
          onValueChange={onValueChange}
          selectOptions={selectOptions}
          value={value}
          selectedOption={selectedOption}
        />
      </MetricCardWithIcon>
    </div>
  );
}
