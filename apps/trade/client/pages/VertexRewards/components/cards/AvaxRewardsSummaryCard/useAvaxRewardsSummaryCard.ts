import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { useClaimFoundationRewards } from 'client/pages/VertexRewards/hooks/useClaimFoundationRewards';
import { useFoundationRewards } from 'client/pages/VertexRewards/hooks/useFoundationRewards';
import { useMemo } from 'react';

export function useAvaxRewardsSummaryCard() {
  const { data: rewardsSummaryData } = useFoundationRewards();
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
    foundationToken,
    isClaimSuccess,
    isClaiming,
    disableClaimButton:
      !isConnected ||
      !mappedData.unclaimedRealizedRewards ||
      mappedData.unclaimedRealizedRewards.isZero(),
  };
}
