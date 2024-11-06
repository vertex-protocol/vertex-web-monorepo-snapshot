import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import {
  PortfolioChartTooltip,
  PortfolioChartTooltipBodyRenderFn,
} from 'client/pages/Portfolio/charts/components/PortfolioChartTooltip';
import {
  AREA_CHART_DEFAULTS,
  PORTFOLIO_CHART_GRADIENT_URLS,
  PORTFOLIO_CHART_GRID_DEFAULTS,
  PORTFOLIO_CHART_TOOLTIP_DEFAULTS,
  PORTFOLIO_CHART_XAXIS_DEFAULTS,
  PORTFOLIO_CHART_YAXIS_DEFAULTS,
} from 'client/pages/Portfolio/charts/consts';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import { ChartComponentProps } from 'client/pages/Portfolio/charts/types';
import { currencyAxisFormatter } from 'client/pages/Portfolio/charts/utils/axisFormatters';
import { COLORS } from 'common/theme/colors';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function depositsDataKey(data: PortfolioChartDataItem) {
  return data.totalDepositsValueUsd;
}

function borrowsDataKey(data: PortfolioChartDataItem) {
  return data.totalAbsBorrowsValueUsd;
}

const renderTooltipContent: PortfolioChartTooltipBodyRenderFn = ({
  totalDepositsValueUsd,
  totalAbsBorrowsValueUsd,
}: PortfolioChartDataItem) => {
  return (
    <>
      <ChartTooltip.Item
        title="Deposits"
        legendColorClassName="bg-positive"
        content={formatNumber(totalDepositsValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
      <ChartTooltip.Item
        title="Borrows"
        legendColorClassName="bg-accent"
        content={formatNumber(totalAbsBorrowsValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
    </>
  );
};

export function PortfolioBalancesDepositsBorrowsChart({
  data,
  isPrivate,
}: ChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <CartesianGrid {...PORTFOLIO_CHART_GRID_DEFAULTS} />
        <Tooltip
          {...PORTFOLIO_CHART_TOOLTIP_DEFAULTS}
          content={<PortfolioChartTooltip renderBody={renderTooltipContent} />}
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
          fill={PORTFOLIO_CHART_GRADIENT_URLS.deposits}
          stroke={COLORS.positive.DEFAULT}
          dataKey={depositsDataKey}
          activeDot={{
            stroke: COLORS.positive.DEFAULT,
            fill: COLORS.surface.card,
          }}
        />
        <Area
          {...AREA_CHART_DEFAULTS}
          fill={PORTFOLIO_CHART_GRADIENT_URLS.borrows}
          stroke={COLORS.accent.DEFAULT}
          dataKey={borrowsDataKey}
          activeDot={{
            stroke: COLORS.accent.DEFAULT,
            fill: COLORS.surface.card,
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
