import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip/PortfolioChartTooltip';
import { PortfolioChartTooltipContent } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/PortfolioChartTooltipContent';
import {
  AREA_CHART_DEFAULTS,
  PORTFOLIO_CHART_DOT_DEFAULTS,
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
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
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

function cumulativeAccountValueUsdDataKey(data: PortfolioChartDataItem) {
  return data.portfolioValueUsd;
}

const renderTooltipBodyContent: PortfolioChartTooltipBodyRenderFn = ({
  portfolioValueUsd,
}: PortfolioChartDataItem) => {
  return (
    <PortfolioChartTooltipContent.Item
      title="Account Value"
      legendColorClassName="bg-accent"
      content={formatNumber(portfolioValueUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
    />
  );
};

export function PortfolioOverviewAccountValueChart({
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
          content={
            <PortfolioChartTooltip renderBody={renderTooltipBodyContent} />
          }
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
          dataKey={cumulativeAccountValueUsdDataKey}
          stroke={COLORS.accent.DEFAULT}
          fill={PORTFOLIO_CHART_GRADIENT_URLS.accountValue}
          activeDot={{
            ...PORTFOLIO_CHART_DOT_DEFAULTS,
            stroke: COLORS.accent.DEFAULT,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
