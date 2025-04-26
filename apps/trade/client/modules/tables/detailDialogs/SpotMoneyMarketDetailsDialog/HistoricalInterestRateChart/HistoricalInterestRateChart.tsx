import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import {
  AREA_CHART_DEFAULTS,
  CHART_DOT_DEFAULTS,
  CHART_GRID_DEFAULTS,
  CHART_TOOLTIP_DEFAULTS,
  CHART_XAXIS_DEFAULTS,
  CHART_YAXIS_DEFAULTS,
} from 'client/modules/charts/config';
import { percentageAxisFormatter } from 'client/modules/charts/utils/axisFormatters';
import { HistoricalInterestRateChartTooltip } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/HistoricalInterestRateChartTooltip';
import { HistoricalInterestRateChartTopBar } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/HistoricalInterestRateChartTopBar';
import {
  HistoricalInterestRateChartDataItem,
  useHistoricalInterestRateChartData,
} from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/hooks/useHistoricalInterestRateChartData';
import { HistoricalInterestRateChartTimespan } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/types';
import { getHistoricalInterestRateChartTimespanAxisFormatter } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/utils/getHistoricalInterestRateChartTimespanAxisFormatter';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { useCallback, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const HISTORICAL_INTEREST_RATE_GRADIENT_ID = 'interest_rate';

const HISTORICAL_INTEREST_RATE_GRADIENT_URL = `url(#${HISTORICAL_INTEREST_RATE_GRADIENT_ID})`;

export function HistoricalInterestRateChart({
  productId,
  className,
}: WithClassnames<{
  productId: number;
}>) {
  const [isDeposit, setIsDeposit] = useState(true);
  const [timespan, setTimespan] =
    useState<HistoricalInterestRateChartTimespan>('24h');

  const {
    data: historicalInterestRateChartData,
    isLoading: isLoadingHistoricalRateChartData,
  } = useHistoricalInterestRateChartData({ productId, timespan });

  const xAxisFormatter =
    getHistoricalInterestRateChartTimespanAxisFormatter(timespan);

  const dataKey = useCallback(
    (data: HistoricalInterestRateChartDataItem) => {
      return cumulativeHistoricalInterestRateChartDataKey(data, isDeposit);
    },
    [isDeposit],
  );

  const chartColor = isDeposit
    ? getTradeAppColorVar('positive')
    : getTradeAppColorVar('negative');

  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      <HistoricalInterestRateChartTopBar
        timespan={timespan}
        setTimespan={setTimespan}
        setIsDeposit={setIsDeposit}
        isDeposit={isDeposit}
      />
      <div className="h-74">
        <BrandLoadingWrapper
          iconSizeVariant="sm"
          indicatorContainerClassName="w-full h-full"
          isLoading={isLoadingHistoricalRateChartData}
          grayscale
        >
          {!!historicalInterestRateChartData && (
            <ResponsiveContainer>
              <AreaChart data={historicalInterestRateChartData}>
                <defs>
                  <linearGradient
                    id={HISTORICAL_INTEREST_RATE_GRADIENT_ID}
                    y1={0}
                    y2={1}
                    x1={1}
                    x2={0}
                  >
                    <stop stopColor={chartColor} stopOpacity={0.5} />
                    <stop offset="100%" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...CHART_GRID_DEFAULTS} />
                <Tooltip
                  {...CHART_TOOLTIP_DEFAULTS}
                  content={
                    <HistoricalInterestRateChartTooltip isDeposit={isDeposit} />
                  }
                />
                <XAxis
                  {...CHART_XAXIS_DEFAULTS}
                  tickFormatter={xAxisFormatter}
                />
                <YAxis
                  {...CHART_YAXIS_DEFAULTS}
                  // Reduced width since percentage values typically will show up as integer percentage on y axis.
                  width={40}
                  tickFormatter={percentageAxisFormatter}
                />
                <Area
                  {...AREA_CHART_DEFAULTS}
                  stroke={chartColor}
                  fill={HISTORICAL_INTEREST_RATE_GRADIENT_URL}
                  activeDot={{ ...CHART_DOT_DEFAULTS, stroke: chartColor }}
                  dataKey={dataKey}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </BrandLoadingWrapper>
      </div>
    </div>
  );
}

function cumulativeHistoricalInterestRateChartDataKey(
  data: HistoricalInterestRateChartDataItem,
  isDeposit: boolean,
) {
  return isDeposit ? data.depositAprFraction : data.borrowAprFraction;
}
