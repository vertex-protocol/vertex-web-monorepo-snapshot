import { BigDecimals, removeDecimals } from '@vertex-protocol/client';
import { useAccountStakingApr } from 'client/modules/rewards/hooks/useAccountStakingApr';
import { useAccountStakingMetrics } from 'client/modules/rewards/hooks/useAccountStakingMetrics';
import { useTokenStakingPool } from 'client/modules/rewards/hooks/useTokenStakingPool';
import { safeDiv } from 'client/utils/safeDiv';
import { useMemo } from 'react';

export function useStakingAprCard() {
  const { poolTotalScore, poolAprRange } = useTokenStakingPool();
  const accountCurrentApr = useAccountStakingApr();
  const {
    accountStaked,
    accountScore,
    accountStakingState,
    accountMaxScore,
    primaryQuoteToken,
  } = useAccountStakingMetrics();

  const quoteDecimals = primaryQuoteToken.tokenDecimals;

  return useMemo(() => {
    const estimatedAccountMaxApr = (() => {
      if (!accountStaked || !poolAprRange) {
        return;
      }
      return accountStaked.gt(0) ? poolAprRange.max : BigDecimals.ZERO;
    })();

    // Total staking rewards earned by the account
    const accountUsdcRewardsEarned = removeDecimals(
      accountStakingState?.totalRewards,
      quoteDecimals,
    );

    // Amount of claimable staking rewards
    const accountUsdcRewardsClaimable = removeDecimals(
      accountStakingState?.claimableRewards,
      quoteDecimals,
    );

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

    return {
      accountCurrentApr,
      estimatedAccountMaxApr,
      accountShareFraction,
      accountUsdcRewardsEarned,
      accountUsdcRewardsClaimable,
      accountRewardsClaimed: removeDecimals(
        accountStakingState?.totalRewards.minus(
          accountStakingState.claimableRewards,
        ),
        quoteDecimals,
      ),
      estimatedAccountMaxShareFraction,
      primaryQuoteToken,
    };
  }, [
    accountStaked,
    accountScore,
    accountMaxScore,
    accountStakingState,
    poolTotalScore,
    poolAprRange,
    quoteDecimals,
    primaryQuoteToken,
    accountCurrentApr,
  ]);
}
