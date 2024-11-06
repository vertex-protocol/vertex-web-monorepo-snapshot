import { removeDecimals, sumBigDecimalBy } from '@vertex-protocol/client';
import { useAccountFoundationRewardsClaimState } from 'client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { UseFoundationRewards } from 'client/pages/VertexRewards/hooks/types';
import { useMemo } from 'react';

/**
 * This hooks is only used for completed state of foundation rewards. Otherwise use useFoundationRewards.
 */
export function useCompletedStateFoundationRewards(): UseFoundationRewards {
  const foundationToken = useFoundationToken();

  const { data: foundationRewardsClaimState } =
    useAccountFoundationRewardsClaimState();

  const mappedData = useMemo(() => {
    if (!foundationRewardsClaimState) {
      return;
    }

    // Sum(Rewards for each completed week that has been registered on chains)
    const onChainTotalRealizedRewards = removeDecimals(
      sumBigDecimalBy(
        foundationRewardsClaimState.totalClaimableAmounts,
        (claimableAmount) => claimableAmount,
      ),
      foundationToken.tokenDecimals,
    );

    // Claimed rewards from all past weeks.
    const claimedRewards = removeDecimals(
      sumBigDecimalBy(foundationRewardsClaimState.claimedAmounts, (i) => i),
      foundationToken.tokenDecimals,
    );

    // Unclaimed rewards from all past weeks.
    const unclaimedRealizedRewards =
      onChainTotalRealizedRewards.minus(claimedRewards);

    return {
      claimedRewards,
      totalRealizedRewards: onChainTotalRealizedRewards,
      unclaimedRealizedRewards,
      isCompleted: true,
      // Current week is undefined in completed state.
      currentWeek: undefined,
    };
  }, [foundationRewardsClaimState, foundationToken.tokenDecimals]);

  return {
    data: mappedData,
  };
}
