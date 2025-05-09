import { truncateAddress } from '@vertex-protocol/web-common';
import { ChartTooltip } from 'client/components/MakerStatisticsCharts/MakerMetricChart/ChartTooltip';
import { MakerMetricChartDataItem } from 'client/components/MakerStatisticsCharts/MakerMetricChart/types';
import {
  getHexColorForAddress,
  getTooltipPayloadData,
} from 'client/components/MakerStatisticsCharts/MakerMetricChart/utils';
import {
  NameType,
  Payload,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Props {
  labelFormatter:
    | ((value: number | undefined, index: number) => string)
    | undefined;
  payload: Payload<ValueType, NameType>[] | undefined;
  active: boolean | undefined;
  hiddenAddresses: Record<string, boolean>;
}

export function MakerMetricChartTooltip({
  active,
  payload,
  labelFormatter,
  hiddenAddresses,
}: Props) {
  const originalDataPayload: MakerMetricChartDataItem | undefined =
    getTooltipPayloadData(payload);

  if (!active || !originalDataPayload) {
    return null;
  }

  const { timestampMillis, ...rest } = originalDataPayload;

  return (
    <ChartTooltip.Container>
      <ChartTooltip.TimestampHeader timestampMillis={timestampMillis} />
      <ChartTooltip.Items>
        {Object.entries(rest).map(([address, value], index) => {
          // Skip rendering hidden addresses in tooltip
          if (hiddenAddresses?.[address] === true) {
            return null;
          }

          const title = truncateAddress(address);
          const legendColor = getHexColorForAddress(address);

          return (
            <ChartTooltip.Item
              key={address}
              title={title}
              legendColor={legendColor}
              content={labelFormatter?.(value, index) ?? value}
            />
          );
        })}
      </ChartTooltip.Items>
    </ChartTooltip.Container>
  );
}
