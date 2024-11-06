import { useMakerStatisticsCharts } from 'client/components/MakerStatisticsCharts/useMakerStatisticsCharts';
import { useMemo } from 'react';
import {
  getIntervalAxisFormatter,
  largeNumberAbbreviatedAxisFormatter,
  largeNumberAsExponentialAxisFormatter,
  percentageAxisFormatter,
} from 'client/components/MakerStatisticsCharts/MakerMetricChart/axisFormatters';
import { MakerMetricChart } from 'client/components/MakerStatisticsCharts/MakerMetricChart/MakerMetricChart';

const COMMON_CHART_CLASSNAMES = 'min-h-96';

interface Props {
  productId: number | undefined;
  epoch: number | undefined;
  interval: number;
  isBlast: boolean;
}

export function MakerStatisticsCharts({
  productId,
  epoch,
  interval,
  isBlast,
}: Props) {
  const { data, isLoading } = useMakerStatisticsCharts({
    productId,
    epoch,
    interval,
  });

  const xAxisTickFormatter = useMemo(() => {
    return getIntervalAxisFormatter(interval);
  }, [interval]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {!isBlast && (
        <MakerMetricChart
          className={COMMON_CHART_CLASSNAMES}
          isLoading={isLoading}
          chartTitle="Expected VRTX Rewards per MM"
          data={data.expectedMakerRewards}
          addresses={data.addresses}
          chartInfoTooltipLabel="The estimated VRTX rewards per MM for this market."
          xAxisProps={{
            tickFormatter: xAxisTickFormatter,
          }}
          yAxisProps={{
            tickFormatter: largeNumberAbbreviatedAxisFormatter,
          }}
          chartType="area"
        />
      )}
      <MakerMetricChart
        className={COMMON_CHART_CLASSNAMES}
        isLoading={isLoading}
        chartTitle="Reward Share for Market (%)"
        data={data.makerShares}
        addresses={data.addresses}
        chartInfoTooltipLabel="The relative Q-scores for each MM in this market. The relative Q-score is based on the cumulative Q-score from the start of the epoch to the time of the data-point."
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: percentageAxisFormatter,
          domain: [0, 1],
        }}
        chartType="area"
      />
      <MakerMetricChart
        className={COMMON_CHART_CLASSNAMES}
        isLoading={isLoading}
        chartTitle="Maker Fee for Market (%)"
        data={data.makerFees}
        addresses={data.addresses}
        chartInfoTooltipLabel="A percentage breakdown of each MM's maker fees for this market."
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: percentageAxisFormatter,
          domain: [0, 1],
        }}
        chartType="area"
      />
      <MakerMetricChart
        className={COMMON_CHART_CLASSNAMES}
        isLoading={isLoading}
        chartTitle="Uptime for Market (%)"
        data={data.uptimes}
        addresses={data.addresses}
        chartInfoTooltipLabel="MM's uptime (%) in this market."
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: percentageAxisFormatter,
          domain: [0, 1],
        }}
        chartType="line"
      />
      <MakerMetricChart
        isLoading={isLoading}
        chartTitle="Per-Minute Q Score"
        className={COMMON_CHART_CLASSNAMES}
        data={data.qScores}
        addresses={data.addresses}
        chartInfoTooltipLabel="A combination of Uptime, Sum Q Min, and Maker Fee to evaluate MM's contribution to market making. The amount of VRTX earned by MMs is proportional to their relative Q-score."
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeNumberAsExponentialAxisFormatter,
          scale: 'log',
        }}
        chartType="line"
      />
      <MakerMetricChart
        isLoading={isLoading}
        chartTitle="Sum Q Min"
        className={COMMON_CHART_CLASSNAMES}
        data={data.sumQMins}
        addresses={data.addresses}
        chartInfoTooltipLabel="A representation of a MM's two-sided quoting performance in this market."
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeNumberAsExponentialAxisFormatter,
          scale: 'log',
        }}
        chartType="line"
      />
      <MakerMetricChart
        isLoading={isLoading}
        chartTitle="Average Q Min"
        className={COMMON_CHART_CLASSNAMES}
        data={data.avgQMins}
        addresses={data.addresses}
        chartInfoTooltipLabel="The average Q min per minute for each MM in this market."
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeNumberAsExponentialAxisFormatter,
          scale: 'log',
        }}
        chartType="line"
      />
    </div>
  );
}
