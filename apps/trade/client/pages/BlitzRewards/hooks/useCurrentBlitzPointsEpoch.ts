import { nowInSeconds } from '@vertex-protocol/client';
import { useAddressBlitzPoints } from 'client/hooks/query/points/useAddressBlitzPoints';
import { useMemo } from 'react';

export function useCurrentBlitzPointsEpoch() {
  const { data: blitzPointsData } = useAddressBlitzPoints();

  return useMemo(() => {
    const nowSeconds = nowInSeconds();
    const currentEpoch = blitzPointsData?.blitz.phase2Epochs.find((epoch) => {
      const endTime = epoch.startTime.plus(epoch.period);
      return epoch.startTime.lte(nowSeconds) && endTime.gt(nowSeconds);
    });

    if (!currentEpoch) {
      return;
    }

    const totalPoints = currentEpoch.referralPoints.plus(
      currentEpoch.tradingPoints,
    );

    return {
      ...currentEpoch,
      startTimeMillis: currentEpoch.startTime.times(1000).toNumber(),
      endTimeMillis: currentEpoch.startTime
        .plus(currentEpoch.period)
        .times(1000)
        .toNumber(),
      totalPoints,
      // The query will return the rank as maxRank - 1 if points equal 0,
      // but we want to show nothing rather than an invalid rank
      rank: totalPoints.isZero() ? undefined : currentEpoch.rank,
    };
  }, [blitzPointsData?.blitz.phase2Epochs]);
}
