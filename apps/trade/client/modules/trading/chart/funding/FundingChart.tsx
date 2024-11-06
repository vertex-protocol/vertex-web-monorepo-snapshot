import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import { FundingChartHeader } from 'client/modules/trading/chart/funding/FundingChartHeader';
import { FundingChartTooltip } from 'client/modules/trading/chart/funding/FundingChartTooltip';
import { useFundingChart } from 'client/modules/trading/chart/funding/useFundingChart';
import {
  percentageAxisFormatter,
  timeAxisFormatter,
} from 'client/pages/Portfolio/charts/utils/axisFormatters';
import { COLORS } from 'common/theme/colors';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COMMON_AXES_CONFIG = {
  tick: { fontSize: 10 },
  axisLine: false,
  tickLine: false,
  stroke: COLORS.text.tertiary,
};

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function FundingChart({ productId, className }: Props) {
  const {
    mappedFundingRates,
    isLoadingMarketSnapshots,
    predictedFundingRate,
    setTimespan,
    timespan,
  } = useFundingChart({
    productId,
  });

  return (
    <div className={joinClassNames('flex flex-col', className)}>
      <FundingChartHeader
        timespan={timespan}
        setTimespan={setTimespan}
        predictedFundingRate={predictedFundingRate}
        className="self-center lg:self-end"
      />
      <BrandLoadingWrapper
        isLoading={isLoadingMarketSnapshots}
        indicatorContainerClassName="flex-1"
        grayscale
      >
        <ResponsiveContainer
          // Adding `8px` padding to the chart container on mobile to compensate for the lack of padding in `MarketDataTabs` component.
          className="p-2 lg:p-0"
        >
          <LineChart data={mappedFundingRates}>
            <CartesianGrid
              stroke={COLORS.stroke.DEFAULT}
              strokeDasharray="3 3"
            />
            <XAxis
              {...COMMON_AXES_CONFIG}
              tickFormatter={timeAxisFormatter}
              height={20}
              tickMargin={8}
              // `interval` represents the number of data points between ticks on the x-axis
              interval={5}
              dataKey="timestampMillis"
            />
            <YAxis
              {...COMMON_AXES_CONFIG}
              tickFormatter={percentageAxisFormatter}
              width={52}
              scale="linear"
              dataKey="fundingRate"
              domain={([dataMin, dataMax]) => {
                // This will be used as the baseline for the min and max values to keep the tick values from getting too small
                const minAbsMax = 0.00001;
                // Find the absolute max for the given data
                const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
                const chartMax = Math.max(absMax * 1.2, minAbsMax);

                return [-chartMax, chartMax];
              }}
            />
            <ReferenceLine y={0} stroke={COLORS.disabled.DEFAULT} />
            <Line
              stroke={COLORS.text.primary}
              dataKey="fundingRate"
              type="natural"
              dot={false}
            />
            <Tooltip
              content={<FundingChartTooltip />}
              cursor={{
                stroke: COLORS.disabled.DEFAULT,
                strokeDasharray: '5 5',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </BrandLoadingWrapper>
    </div>
  );
}
