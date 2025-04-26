import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import { ChartDynamicGradientDefinitions } from 'client/modules/charts/components/ChartDynamicGradientDefinitions/ChartDynamicGradientDefinitions';
import {
  AREA_CHART_DEFAULTS,
  CHART_GRID_DEFAULTS,
  CHART_TOOLTIP_DEFAULTS,
  CHART_XAXIS_DEFAULTS,
  CHART_YAXIS_DEFAULTS,
} from 'client/modules/charts/config';
import { currencyAxisFormatter } from 'client/modules/charts/utils/axisFormatters';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip';
import {
  PORTFOLIO_CHART_GRADIENT_URLS,
  PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS,
} from 'client/pages/Portfolio/charts/consts';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import {
  PortfolioChartComponentProps,
  PortfolioChartDataItem,
} from 'client/pages/Portfolio/charts/types';
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
}: PortfolioChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <ChartDynamicGradientDefinitions
        valueKey="cumulativeNetSpotInterestUsd"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.interest}
        data={data}
      />
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid
            {...CHART_GRID_DEFAULTS}
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
            {...CHART_TOOLTIP_DEFAULTS}
            content={
              <PortfolioChartTooltip renderBody={renderTooltipContent} />
            }
          />
          <XAxis {...CHART_XAXIS_DEFAULTS} tickFormatter={xAxisFormatter} />
          <YAxis
            {...CHART_YAXIS_DEFAULTS}
            tickFormatter={currencyAxisFormatter}
            yAxisId="net_balance"
            hide={isPrivate}
          />
          <Area
            {...AREA_CHART_DEFAULTS}
            fill={PORTFOLIO_CHART_GRADIENT_URLS.netBalance}
            stroke={getTradeAppColorVar('accent')}
            dataKey={netBalanceDataKey}
            activeDot={{
              stroke: getTradeAppColorVar('accent'),
              fill: getTradeAppColorVar('surface-card'),
            }}
            yAxisId="net_balance"
          />
          <YAxis
            {...CHART_YAXIS_DEFAULTS}
            tickFormatter={currencyAxisFormatter}
            orientation="right"
            yAxisId="interest"
          />
          <Area
            {...AREA_CHART_DEFAULTS}
            fill={PORTFOLIO_CHART_GRADIENT_URLS.interest}
            stroke={getTradeAppColorVar('positive')}
            dataKey={interestDataKey}
            activeDot={{
              stroke: getTradeAppColorVar('positive'),
              fill: getTradeAppColorVar('surface-card'),
            }}
            yAxisId="interest"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
