import { ChartTooltip } from 'client/components/ChartTooltip';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
import { first } from 'lodash';
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
  // Payload is an array of displayed data points, each datapoint has a nested `payload` property of type FundingChartItem
  const originalDataPayload: PortfolioChartDataItem | undefined =
    first(payload)?.payload;

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
