import { COLORS } from 'common/theme/colors';
import { first, last } from 'lodash';
import { useMemo } from 'react';
import { PORTFOLIO_CHART_GRADIENT_URLS } from '../consts';
import { PortfolioChartDataItem } from './usePortfolioChartData/usePortfolioChartData';

export function usePnlChartColors({
  data,
  valueKey,
}: {
  data?: PortfolioChartDataItem[];
  valueKey: Extract<
    keyof PortfolioChartDataItem,
    | 'cumulativeAccountPnlUsd'
    | 'cumulativeTotalPerpPnlUsd'
    | 'cumulativeLpPnlUsd'
  >;
}) {
  return useMemo(() => {
    const startItemValue = first(data)?.[valueKey];
    const endItemValue = last(data)?.[valueKey];
    if (endItemValue == null || startItemValue == null) {
      return {
        fill: PORTFOLIO_CHART_GRADIENT_URLS.pnlPositive,
        stroke: COLORS.positive.DEFAULT,
      };
    }
    const isPositivePnl = endItemValue >= startItemValue;

    return {
      fill: isPositivePnl
        ? PORTFOLIO_CHART_GRADIENT_URLS.pnlPositive
        : PORTFOLIO_CHART_GRADIENT_URLS.pnlNegative,
      stroke: isPositivePnl ? COLORS.positive.DEFAULT : COLORS.negative.DEFAULT,
    };
  }, [data, valueKey]);
}
