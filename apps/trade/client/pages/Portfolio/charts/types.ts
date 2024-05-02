import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { ElementType } from 'react';
import { PortfolioChartDataItem } from './hooks/usePortfolioChartData/usePortfolioChartData';

export type ChartTimespan = '24hr' | '7d' | '1m' | 'all_time';

export interface ChartComponentProps {
  data: PortfolioChartDataItem[];
  isPrivate: boolean;
}

export interface PortfolioChartTab<TTabID extends string>
  extends TabIdentifiable<TTabID> {
  label: string;
  ChartComponent: ElementType<ChartComponentProps>;
}
