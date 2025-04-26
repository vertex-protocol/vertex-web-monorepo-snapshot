import { ChartTooltip } from 'client/components/ChartTooltip';
import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip';
import { PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS } from 'client/pages/Portfolio/charts/consts';
import { usePnlChartColors } from 'client/pages/Portfolio/charts/hooks/usePnlChartColors';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import { PortfolioChartComponentProps } from 'client/pages/Portfolio/charts/types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { currencyAxisFormatter } from 'client/modules/charts/utils/axisFormatters';
import {
  CHART_GRID_DEFAULTS,
  CHART_TOOLTIP_DEFAULTS,
  CHART_XAXIS_DEFAULTS,
  CHART_YAXIS_DEFAULTS,
  AREA_CHART_DEFAULTS,
  CHART_DOT_DEFAULTS,
} from 'client/modules/charts/config';
import { ChartDynamicGradientDefinitions } from 'client/modules/charts/components/ChartDynamicGradientDefinitions/ChartDynamicGradientDefinitions';
import { SignedCurrencyChangeMetric } from 'client/pages/Portfolio/charts/components/SignedCurrencyChangeMetric';

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
      <ChartTooltip.Item
        title="Cumulative PnL"
        content={
          <SignedCurrencyChangeMetric
            value={cumulativeAccountPnlUsd}
            fractionalValue={cumulativeAccountPnlFrac}
          />
        }
      />
      <ChartTooltip.Item
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
}: PortfolioChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();
  const pnlChartColors = usePnlChartColors({
    data,
    valueKey: 'cumulativeAccountPnlUsd',
  });

  return (
    <>
      {/* Gradient definitions component needs to be wrapped in a fragment here
        so we can pass in `data` to determine the gradient stop offset */}
      <ChartDynamicGradientDefinitions
        valueKey="cumulativeAccountPnlUsd"
        gradientConfigs={PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS.pnl}
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
            {...pnlChartColors}
            dataKey={cumulativePnlDataKey}
            activeDot={{
              ...CHART_DOT_DEFAULTS,
              stroke: pnlChartColors.stroke,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
