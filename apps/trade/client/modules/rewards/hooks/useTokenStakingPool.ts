import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useVrtxTokenSupply } from 'client/hooks/query/vrtxToken/useVrtxTokenSupply';
import { useLastStakingRewardsDistributionAmount } from 'client/modules/rewards/hooks/useLastStakingRewardsDistributionAmount';
import {
  calcStakingApr,
  calcStakingAprRange,
} from 'client/utils/calcs/stakingV1Calcs';
import { safeDiv } from 'client/utils/safeDiv';
import { useMemo } from 'react';

export function useTokenStakingPool() {
  const { protocolTokenMetadata, primaryQuoteToken } =
    useVertexMetadataContext();
  const { data: stakingState } = useStakingState();
  const { data: vrtxTokenSupply } = useVrtxTokenSupply();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenMetadata.productId,
  });
  const lastRewardsDistributionAmount =
    useLastStakingRewardsDistributionAmount();

  const vrtxOraclePrice = vrtxSpotMarket?.product.oraclePrice;

  const vrtxDecimals = protocolTokenMetadata.token.tokenDecimals;

  const {
    poolLiquidSupplyFraction,
    poolAprAvg,
    poolAprRange,
    poolTotalScore,
    poolTotalStaked,
  } = useMemo(() => {
    // Total VRTX stake in the pool
    const poolTotalStaked = removeDecimals(
      stakingState?.totalStaked,
      vrtxDecimals,
    );

    // Total VRTX score in the entire pool
    const poolTotalScore = removeDecimals(
      stakingState?.totalScore,
      vrtxDecimals,
    );

    // Fraction of the total VRTX supply that is staked
    const poolLiquidSupplyFraction =
      vrtxTokenSupply && poolTotalStaked
        ? safeDiv(poolTotalStaked, vrtxTokenSupply.liquidSupply)
        : undefined;

    const poolAprRange = (() => {
      if (
        !lastRewardsDistributionAmount ||
        !poolTotalScore ||
        !vrtxOraclePrice
      ) {
        return undefined;
      }

      return calcStakingAprRange({
        referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
        totalStakingScore: poolTotalScore,
        vrtxOraclePrice,
      });
    })();

    const poolAprAvg = (() => {
      if (
        !lastRewardsDistributionAmount ||
        !poolTotalScore ||
        !poolTotalStaked ||
        !vrtxOraclePrice
      ) {
        return undefined;
      }

      return calcStakingApr({
        referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
        totalStakingScore: poolTotalScore,
        vrtxOraclePrice,
        amountStaked: poolTotalStaked,
        stakingScore: poolTotalScore,
      });
    })();

    return {
      poolTotalStaked,
      poolTotalScore,
      poolLiquidSupplyFraction,
      poolAprAvg,
      poolAprRange,
    };
  }, [
    vrtxTokenSupply,
    lastRewardsDistributionAmount,
    vrtxOraclePrice,
    stakingState?.totalScore,
    stakingState?.totalStaked,
    vrtxDecimals,
  ]);

  return {
    poolTotalScore,
    poolLiquidSupplyFraction,
    poolTotalStaked,
    poolAprAvg,
    poolAprRange,
    lastRewardsDistributionAmount,
    protocolTokenMetadata,
    primaryQuoteToken,
  };
}
