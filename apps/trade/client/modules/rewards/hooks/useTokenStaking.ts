import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useLbaTokenWalletBalances } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useVrtxTokenSupply } from 'client/hooks/query/vrtxToken/useVrtxTokenSupply';
import { useLastStakingRewardsDistributionAmount } from 'client/modules/rewards/hooks/useLastStakingRewardsDistributionAmount';
import { useStakingPoolAprs } from 'client/modules/rewards/hooks/useStakingPoolAprs';
import {
  calcStakingApr,
  calcStakingScoreRange,
  calcTimeOfMaxStakingScore,
} from 'client/utils/calcs/stakingCalcs';
import { safeDiv } from 'client/utils/safeDiv';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';
import { useMemo } from 'react';

export function useTokenStaking() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { data: stakingState } = useStakingState();
  const { data: lbaWalletBalances } = useLbaTokenWalletBalances();
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenMetadata.productId,
  });
  const { data: vrtxTokenSupply } = useVrtxTokenSupply();
  const quotePriceUsd = usePrimaryQuotePriceUsd();

  const usdcDecimals = lbaWalletBalances?.usdc.tokenDecimals;
  const vrtxDecimals = lbaWalletBalances?.vrtx.tokenDecimals;

  const stakingPoolAprs = useStakingPoolAprs();
  const lastRewardsDistributionAmount =
    useLastStakingRewardsDistributionAmount();

  /*
   * Staking - Pool
   */
  const { poolTotalScore, ...mappedPoolData } = useMemo(() => {
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

    return {
      poolTotalStaked,
      poolTotalScore,
      poolLiquidSupplyFraction,
    };
  }, [stakingState, vrtxTokenSupply, vrtxDecimals]);

  /*
   * Staking - Account
   */
  const mappedAccountData = useMemo(() => {
    // Amount of VRTX staked by the account
    const accountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      vrtxDecimals,
    );

    const accountStakedValueUsd = (() => {
      if (!vrtxSpotMarket || !accountStaked) {
        return;
      }
      return vrtxSpotMarket.product.oraclePrice
        .multipliedBy(accountStaked)
        .multipliedBy(quotePriceUsd);
    })();

    // Amount of VRTX score earned by the account
    const accountScore = removeDecimals(
      accountStakingState?.stakingScore,
      vrtxDecimals,
    );

    const accountMaxScore = (() => {
      if (!accountStaked) {
        return;
      }
      return calcStakingScoreRange(accountStaked).max;
    })();

    // Total staking rewards earned by the account
    const accountUsdcRewardsEarned = removeDecimals(
      accountStakingState?.totalRewards,
      usdcDecimals,
    );

    // Amount of claimable staking rewards
    const accountUsdcRewardsClaimable = removeDecimals(
      accountStakingState?.claimableRewards,
      usdcDecimals,
    );

    // Score multiplier
    const accountScoreMultiplierFraction = (() => {
      if (!accountStaked || !accountScore) {
        return;
      }
      return safeDiv(accountScore, accountStaked);
    })();

    // Account APR
    const accountCurrentApr = (() => {
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
    })();

    const estimatedAccountMaxApr = (() => {
      if (!accountStaked || !stakingPoolAprs) {
        return;
      }
      return accountStaked.gt(0) ? stakingPoolAprs.max : BigDecimals.ZERO;
    })();

    // Account's current share of the pool
    const accountShareFraction =
      poolTotalScore && accountScore
        ? safeDiv(accountScore, poolTotalScore)
        : undefined;

    // Account's estimated maximum share of the pool
    const estimatedAccountMaxShareFraction = (() => {
      if (
        !poolTotalScore ||
        !accountStakingState?.stakingScore ||
        !accountMaxScore ||
        !accountScore
      ) {
        return;
      }
      const scoreDelta = accountMaxScore.minus(accountScore);

      return safeDiv(accountMaxScore, poolTotalScore.plus(scoreDelta));
    })();

    const maxScoreTimeMillis = (() => {
      if (!accountStakingState?.lastActionTime) {
        return;
      }

      return calcTimeOfMaxStakingScore(accountStakingState.lastActionTime)
        .multipliedBy(1000)
        .toNumber();
    })();

    return {
      accountStaked,
      accountStakedValueUsd,
      accountScore,
      accountScoreMultiplierFraction,
      accountUsdcRewardsEarned,
      accountUsdcRewardsClaimable,
      accountCurrentApr,
      estimatedAccountMaxApr,
      accountRewardsClaimed: removeDecimals(
        accountStakingState?.totalRewards.minus(
          accountStakingState.claimableRewards,
        ),
        usdcDecimals,
      ),
      accountUnstakedClaimable: removeDecimals(
        accountStakingState?.unstakedClaimable,
        vrtxDecimals,
      ),
      accountUnstakedLocked: removeDecimals(
        accountStakingState?.unstakedLocked,
        vrtxDecimals,
      ),
      accountMaxScore,
      accountShareFraction,
      estimatedAccountMaxShareFraction,
      maxScoreTimeMillis,
      lastStakeTimeMillis: accountStakingState?.lastStakeTime
        ?.multipliedBy(1000)
        .toNumber(),
      lastUnstakeTimeMillis: accountStakingState?.lastUnstakeTime
        ?.multipliedBy(1000)
        .toNumber(),
    };
  }, [
    accountStakingState,
    poolTotalScore,
    vrtxSpotMarket,
    lastRewardsDistributionAmount,
    vrtxDecimals,
    usdcDecimals,
    quotePriceUsd,
    stakingPoolAprs,
  ]);

  return {
    poolTotalScore,
    poolAvgApr: stakingPoolAprs?.avg,
    lastRewardsDistributionAmount,
    accountAvailableToStake: removeDecimals(
      lbaWalletBalances?.vrtx.balanceAmount,
      vrtxDecimals,
    ),
    ...mappedPoolData,
    ...mappedAccountData,
  };
}
