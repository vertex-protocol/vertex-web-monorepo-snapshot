import { ChartTooltip } from 'client/components/ChartTooltip';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
import { getTooltipPayloadData } from 'client/utils/charts/getTooltipPayloadData';
import { ReactNode } from 'react';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

// Given the datapoint of this tooltip, return the relevant body for the tooltip
export type PortfolioChartTooltipBodyRenderFn = (
  payload: PortfolioChartDataItem,
) => ReactNode;

interface Props extends TooltipProps<ValueType, NameType> {
  renderBody: PortfolioChartTooltipBodyRenderFn;
}

export function PortfolioChartTooltip({ active, payload, renderBody }: Props) {
  const originalDataPayload: PortfolioChartDataItem | undefined =
    getTooltipPayloadData(payload);

  if (!active || !originalDataPayload) {
    return null;
  }

  return (
    <ChartTooltip.Container>
      <ChartTooltip.TimestampHeader
        timestampMillis={originalDataPayload.timestampMillis}
      />
      <ChartTooltip.Items>{renderBody(originalDataPayload)}</ChartTooltip.Items>
    </ChartTooltip.Container>
  );
}
