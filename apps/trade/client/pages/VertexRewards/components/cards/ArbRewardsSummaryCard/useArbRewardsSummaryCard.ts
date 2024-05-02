import { sumBigDecimalBy } from '@vertex-protocol/utils';
import { useAccountArbRewardsClaimState } from 'client/hooks/query/arbRewards/useAccountArbRewardsClaimState';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useArbToken } from 'client/modules/rewards/hooks/useArbToken';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { useMemo } from 'react';
import { useClaimArbRewards } from './useClaimArbRewards';

export function useArbRewardsSummaryCard() {
  const {
    claim,
    isSuccess: isClaimSuccess,
    isLoading: isClaiming,
  } = useClaimArbRewards();
  const arbToken = useArbToken();
  const userActionState = useUserActionState();
  const { data: arbRewardsClaimState } = useAccountArbRewardsClaimState();

  const mappedData = useMemo(() => {
    if (!arbRewardsClaimState) {
      return {};
    }

    const onChainTotalRealizedRewards = removeDecimals(
      sumBigDecimalBy(arbRewardsClaimState.totalClaimableAmounts, (i) => i),
      arbToken.tokenDecimals,
    );

    const claimedRewards = removeDecimals(
      sumBigDecimalBy(arbRewardsClaimState.claimedAmounts, (i) => i),
      arbToken.tokenDecimals,
    );

    const unclaimedRealizedRewards =
      onChainTotalRealizedRewards.minus(claimedRewards);

    return {
      onChainTotalRealizedRewards,
      claimedRewards,
      unclaimedRealizedRewards,
    };
  }, [arbRewardsClaimState, arbToken.tokenDecimals]);

  return {
    ...mappedData,
    onClaimClick: claim,
    arbToken,
    isClaimSuccess,
    isClaiming,
    disableClaimButton:
      userActionState === 'block_all' ||
      !mappedData.unclaimedRealizedRewards ||
      mappedData.unclaimedRealizedRewards.isZero(),
  };
}
