import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useLastStakingRewardsDistributionAmount } from 'client/modules/rewards/hooks/useLastStakingRewardsDistributionAmount';
import {
  calcStakingApr,
  calcStakingAprRange,
  calcStakingScoreRange,
  calcTimeOfMaxStakingScore,
} from 'client/utils/calcs/stakingCalcs';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';
import { now } from 'lodash';
import { useMemo } from 'react';

export interface StakingDialogAccountState {
  accountAmountStaked: BigDecimal | undefined;
  accountStakingScore: BigDecimal | undefined;
  accountMaxScore: BigDecimal | undefined;
  accountApr: BigDecimal | undefined;
  accountMaxApr: BigDecimal | undefined;
}

export function useStakingSummary({
  validAmount,
  isUnstake,
}: {
  validAmount: BigDecimal | undefined;
  isUnstake: boolean;
}) {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { data: stakingState } = useStakingState();
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenMetadata.productId,
  });

  const lastRewardsDistributionAmount =
    useLastStakingRewardsDistributionAmount();

  const {
    nowInMillis,
    maxScoreTimeMillis,
    unstakeUnlockTimeMillis,
    poolTotalScore,
    accountApr,
    accountMaxApr,
    accountScoreRange,
    accountAmountStaked,
    accountStakingScore,
  } = useMemo(() => {
    const nowInMillis = now();

    const maxScoreTimeMillis = calcTimeOfMaxStakingScore(
      toBigDecimal(nowInMillis / 1000),
    )
      .multipliedBy(1000)
      .toNumber();

    const unstakeUnlockTimeMillis =
      stakingState?.unstakeUnlockTimeIntervalMillis
        .plus(nowInMillis)
        .toNumber();

    const accountAmountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      protocolTokenMetadata.token.tokenDecimals,
    );

    const accountStakingScore = removeDecimals(
      accountStakingState?.stakingScore,
      protocolTokenMetadata.token.tokenDecimals,
    );

    const poolTotalScore = removeDecimals(
      stakingState?.totalScore,
      protocolTokenMetadata.token.tokenDecimals,
    );

    const accountScoreRange = (() => {
      if (!accountAmountStaked) {
        return;
      }
      return calcStakingScoreRange(accountAmountStaked);
    })();

    const { accountApr, accountMaxApr } = (() => {
      if (
        !accountStakingScore ||
        !accountAmountStaked ||
        !lastRewardsDistributionAmount ||
        !poolTotalScore ||
        !vrtxSpotMarket
      ) {
        return { accountApr: undefined, accountMaxApr: undefined };
      }

      return {
        accountApr: calcStakingApr({
          amountStaked: accountAmountStaked,
          stakingScore: accountStakingScore,
          referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
          totalStakingScore: poolTotalScore,
          vrtxOraclePrice: vrtxSpotMarket.product.oraclePrice,
        }),
        accountMaxApr: accountAmountStaked.gt(0)
          ? calcStakingAprRange({
              referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
              totalStakingScore: poolTotalScore,
              vrtxOraclePrice: vrtxSpotMarket.product.oraclePrice,
            }).max
          : BigDecimals.ZERO,
      };
    })();

    return {
      nowInMillis,
      maxScoreTimeMillis,
      unstakeUnlockTimeMillis,
      poolTotalScore,
      accountAmountStaked,
      accountStakingScore,
      accountApr,
      accountMaxApr,
      accountScoreRange,
    };
  }, [
    stakingState?.unstakeUnlockTimeIntervalMillis,
    stakingState?.totalScore,
    accountStakingState?.amountStaked,
    accountStakingState?.stakingScore,
    protocolTokenMetadata.token.tokenDecimals,
    lastRewardsDistributionAmount,
    vrtxSpotMarket,
  ]);

  // Estimated staking items based on a valid input
  const estimatedStakingSummary = useMemo(():
    | StakingDialogAccountState
    | undefined => {
    // Returning early if there is no valid input
    // or we don't have data, so all values in the estimate are defined
    if (
      !accountStakingScore ||
      !accountAmountStaked ||
      !validAmount ||
      !poolTotalScore ||
      !vrtxSpotMarket
    ) {
      return;
    }

    const estimatedAccountStaked = isUnstake
      ? accountAmountStaked.minus(validAmount)
      : accountAmountStaked.plus(validAmount);

    const estimatedAccountStakingScore = isUnstake
      ? calcStakingScoreRange(estimatedAccountStaked).min
      : accountStakingScore.plus(calcStakingScoreRange(validAmount).min);

    const estimatedAccountStakingScoreDelta =
      estimatedAccountStakingScore.minus(accountStakingScore);

    const estimatedPoolTotalScore = poolTotalScore.plus(
      estimatedAccountStakingScoreDelta,
    );

    const estimatedAccountApr = lastRewardsDistributionAmount
      ? calcStakingApr({
          amountStaked: estimatedAccountStaked,
          stakingScore: estimatedAccountStakingScore,
          referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
          totalStakingScore: estimatedPoolTotalScore,
          vrtxOraclePrice: vrtxSpotMarket.product.oraclePrice,
        })
      : undefined;

    const estimatedAccountMaxApr = lastRewardsDistributionAmount
      ? calcStakingAprRange({
          referenceWeeklyUsdcDistribution: lastRewardsDistributionAmount,
          totalStakingScore: estimatedPoolTotalScore,
          vrtxOraclePrice: vrtxSpotMarket.product.oraclePrice,
        }).max
      : undefined;

    return {
      accountAmountStaked: estimatedAccountStaked,
      accountStakingScore: estimatedAccountStakingScore,
      accountMaxScore: calcStakingScoreRange(estimatedAccountStaked).max,
      accountApr: estimatedAccountApr,
      accountMaxApr: estimatedAccountStaked.gt(0)
        ? estimatedAccountMaxApr
        : BigDecimals.ZERO,
    };
  }, [
    isUnstake,
    validAmount,
    accountAmountStaked,
    poolTotalScore,
    accountStakingScore,
    lastRewardsDistributionAmount,
    vrtxSpotMarket,
  ]);

  const currentStakingSummary = {
    accountAmountStaked,
    accountStakingScore,
    accountMaxScore: accountScoreRange?.max,
    accountApr,
    accountMaxApr,
  };

  return {
    currentSummary: currentStakingSummary,
    estimatedSummary: estimatedStakingSummary,
    nowInMillis,
    maxScoreTimeMillis,
    unstakeUnlockTimeMillis,
  };
}
