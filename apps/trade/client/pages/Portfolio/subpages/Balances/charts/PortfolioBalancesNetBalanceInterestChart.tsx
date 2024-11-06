import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip';
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
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import {
  ChartComponentProps,
  PortfolioChartDataItem,
} from 'client/pages/Portfolio/charts/types';
import { currencyAxisFormatter } from 'client/pages/Portfolio/charts/utils/axisFormatters';
import { COLORS } from 'common/theme/colors';
import { range } from 'lodash';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function netBalanceDataKey(data: PortfolioChartDataItem) {
  return data.totalNetSpotValueUsd;
}

function interestDataKey(data: PortfolioChartDataItem) {
  return data.cumulativeNetSpotInterestUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  totalNetSpotValueUsd,
  cumulativeNetSpotInterestUsd,
}: PortfolioChartDataItem) => {
  return (
    <>
      <ChartTooltip.Item
        title="Net Balance"
        legendColorClassName="bg-accent"
        content={formatNumber(totalNetSpotValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
      <ChartTooltip.Item
        title="Cumulative Interest"
        legendColorClassName="bg-positive"
        content={formatNumber(cumulativeNetSpotInterestUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
    </>
  );
};

export function PortfolioBalancesNetBalanceInterestChart({
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
        <ComposedChart data={data}>
          <CartesianGrid
            {...PORTFOLIO_CHART_GRID_DEFAULTS}
            // Customized for right y-axis width so grid doesn't overflow into axis
            // Subtracting y-axis width from the chart width on both sides
            verticalCoordinatesGenerator={(props) =>
              range(
                props.offset?.left ?? 0,
                props.width - (props.offset?.right ?? 0),
                10,
              )
            }
          />
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
            yAxisId="net_balance"
            hide={isPrivate}
          />
          <Area
            {...AREA_CHART_DEFAULTS}
            fill={PORTFOLIO_CHART_GRADIENT_URLS.netBalance}
            stroke={COLORS.accent.DEFAULT}
            dataKey={netBalanceDataKey}
            activeDot={{
              stroke: COLORS.accent.DEFAULT,
              fill: COLORS.surface.card,
            }}
            yAxisId="net_balance"
          />
          <YAxis
            {...PORTFOLIO_CHART_YAXIS_DEFAULTS}
            tickFormatter={currencyAxisFormatter}
            orientation="right"
            yAxisId="interest"
          />
          <Area
            {...AREA_CHART_DEFAULTS}
            fill={PORTFOLIO_CHART_GRADIENT_URLS.interest}
            stroke={COLORS.positive.DEFAULT}
            dataKey={interestDataKey}
            activeDot={{
              stroke: COLORS.positive.DEFAULT,
              fill: COLORS.surface.card,
            }}
            yAxisId="interest"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
