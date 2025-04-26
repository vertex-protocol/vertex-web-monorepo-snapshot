import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import { DepthChartItem } from 'client/modules/trading/chart/depth/useDepthChart';
import { getTooltipPayloadData } from 'client/utils/charts/getTooltipPayloadData';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Props extends TooltipProps<ValueType, NameType> {
  priceFormatSpecifier: string;
  sizeFormatSpecifier: string;
  symbol: string;
}

export function DepthChartTooltip({
  active,
  payload,
  sizeFormatSpecifier,
  priceFormatSpecifier,
  symbol,
}: Props) {
  const originalDataPayload: DepthChartItem | undefined =
    getTooltipPayloadData(payload);

  if (!active || !originalDataPayload) {
    return null;
  }

  const cumulativeSize =
    originalDataPayload.cumulativeAskSize ??
    originalDataPayload.cumulativeBidSize;

  return (
    <ChartTooltip.Container>
      <ChartTooltip.Items>
        <ChartTooltip.Item
          title="Price"
          content={formatNumber(originalDataPayload.price, {
            formatSpecifier: priceFormatSpecifier,
          })}
        />
        <ChartTooltip.Item
          title="Total"
          content={`${formatNumber(cumulativeSize, {
            formatSpecifier: sizeFormatSpecifier,
          })} ${symbol}`}
        />
        <ChartTooltip.Item
          title="Price Change"
          content={formatNumber(originalDataPayload.changeFraction, {
            formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
          })}
        />
      </ChartTooltip.Items>
    </ChartTooltip.Container>
  );
}
