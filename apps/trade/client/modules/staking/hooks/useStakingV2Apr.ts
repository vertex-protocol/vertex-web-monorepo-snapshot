import { removeDecimals, toBigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useStakingV2State } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { last } from 'lodash';
import { useMemo } from 'react';

export function useStakingV2Apr() {
  const {
    protocolTokenMetadata: {
      token: { tokenDecimals: protocolTokenDecimals },
    },
  } = useVertexMetadataContext();
  const { data: stakingState } = useStakingV2State();

  return useMemo(() => {
    if (!stakingState) {
      return undefined;
    }

    const lastRewardsDistribution = last(stakingState.rewardsDistributions);

    if (!lastRewardsDistribution) {
      // On release we will not have a 7 day distribution to reference, so we default to the base of 15%.
      return toBigDecimal(0.15);
    }
    const lastRewardsDistributionAmount = removeDecimals(
      lastRewardsDistribution.baseAmount.plus(
        lastRewardsDistribution.feeAmount,
        protocolTokenDecimals,
      ),
    );

    return lastRewardsDistributionAmount
      .multipliedBy(52)
      .dividedBy(lastRewardsDistribution.totalBalance);
  }, [stakingState, protocolTokenDecimals]);
}
