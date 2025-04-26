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
import { SignedCurrencyChangeMetric } from 'client/pages/Portfolio/charts/components/SignedCurrencyChangeMetric';
import {
  PORTFOLIO_CHART_GRADIENT_URLS,
  PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS,
} from 'client/pages/Portfolio/charts/consts';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import {
  PortfolioChartComponentProps,
  PortfolioChartDataItem,
} from 'client/pages/Portfolio/charts/types';
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
}: PortfolioChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <ChartDynamicGradientDefinitions
        valueKey="cumulativePerpFundingUsd"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.funding}
        data={data}
      />
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid {...CHART_GRID_DEFAULTS} />
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
            hide={isPrivate}
          />
          <Area
            {...AREA_CHART_DEFAULTS}
            fill={PORTFOLIO_CHART_GRADIENT_URLS.funding}
            stroke={getTradeAppColorVar('warning')}
            dataKey={cumulativeFundingDataKey}
            activeDot={{
              stroke: getTradeAppColorVar('warning'),
              fill: getTradeAppColorVar('surface-card'),
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
