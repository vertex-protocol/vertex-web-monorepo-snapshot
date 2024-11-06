import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ElementType } from 'react';

export type ChartTimespan = '24hr' | '7d' | '1m' | 'all_time';

export interface ChartComponentProps {
  data: PortfolioChartDataItem[];
  isPrivate: boolean;
}

export interface PortfolioChartTab<TTabID extends string>
  extends TabIdentifiable<TTabID> {
  // Rendered in the tab button
  label: string;
  // If present, rendered as a tooltip alongside the tab button label
  labelDefinitionId?: DefinitionTooltipID;
  ChartComponent: ElementType<ChartComponentProps>;
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
  cumulativeLpPnlUsd: number;
  cumulativeLpPnlFrac: number | undefined;
  totalLpValueUsd: number;
  // Deltas to the PREVIOUS item
  deltas: {
    cumulativeAccountPnlUsd: number;
    cumulativeAccountPnlFrac: number | undefined;
    cumulativeTotalPerpPnlUsd: number;
    cumulativeTotalPerpPnlFrac: number | undefined;
    cumulativePerpFundingUsd: number;
    cumulativePerpFundingFrac: number;
    cumulativeLpPnlUsd: number;
    cumulativeLpPnlFrac: number | undefined;
  };
}
