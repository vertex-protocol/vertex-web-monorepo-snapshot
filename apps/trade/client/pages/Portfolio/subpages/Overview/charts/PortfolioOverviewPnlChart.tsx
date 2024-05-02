import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip/PortfolioChartTooltip';
import { PortfolioChartTooltipContent } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/PortfolioChartTooltipContent';
import { SignedCurrencyChangeMetric } from 'client/pages/Portfolio/charts/components/PortfolioChartTooltipContent/SignedCurrencyChangeMetric';
import { PortfolioDynamicGradientDefinitions } from 'client/pages/Portfolio/charts/components/PortfolioDynamicGradientDefinitions';
import {
  AREA_CHART_DEFAULTS,
  PORTFOLIO_CHART_DOT_DEFAULTS,
  PORTFOLIO_CHART_GRID_DEFAULTS,
  PORTFOLIO_CHART_TOOLTIP_DEFAULTS,
  PORTFOLIO_CHART_XAXIS_DEFAULTS,
  PORTFOLIO_CHART_YAXIS_DEFAULTS,
  PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS,
} from 'client/pages/Portfolio/charts/consts';
import { usePnlChartColors } from 'client/pages/Portfolio/charts/hooks/usePnlChartColors';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/usePortfolioChartData';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import { ChartComponentProps } from 'client/pages/Portfolio/charts/types';
import { currencyAxisFormatter } from 'client/pages/Portfolio/charts/utils/axisFormatters';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function cumulativePnlDataKey(data: PortfolioChartDataItem) {
  return data.cumulativeAccountPnlUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  cumulativeAccountPnlUsd,
  cumulativeAccountPnlFrac,
  deltas: {
    cumulativeAccountPnlUsd: cumulativeAccountPnlUsdDelta,
    cumulativeAccountPnlFrac: cumulativeAccountPnlFracDelta,
  },
}: PortfolioChartDataItem) => {
  return (
    <>
      <PortfolioChartTooltipContent.Item
        title="Cumulative PnL"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativeAccountPnlUsd}
            fractionalValue={cumulativeAccountPnlFrac}
          />
        }
      />
      <PortfolioChartTooltipContent.Item
        title="Period Change"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativeAccountPnlUsdDelta}
            fractionalValue={cumulativeAccountPnlFracDelta}
          />
        }
      />
    </>
  );
};

export function PortfolioOverviewPnlChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();
  const pnlChartColors = usePnlChartColors({
    data,
    valueKey: 'cumulativeAccountPnlUsd',
  });

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <PortfolioDynamicGradientDefinitions
        valueKey="cumulativeAccountPnlUsd"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.pnl}
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
            {...pnlChartColors}
            dataKey={cumulativePnlDataKey}
            activeDot={{
              ...PORTFOLIO_CHART_DOT_DEFAULTS,
              stroke: pnlChartColors.stroke,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
