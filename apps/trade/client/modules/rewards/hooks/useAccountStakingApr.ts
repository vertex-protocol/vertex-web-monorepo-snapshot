import { AnnotatedSpotMarket } from '@vertex-protocol/metadata';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useAccountStakingMetrics } from 'client/modules/rewards/hooks/useAccountStakingMetrics';
import { useTokenStakingPool } from 'client/modules/rewards/hooks/useTokenStakingPool';
import { calcStakingApr } from 'client/utils/calcs/stakingV1Calcs';
import { useMemo } from 'react';

export function useAccountStakingApr() {
  const { accountScore, accountStaked, protocolTokenMetadata } =
    useAccountStakingMetrics();
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenMetadata.productId,
  });
  const { lastRewardsDistributionAmount, poolTotalScore } =
    useTokenStakingPool();

  return useMemo(() => {
    if (
      !vrtxSpotMarket ||
      !poolTotalScore ||
      !accountScore ||
      !accountStaked ||
      !lastRewardsDistributionAmount
    ) {
      return;
    }

    return calcStakingApr({
      amountStaked: accountStaked,
      stakingScore: accountScore,
      totalStakingScore: poolTotalScore,
      vrtxOraclePrice: vrtxSpotMarket.product.oraclePrice,
      referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
    });
  }, [
    accountScore,
    accountStaked,
    vrtxSpotMarket,
    poolTotalScore,
    lastRewardsDistributionAmount,
  ]);
}
