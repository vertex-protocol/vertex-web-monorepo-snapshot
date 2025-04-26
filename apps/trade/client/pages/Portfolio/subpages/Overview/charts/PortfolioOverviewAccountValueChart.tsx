import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import {
  AREA_CHART_DEFAULTS,
  CHART_DOT_DEFAULTS,
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
import { PORTFOLIO_CHART_GRADIENT_URLS } from 'client/pages/Portfolio/charts/consts';
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

function cumulativeAccountValueUsdDataKey(data: PortfolioChartDataItem) {
  return data.portfolioValueUsd;
}

const renderTooltipBodyContent: PortfolioChartTooltipBodyRenderFn = ({
  portfolioValueUsd,
}: PortfolioChartDataItem) => {
  return (
    <ChartTooltip.Item
      title="Account Value"
      legendColorClassName="bg-accent"
      content={formatNumber(portfolioValueUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
    />
  );
};

export function PortfolioOverviewAccountValueChart({
  data,
  isPrivate,
}: PortfolioChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <CartesianGrid {...CHART_GRID_DEFAULTS} />
        <Tooltip
          {...CHART_TOOLTIP_DEFAULTS}
          content={
            <PortfolioChartTooltip renderBody={renderTooltipBodyContent} />
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
          dataKey={cumulativeAccountValueUsdDataKey}
          stroke={getTradeAppColorVar('accent')}
          fill={PORTFOLIO_CHART_GRADIENT_URLS.accountValue}
          activeDot={{
            ...CHART_DOT_DEFAULTS,
            stroke: getTradeAppColorVar('accent'),
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
