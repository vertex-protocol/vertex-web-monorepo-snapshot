import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import { FundingChartItem } from 'client/modules/trading/chart/funding/useFundingChart';
import { signDependentValue } from 'client/utils/signDependentValue';
import { first } from 'lodash';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export function FundingChartTooltip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  // Payload is an array of displayed data points, each datapoint has a nested `payload` property of type FundingChartItem
  const originalDataPayload: FundingChartItem | undefined =
    first(payload)?.payload;

  if (!active || !originalDataPayload) {
    return null;
  }

  return (
    <ChartTooltip.Container>
      <ChartTooltip.TimestampHeader
        timestampMillis={originalDataPayload.timestampMillis}
      />
      <ChartTooltip.Item
        title="Funding Rate"
        legendColorClassName={signDependentValue(
          originalDataPayload.fundingRate,
          {
            positive: 'bg-positive',
            negative: 'bg-negative',
            zero: 'bg-disabled',
          },
        )}
        content={formatNumber(originalDataPayload.fundingRate, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP,
        })}
      />
    </ChartTooltip.Container>
  );
}
