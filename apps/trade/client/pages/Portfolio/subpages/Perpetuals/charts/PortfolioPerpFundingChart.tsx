import { ChartTooltip } from 'client/components/ChartTooltip';
import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip';
import { PortfolioDynamicGradientDefinitions } from 'client/pages/Portfolio/charts/components/PortfolioDynamicGradientDefinitions';
import { SignedCurrencyChangeMetric } from 'client/pages/Portfolio/charts/components/SignedCurrencyChangeMetric';
import {
  AREA_CHART_DEFAULTS,
  PORTFOLIO_CHART_GRADIENT_URLS,
  PORTFOLIO_CHART_GRID_DEFAULTS,
  PORTFOLIO_CHART_TOOLTIP_DEFAULTS,
  PORTFOLIO_CHART_XAXIS_DEFAULTS,
  PORTFOLIO_CHART_YAXIS_DEFAULTS,
  PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS,
} from 'client/pages/Portfolio/charts/consts';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
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

function cumulativeFundingDataKey(data: PortfolioChartDataItem) {
  return data.cumulativePerpFundingUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  cumulativePerpFundingUsd,
  deltas: {
    cumulativePerpFundingUsd: cumulativePerpFundingUsdDelta,
    cumulativePerpFundingFrac: cumulativePerpFundingFracDelta,
  },
}: PortfolioChartDataItem) => {
  return (
    <>
      <ChartTooltip.Item
        title="Net Funding"
        legendColorClassName="bg-warning"
        content={
          <SignedCurrencyChangeMetric value={cumulativePerpFundingUsd} />
        }
      />
      <ChartTooltip.Item
        title="Period Change"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativePerpFundingUsdDelta}
            fractionalValue={cumulativePerpFundingFracDelta}
          />
        }
      />
    </>
  );
};

export function PortfolioPerpFundingChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <PortfolioDynamicGradientDefinitions
        valueKey="cumulativePerpFundingUsd"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.funding}
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
            fill={PORTFOLIO_CHART_GRADIENT_URLS.funding}
            stroke={COLORS.warning.DEFAULT}
            dataKey={cumulativeFundingDataKey}
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
