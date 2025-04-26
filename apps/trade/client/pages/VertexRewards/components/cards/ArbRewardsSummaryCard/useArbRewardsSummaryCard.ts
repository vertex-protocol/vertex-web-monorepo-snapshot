import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { useClaimFoundationRewards } from 'client/pages/VertexRewards/hooks/useClaimFoundationRewards';
import { useCompletedStateFoundationRewards } from 'client/pages/VertexRewards/hooks/useCompletedStateFoundationRewards';
import { useMemo } from 'react';

// Configuration for the rewards round
const PAST_ROUND_END_WEEK = 16;
const NEW_ROUND_END_WEEK = 28;
const ROUND_DURATION_IN_WEEKS = NEW_ROUND_END_WEEK - PAST_ROUND_END_WEEK;
const CURRENT_ROUND = 2;

export function useArbRewardsSummaryCard() {
  const { data: rewardsSummaryData } = useCompletedStateFoundationRewards();
  const {
    claim,
    isSuccess: isClaimSuccess,
    isLoading: isClaiming,
  } = useClaimFoundationRewards();
  const foundationToken = useFoundationToken();
  const isConnected = useIsConnected();

  const mappedData = useMemo(() => {
    if (!rewardsSummaryData) {
      return {};
    }

    const currentWeek = rewardsSummaryData.currentWeek?.week
      ? rewardsSummaryData.currentWeek.week - PAST_ROUND_END_WEEK
      : undefined;

    return {
      roundDurationInWeeks: ROUND_DURATION_IN_WEEKS,
      currentRound: CURRENT_ROUND,
      currentWeek,
      currentWeekEndTimeMillis: rewardsSummaryData.currentWeek?.endTimeMillis,
      estimatedWeekRewards: rewardsSummaryData.currentWeek?.addressRewards,
      totalRealizedRewards: rewardsSummaryData.totalRealizedRewards,
      claimedRewards: rewardsSummaryData.claimedRewards,
      unclaimedRealizedRewards: rewardsSummaryData.unclaimedRealizedRewards,
      isCompleted: rewardsSummaryData.isCompleted,
    };
  }, [rewardsSummaryData]);

  return {
    ...mappedData,
    onClaimClick: claim,
    foundationToken,
    isClaimSuccess,
    isClaiming,
    disableClaimButton:
      !isConnected ||
      !mappedData.unclaimedRealizedRewards ||
      mappedData.unclaimedRealizedRewards.isZero(),
  };
}
