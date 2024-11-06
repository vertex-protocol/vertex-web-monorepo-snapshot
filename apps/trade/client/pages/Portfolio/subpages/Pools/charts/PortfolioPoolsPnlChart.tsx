import { ChartTooltip } from 'client/components/ChartTooltip';
import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip';
import { PortfolioDynamicGradientDefinitions } from 'client/pages/Portfolio/charts/components/PortfolioDynamicGradientDefinitions';
import { SignedCurrencyChangeMetric } from 'client/pages/Portfolio/charts/components/SignedCurrencyChangeMetric';
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
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
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

function lpPnlDataKey(data: PortfolioChartDataItem) {
  return data.cumulativeLpPnlUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  cumulativeLpPnlUsd,
  cumulativeLpPnlFrac,
  deltas: {
    cumulativeLpPnlUsd: cumulativeLpPnlDeltaUsd,
    cumulativeLpPnlFrac: cumulativeLpPnlDeltaFrac,
  },
}: PortfolioChartDataItem) => {
  return (
    <>
      <ChartTooltip.Item
        title="Cumulative PnL"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativeLpPnlUsd}
            fractionalValue={cumulativeLpPnlFrac}
          />
        }
      />
      <ChartTooltip.Item
        title="Period Change"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativeLpPnlDeltaUsd}
            fractionalValue={cumulativeLpPnlDeltaFrac}
          />
        }
      />
    </>
  );
};

export function PortfolioPoolsPnlChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();
  const pnlChartColors = usePnlChartColors({
    data,
    valueKey: 'cumulativeLpPnlUsd',
  });

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <PortfolioDynamicGradientDefinitions
        valueKey="cumulativeLpPnlUsd"
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
            dataKey={lpPnlDataKey}
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
