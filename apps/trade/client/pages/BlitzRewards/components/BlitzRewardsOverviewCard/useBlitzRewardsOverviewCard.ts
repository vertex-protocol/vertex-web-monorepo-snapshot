import {
  CURRENT_PHASE,
  TOTAL_EPOCH_BLITZ_POINTS,
  TOTAL_BLAST_GOLD_PER_EPOCH,
} from 'client/pages/BlitzRewards/config';
import { useCurrentBlitzPointsEpoch } from 'client/pages/BlitzRewards/hooks/useCurrentBlitzPointsEpoch';
import { addDays } from 'date-fns';
import { useMemo } from 'react';

export function useBlitzRewardsOverviewCard() {
  const currentEpoch = useCurrentBlitzPointsEpoch();

  return useMemo(() => {
    // Next gold distribution starts 1 day after the epoch ends.
    const nextGoldDistributionMillis = currentEpoch
      ? addDays(currentEpoch.endTimeMillis, 1).getTime()
      : undefined;

    const totalEpochBlastGold = currentEpoch
      ? TOTAL_BLAST_GOLD_PER_EPOCH[currentEpoch.epoch]
      : undefined;

    return {
      currentPhase: CURRENT_PHASE,
      currentEpoch,
      totalEpochBlitzPoints: TOTAL_EPOCH_BLITZ_POINTS,
      totalEpochBlastGold,
      nextGoldDistributionMillis: nextGoldDistributionMillis,
    };
  }, [currentEpoch]);
}
