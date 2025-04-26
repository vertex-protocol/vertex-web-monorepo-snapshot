import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
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
import { PORTFOLIO_CHART_GRADIENT_URLS } from 'client/pages/Portfolio/charts/consts';
import { usePortfolioChartXAxisFormatter } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter';
import {
  PortfolioChartComponentProps,
  PortfolioChartDataItem,
} from 'client/pages/Portfolio/charts/types';
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
}: PortfolioChartComponentProps) {
  const xAxisFormatter = usePortfolioChartXAxisFormatter();

  return (
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <CartesianGrid {...CHART_GRID_DEFAULTS} />
        <Tooltip
          {...CHART_TOOLTIP_DEFAULTS}
          content={<PortfolioChartTooltip renderBody={renderTooltipContent} />}
        />
        <XAxis {...CHART_XAXIS_DEFAULTS} tickFormatter={xAxisFormatter} />
        <YAxis
          {...CHART_YAXIS_DEFAULTS}
          tickFormatter={currencyAxisFormatter}
          hide={isPrivate}
        />
        <Area
          {...AREA_CHART_DEFAULTS}
          fill={PORTFOLIO_CHART_GRADIENT_URLS.deposits}
          stroke={getTradeAppColorVar('positive')}
          dataKey={depositsDataKey}
          activeDot={{
            stroke: getTradeAppColorVar('positive'),
            fill: getTradeAppColorVar('surface-card'),
          }}
        />
        <Area
          {...AREA_CHART_DEFAULTS}
          fill={PORTFOLIO_CHART_GRADIENT_URLS.borrows}
          stroke={getTradeAppColorVar('accent')}
          dataKey={borrowsDataKey}
          activeDot={{
            stroke: getTradeAppColorVar('accent'),
            fill: getTradeAppColorVar('surface-card'),
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
