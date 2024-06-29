import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useLastStakingRewardsDistributionAmount } from 'client/modules/rewards/hooks/useLastStakingRewardsDistributionAmount';
import {
  calcStakingApr,
  calcStakingAprRange,
} from 'client/utils/calcs/stakingCalcs';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';

interface Data {
  // The min/max possible - assumes that the max voVRTX score can be reached (which is not really true for the first 183 days)
  min: BigDecimal;
  max: BigDecimal;
  // Current average APR of the pool given the total voVRTX score and total staked
  avg: BigDecimal;
}

export function useStakingPoolAprs() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: stakingState } = useStakingState();
  const lastRewardsDistributionAmount =
    useLastStakingRewardsDistributionAmount();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenMetadata.productId,
  });

  return useMemo((): Data | undefined => {
    if (!vrtxSpotMarket || !stakingState || !lastRewardsDistributionAmount) {
      return;
    }

    const totalStakingScore = removeDecimals(
      stakingState.totalScore,
      protocolTokenMetadata.token.tokenDecimals,
    );
    const vrtxOraclePrice = vrtxSpotMarket.product.oraclePrice;

    const poolAprRange = calcStakingAprRange({
      referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
      totalStakingScore,
      vrtxOraclePrice,
    });

    return {
      ...poolAprRange,
      avg: calcStakingApr({
        referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
        totalStakingScore,
        vrtxOraclePrice,
        amountStaked: removeDecimals(
          stakingState.totalStaked,
          protocolTokenMetadata.token.tokenDecimals,
        ),
        stakingScore: removeDecimals(
          stakingState.totalScore,
          protocolTokenMetadata.token.tokenDecimals,
        ),
      }),
    };
  }, [
    lastRewardsDistributionAmount,
    stakingState,
    protocolTokenMetadata.token.tokenDecimals,
    vrtxSpotMarket,
  ]);
}
