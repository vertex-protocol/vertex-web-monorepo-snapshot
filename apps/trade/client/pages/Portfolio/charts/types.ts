import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { PORTFOLIO_CHART_TIMESPAN_METADATA } from 'client/pages/Portfolio/charts/consts';
import { ElementType } from 'react';

export interface PortfolioChartComponentProps {
  data: PortfolioChartDataItem[];
  isPrivate: boolean;
}

export type PortfolioChartTimespan =
  keyof typeof PORTFOLIO_CHART_TIMESPAN_METADATA;

export interface PortfolioChartTab<TTabID extends string>
  extends TabIdentifiable<TTabID> {
  // Rendered in the tab button
  label: string;
  // If present, rendered as a tooltip alongside the tab button label
  labelDefinitionId?: DefinitionTooltipID;
  ChartComponent: ElementType<PortfolioChartComponentProps>;
}

export interface PortfolioChartDataItem {
  timestampMillis: number;
  portfolioValueUsd: number;
  cumulativeAccountPnlUsd: number;
  cumulativeAccountPnlFrac: number | undefined;
  cumulativeTotalPerpPnlUsd: number;
  cumulativeTotalPerpPnlFrac: number | undefined;
  cumulativePerpFundingUsd: number;
  cumulativePerpFundingFrac: number;
  cumulativeNetSpotInterestUsd: number;
  totalNetSpotValueUsd: number;
  totalDepositsValueUsd: number;
  totalAbsBorrowsValueUsd: number;
  totalLpValueUsd: number;
  // Deltas to the PREVIOUS item
  deltas: {
    cumulativeAccountPnlUsd: number;
    cumulativeAccountPnlFrac: number | undefined;
    cumulativeTotalPerpPnlUsd: number;
    cumulativeTotalPerpPnlFrac: number | undefined;
    cumulativePerpFundingUsd: number;
    cumulativePerpFundingFrac: number;
  };
}
