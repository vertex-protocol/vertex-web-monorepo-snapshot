import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { useClaimMantleRewards } from 'client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/useClaimMantleRewards';
import { useCompletedStateFoundationRewards } from 'client/pages/VertexRewards/hooks/useCompletedStateFoundationRewards';
import { useMemo } from 'react';

export function useMantleRewardsSummaryCard() {
  const { data: rewardsSummaryData } = useCompletedStateFoundationRewards();
  const {
    claim,
    isSuccess: isClaimSuccess,
    isLoading: isClaiming,
  } = useClaimMantleRewards();
  const mantleToken = useFoundationToken();
  const isConnected = useIsConnected();

  const mappedData = useMemo(() => {
    if (!rewardsSummaryData) {
      return {};
    }

    return {
      currentWeek: rewardsSummaryData.currentWeek?.week,
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
    mantleToken,
    isClaimSuccess,
    isClaiming,
    disableClaimButton:
      !isConnected ||
      !mappedData.unclaimedRealizedRewards ||
      mappedData.unclaimedRealizedRewards.isZero(),
  };
}
