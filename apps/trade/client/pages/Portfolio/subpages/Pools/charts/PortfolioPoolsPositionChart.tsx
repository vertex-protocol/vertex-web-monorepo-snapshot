import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip/PortfolioChartTooltip';
import { PortfolioChartTooltipContent } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/PortfolioChartTooltipContent';
import {
  AREA_CHART_DEFAULTS,
  PORTFOLIO_CHART_GRADIENT_URLS,
  PORTFOLIO_CHART_GRID_DEFAULTS,
  PORTFOLIO_CHART_TOOLTIP_DEFAULTS,
  PORTFOLIO_CHART_XAXIS_DEFAULTS,
  PORTFOLIO_CHART_YAXIS_DEFAULTS,
} from 'client/pages/Portfolio/charts/consts';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/usePortfolioChartData';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import { ChartComponentProps } from 'client/pages/Portfolio/charts/types';
import { currencyAxisFormatter } from 'client/pages/Portfolio/charts/utils/axisFormatters';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { COLORS } from 'common/theme/colors';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function lpPositionDataKey(data: PortfolioChartDataItem) {
  return data.totalLpValueUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  totalLpValueUsd,
}: PortfolioChartDataItem) => {
  return (
    <>
      <PortfolioChartTooltipContent.Item
        title="Position Value"
        legendColorClassName="bg-accent"
        content={formatNumber(totalLpValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
    </>
  );
};

export function PortfolioPoolsPositionChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <CartesianGrid {...PORTFOLIO_CHART_GRID_DEFAULTS} />
        <Tooltip
          {...PORTFOLIO_CHART_TOOLTIP_DEFAULTS}
          content={<PortfolioChartTooltip renderBody={renderTooltipContent} />}
        />
        <XAxis
          {...PORTFOLIO_CHART_XAXIS_DEFAULTS}
          tickFormatter={xAxisFormatter}
        />
        <YAxis
          {...PORTFOLIO_CHART_YAXIS_DEFAULTS}
          tickFormatter={currencyAxisFormatter}
          hide={isPrivate}
        />
        <Area
          {...AREA_CHART_DEFAULTS}
          fill={PORTFOLIO_CHART_GRADIENT_URLS.lpPosition}
          stroke={COLORS.accent.DEFAULT}
          dataKey={lpPositionDataKey}
          activeDot={{
            stroke: COLORS.accent.DEFAULT,
            fill: COLORS.surface.card,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
