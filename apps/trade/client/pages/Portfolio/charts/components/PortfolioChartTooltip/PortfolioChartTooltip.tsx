import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { ReactNode } from 'react';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { PortfolioChartDataItem } from '../../hooks/usePortfolioChartData/usePortfolioChartData';
import { PortfolioChartTooltipContent } from '../PortfolioChartTooltipContent/PortfolioChartTooltipContent';

// Given the datapoint of this tooltip, return the relevant body for the tooltip
export type PortfolioChartTooltipBodyRenderFn = (
  payload: PortfolioChartDataItem,
) => ReactNode;

interface Props extends TooltipProps<ValueType, NameType> {
  renderBody: PortfolioChartTooltipBodyRenderFn;
}

export function PortfolioChartTooltip({ active, payload, renderBody }: Props) {
  // Payload is an array of displayed data points, each datapoint has a nested `payload` property of type PortfolioChartDataItem
  const originalDataPayload: PortfolioChartDataItem | undefined =
    payload?.[0]?.payload;

  if (!active || !originalDataPayload) {
    return null;
  }

  return (
    <div className="bg-surface-card border-stroke flex w-40 min-w-max flex-col gap-y-2.5 rounded border p-2.5">
      <p className="text-text-secondary text-xs leading-3">
        {formatTimestamp(originalDataPayload.timestampMillis, {
          formatSpecifier: TimeFormatSpecifier.E_MMM_D_HH_12H,
        })}
      </p>
      <PortfolioChartTooltipContent.Container>
        {renderBody(originalDataPayload)}
      </PortfolioChartTooltipContent.Container>
    </div>
  );
}
