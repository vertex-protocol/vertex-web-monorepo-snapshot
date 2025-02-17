import { removeDecimals, toBigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useStakingV2State } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { last } from 'lodash';
import { useMemo } from 'react';

export function useStakingV2Rewards() {
  const { data: stakingState, isLoading } = useStakingV2State();
  const {
    protocolTokenMetadata: {
      token: { tokenDecimals: vrtxTokenDecimals },
    },
    primaryQuoteToken: { tokenDecimals: primaryQuoteTokenDecimals },
  } = useVertexMetadataContext();

  const stakingRewardsData = useMemo(() => {
    const lastRewardsDistribution = last(stakingState?.rewardsDistributions);

    if (!lastRewardsDistribution) {
      // On release we will not have a 7 day distribution to reference, so we default to the base of 15%.
      return {
        apr: toBigDecimal(0.15),
        lastVrtxDistributionAmount: undefined,
        lastUsdcDistributionAmount: undefined,
      };
    }
    const lastVrtxDistributionAmount =
      lastRewardsDistribution.baseYieldAmount.plus(
        lastRewardsDistribution.feesYieldAmount,
      );
    const lastUsdcDistributionAmount = removeDecimals(
      lastRewardsDistribution.feesUsdcAmount,
      primaryQuoteTokenDecimals,
    );

    return {
      apr: lastVrtxDistributionAmount
        .multipliedBy(52)
        .dividedBy(lastRewardsDistribution.totalBalance),
      lastVrtxDistributionAmount: removeDecimals(
        lastVrtxDistributionAmount,
        vrtxTokenDecimals,
      ),
      lastUsdcDistributionAmount,
    };
  }, [
    primaryQuoteTokenDecimals,
    stakingState?.rewardsDistributions,
    vrtxTokenDecimals,
  ]);

  return {
    ...stakingRewardsData,
    isLoading,
  };
}
