import { MakerMetricChartDataItem } from 'client/components/MakerStatisticsCharts/MakerMetricChart/types';
import { useMakerStatistics } from 'client/hooks/query/useMakerStatistics';
import { useMemo } from 'react';

interface Params {
  productId: number | undefined;
  epoch: number | undefined;
  interval: number;
}

export function useMakerStatisticsCharts({
  productId,
  epoch,
  interval,
}: Params) {
  const {
    data: makerStatisticsData,
    isLoading,
    isPending,
  } = useMakerStatistics({
    productId,
    epoch,
    interval,
  });

  const mappedData = useMemo(() => {
    if (!makerStatisticsData) {
      return {
        expectedMakerRewards: undefined,
        makerShares: undefined,
        makerFees: undefined,
        uptimes: undefined,
        qScores: undefined,
        sumQMins: undefined,
        avgQMins: undefined,
        addresses: undefined,
      };
    }

    const addresses: string[] = [];
    const avgSumQMinByTimestamp: Record<number, MakerMetricChartDataItem> = {};
    const expectedMakerRewardsByTimestamp: Record<
      number,
      MakerMetricChartDataItem
    > = {};
    const makerSharesByTimestamp: Record<number, MakerMetricChartDataItem> = {};
    const makerFeesByTimestamp: Record<number, MakerMetricChartDataItem> = {};
    const uptimesByTimestamp: Record<number, MakerMetricChartDataItem> = {};
    const qScoresByTimestamp: Record<number, MakerMetricChartDataItem> = {};
    const sumQMinsByTimestamp: Record<number, MakerMetricChartDataItem> = {};

    makerStatisticsData.makers.forEach((maker) => {
      addresses.push(maker.address);

      let lastTimestamp = 0;
      let lastSumQMin = 0;
      let lastAvgQMin = 0;

      maker.snapshots.forEach((snapshot) => {
        const timestamp = snapshot.timestamp.toNumber();
        const sumQMin = snapshot.sumQMin.toNumber();
        const expectedMakerReward = snapshot.expectedMakerReward.toNumber();
        const makerShare = snapshot.makerShare.toNumber();
        const makerFee = snapshot.makerFee.toNumber();
        const uptime = snapshot.uptime.toNumber();
        const qScore = snapshot.qScore.toNumber();
        const timestampMillis = timestamp * 1000;

        expectedMakerRewardsByTimestamp[timestampMillis] = {
          ...expectedMakerRewardsByTimestamp[timestampMillis],
          [maker.address]: expectedMakerReward,
          timestampMillis,
        };

        makerSharesByTimestamp[timestampMillis] = {
          ...makerSharesByTimestamp[timestampMillis],
          [maker.address]: makerShare,
          timestampMillis,
        };

        makerFeesByTimestamp[timestampMillis] = {
          ...makerFeesByTimestamp[timestampMillis],
          [maker.address]: makerFee,
          timestampMillis,
        };

        uptimesByTimestamp[timestampMillis] = {
          ...uptimesByTimestamp[timestampMillis],
          [maker.address]: uptime,
          timestampMillis,
        };

        qScoresByTimestamp[timestampMillis] = {
          ...qScoresByTimestamp[timestampMillis],
          // We use log scale for qScore, sumQMin and avgQMin.
          // As log scale doesn't support 0 values. So we return undefined to skip it from rendering on the chart at specific timestamp.
          [maker.address]: qScore !== 0 ? qScore : undefined,
          timestampMillis,
        };

        sumQMinsByTimestamp[timestampMillis] = {
          ...sumQMinsByTimestamp[timestampMillis],
          [maker.address]: sumQMin !== 0 ? sumQMin : undefined,
          timestampMillis,
        };

        // Calculate avgQMin
        if (lastTimestamp !== 0) {
          const timestampDiffInSeconds = timestamp - lastTimestamp;
          const sumQMinDiff = sumQMin - lastSumQMin;
          let avgQMin = sumQMinDiff / (timestampDiffInSeconds / 60);

          if (avgQMin === 0) {
            avgQMin = lastAvgQMin;
          } else {
            // Update the last known avgQMin value
            lastAvgQMin = avgQMin;
          }

          avgSumQMinByTimestamp[timestampMillis] = {
            ...avgSumQMinByTimestamp[timestampMillis],
            [maker.address]: avgQMin !== 0 ? avgQMin : undefined,
            timestampMillis,
          };
        }

        // Store last timestamp and sumQMin
        lastTimestamp = timestamp;
        lastSumQMin = sumQMin;
      });
    });

    return {
      expectedMakerRewards: Object.values(expectedMakerRewardsByTimestamp),
      makerShares: Object.values(makerSharesByTimestamp),
      makerFees: Object.values(makerFeesByTimestamp),
      uptimes: Object.values(uptimesByTimestamp),
      qScores: Object.values(qScoresByTimestamp),
      sumQMins: Object.values(sumQMinsByTimestamp),
      avgQMins: Object.values(avgSumQMinByTimestamp),
      // We need to sort the addresses otherwise it would occasional display in a random order after data fetching.
      addresses: addresses.sort(),
    };
  }, [makerStatisticsData]);

  return {
    data: mappedData,
    isLoading: isLoading || isPending,
  };
}
