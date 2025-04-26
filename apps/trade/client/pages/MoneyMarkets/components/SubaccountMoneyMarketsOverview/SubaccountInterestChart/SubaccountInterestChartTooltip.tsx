import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import { SubaccountInterestChartDataItem } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/types';
import { getTooltipPayloadData } from 'client/utils/charts/getTooltipPayloadData';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Props extends TooltipProps<ValueType, NameType> {}

export function SubaccountInterestChartTooltip({ active, payload }: Props) {
  const originalDataPayload: SubaccountInterestChartDataItem | undefined =
    getTooltipPayloadData(payload);

  if (!active || !originalDataPayload) {
    return null;
  }

  return (
    <ChartTooltip.Container>
      <ChartTooltip.TimestampHeader
        timestampMillis={originalDataPayload.timestampMillis}
      />
      <ChartTooltip.Items>
        <ChartTooltip.Item
          title="Net Interest"
          content={
            <div
              className={getSignDependentColorClassName(
                originalDataPayload.cumulativeNetSpotInterestUsd,
              )}
            >
              {formatNumber(originalDataPayload.cumulativeNetSpotInterestUsd, {
                formatSpecifier:
                  PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
              })}
            </div>
          }
        />
      </ChartTooltip.Items>
    </ChartTooltip.Container>
  );
}
