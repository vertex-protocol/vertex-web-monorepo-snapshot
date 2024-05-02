import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip/PortfolioChartTooltip';
import { PortfolioChartTooltipContent } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/PortfolioChartTooltipContent';
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
import {
  currencyAxisFormatter,
  percentageAxisFormatter,
} from 'client/pages/Portfolio/charts/utils/axisFormatters';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
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
import { ChartCoordinate } from 'recharts/types/util/types';

function netBalanceDataKey(data: PortfolioChartDataItem) {
  return data.totalNetSpotValueUsd;
}

function aprDataKey(data: PortfolioChartDataItem) {
  return data.averageSpotApr;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  totalNetSpotValueUsd,
  averageSpotApr,
}: PortfolioChartDataItem) => {
  return (
    <>
      <PortfolioChartTooltipContent.Item
        title="Net Balance"
        legendColorClassName="bg-accent"
        content={formatNumber(totalNetSpotValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
      <PortfolioChartTooltipContent.Item
        title="Net APR"
        legendColorClassName="bg-warning"
        content={formatNumber(averageSpotApr, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      />
    </>
  );
};

export function PortfolioBalancesNetBalanceAprChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <PortfolioDynamicGradientDefinitions
        valueKey="averageSpotApr"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.apr}
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
            tickFormatter={percentageAxisFormatter}
            orientation="right"
            yAxisId="apr"
          />
          <Area
            {...AREA_CHART_DEFAULTS}
            fill={PORTFOLIO_CHART_GRADIENT_URLS.apr}
            stroke={COLORS.warning.DEFAULT}
            dataKey={aprDataKey}
            activeDot={{
              stroke: COLORS.warning.DEFAULT,
              fill: COLORS.surface.card,
            }}
            yAxisId="apr"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
