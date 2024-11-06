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

    return {
      ...currentEpoch,
      startTimeMillis: currentEpoch.startTime.times(1000).toNumber(),
      endTimeMillis: currentEpoch.startTime
        .plus(currentEpoch.period)
        .times(1000)
        .toNumber(),
      totalPoints: currentEpoch.referralPoints
        .plus(currentEpoch.tradingPoints)
        .plus(currentEpoch.referralPoints),
    };
  }, [blitzPointsData?.blitz.phase2Epochs]);
}
