import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import {
  percentageAxisFormatter,
  timeAxisFormatter,
} from 'client/modules/charts/utils/axisFormatters';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { FundingChartHeader } from 'client/modules/trading/chart/funding/FundingChartHeader';
import { FundingChartTooltip } from 'client/modules/trading/chart/funding/FundingChartTooltip';
import { useFundingChart } from 'client/modules/trading/chart/funding/useFundingChart';
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
  stroke: getTradeAppColorVar('text-tertiary'),
};

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function FundingChart({ productId, className }: Props) {
  const {
    mappedFundingRates,
    isLoadingEdgeMarketSnapshotsData,
    predictedFundingRate,
  } = useFundingChart({
    productId,
  });

  return (
    <div className={joinClassNames('flex flex-col', className)}>
      <FundingChartHeader
        predictedFundingRate={predictedFundingRate}
        className="self-center lg:self-end"
      />
      <BrandLoadingWrapper
        isLoading={isLoadingEdgeMarketSnapshotsData}
        indicatorContainerClassName="flex-1"
        grayscale
      >
        <ResponsiveContainer
          // Adding `8px` padding to the chart container on mobile to compensate for the lack of padding in `MarketDataTabs` component.
          className="p-2 lg:p-0"
        >
          <LineChart data={mappedFundingRates}>
            <CartesianGrid
              stroke={getTradeAppColorVar('stroke')}
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
            <ReferenceLine y={0} stroke={getTradeAppColorVar('disabled')} />
            <Line
              stroke={getTradeAppColorVar('text-primary')}
              dataKey="fundingRate"
              type="natural"
              dot={false}
            />
            <Tooltip
              content={<FundingChartTooltip />}
              cursor={{
                stroke: getTradeAppColorVar('disabled'),
                strokeDasharray: '5 5',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </BrandLoadingWrapper>
    </div>
  );
}
