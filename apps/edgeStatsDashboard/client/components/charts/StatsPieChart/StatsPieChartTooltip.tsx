import {
  formatNumber,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/charts/ChartTooltip';
import { StatsPieChartDataItem } from 'client/components/charts/StatsPieChart/types';
import { getTooltipPayloadData } from 'client/utils/getTooltipPayloadData';
import {
  NameType,
  Payload,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Props {
  formatSpecifier: NumberFormatSpecifier;
  payload: Payload<ValueType, NameType>[] | undefined;
  active: boolean | undefined;
}

export function StatsPieChartTooltip({
  formatSpecifier,
  payload,
  active,
}: Props) {
  const originalDataPayload:
    | (StatsPieChartDataItem & { fill: string })
    | undefined = getTooltipPayloadData(payload);

  if (!active || !originalDataPayload) {
    return null;
  }

  const { name, value, fill } = originalDataPayload;

  return (
    <ChartTooltip.Container>
      <ChartTooltip.Row>
        <ChartTooltip.RowLabel legendColor={fill} label={name} />
        {formatNumber(value, { formatSpecifier })}
      </ChartTooltip.Row>
    </ChartTooltip.Container>
  );
}
