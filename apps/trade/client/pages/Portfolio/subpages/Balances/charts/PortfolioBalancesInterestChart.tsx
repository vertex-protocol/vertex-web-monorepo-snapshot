import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip/PortfolioChartTooltip';
import { PortfolioChartTooltipContent } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/PortfolioChartTooltipContent';
import { SignedCurrencyChangeMetric } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/SignedCurrencyChangeMetric';
import { PortfolioDynamicGradientDefinitions } from 'client/pages/Portfolio/charts/components/PortfolioDynamicGradientDefinitions';
import {
  AREA_CHART_DEFAULTS,
  PORTFOLIO_CHART_GRADIENT_URLS,
  PORTFOLIO_CHART_GRID_DEFAULTS,
  PORTFOLIO_CHART_TOOLTIP_DEFAULTS,
  PORTFOLIO_CHART_XAXIS_DEFAULTS,
  PORTFOLIO_CHART_YAXIS_DEFAULTS,
  PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS,
} from 'client/pages/Portfolio/charts/consts';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/usePortfolioChartData';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import { ChartComponentProps } from 'client/pages/Portfolio/charts/types';
import { currencyAxisFormatter } from 'client/pages/Portfolio/charts/utils/axisFormatters';
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

function interestDataKey(data: PortfolioChartDataItem) {
  return data.cumulativeNetSpotInterestUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  cumulativeNetSpotInterestUsd,
  deltas: {
    cumulativeNetSpotInterestUsd: cumulativeNetSpotInterestUsdDelta,
    cumulativeNetSpotInterestFrac: cumulativeNetSpotInterestFracDelta,
  },
}: PortfolioChartDataItem) => {
  return (
    <>
      <PortfolioChartTooltipContent.Item
        title="Cumulative Interest"
        legendColorClassName="bg-warning"
        content={
          <SignedCurrencyChangeMetric value={cumulativeNetSpotInterestUsd} />
        }
      />
      <PortfolioChartTooltipContent.Item
        title="Period Change"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativeNetSpotInterestUsdDelta}
            fractionalValue={cumulativeNetSpotInterestFracDelta}
          />
        }
      />
    </>
  );
};

export function PortfolioBalancesInterestChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <PortfolioDynamicGradientDefinitions
        valueKey="cumulativeNetSpotInterestUsd"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.interest}
        data={data}
      />
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid {...PORTFOLIO_CHART_GRID_DEFAULTS} />
          <Tooltip
            {...PORTFOLIO_CHART_TOOLTIP_DEFAULTS}
            content={
              <PortfolioChartTooltip renderBody={renderTooltipContent} />
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
            fill={PORTFOLIO_CHART_GRADIENT_URLS.interest}
            stroke={COLORS.warning.DEFAULT}
            dataKey={interestDataKey}
            activeDot={{
              stroke: COLORS.warning.DEFAULT,
              fill: COLORS.surface.card,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
