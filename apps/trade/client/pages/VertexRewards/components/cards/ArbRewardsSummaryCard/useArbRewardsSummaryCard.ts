import { BigDecimals, nowInSeconds } from '@vertex-protocol/client';
import { sumBigDecimalBy } from '@vertex-protocol/utils';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { useClaimArbRewards } from './useClaimArbRewards';
import { isBefore } from 'date-fns';
import { find, get } from 'lodash';
import { useAccountFoundationRewardsClaimState } from 'client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState';
import { useSubaccountFoundationRewards } from 'client/hooks/query/foundationRewards/useSubaccountFoundationRewards';

export function useArbRewardsSummaryCard() {
  const {
    claim,
    isSuccess: isClaimSuccess,
    isLoading: isClaiming,
  } = useClaimArbRewards();
  const arbToken = useFoundationToken();
  const userActionState = useUserActionState();
  const { data: arbRewardsClaimState } =
    useAccountFoundationRewardsClaimState();
  const { data: subaccountArbRewards } = useSubaccountFoundationRewards();

  const mappedData = useMemo(() => {
    if (!subaccountArbRewards || !arbRewardsClaimState) {
      return {};
    }

    const nowSeconds = nowInSeconds();

    // Configuration for the rewards round
    const pastRoundEndWeek = 16;
    const newRoundEndWeek = 28;
    const roundDurationInWeeks = newRoundEndWeek - pastRoundEndWeek;
    const currentRound = 2;

    const pastWeeksInCurrentRound = subaccountArbRewards.weeks.filter((week) =>
      isBefore(week.startTime.plus(week.period).toNumber(), nowSeconds),
    );

    // Only claimable rewards from previous rounds, first week of chain rewards is invalid so we remove it.
    const pastRoundsTotalClaimableAmounts =
      arbRewardsClaimState.totalClaimableAmounts.slice(1, pastRoundEndWeek + 1);

    // Sum(Rewards for each completed week)
    let totalRealizedRewards = BigDecimals.ZERO;
    // Sum(Rewards for each completed week that has been registered on chain)
    // This lags behind totalRealizedRewards from the indexer as the merkle proof needs to be manually added
    let onChainTotalRealizedRewards = BigDecimals.ZERO;

    // Sum all on chain rewards from past rounds
    pastRoundsTotalClaimableAmounts.forEach((realizedAmount) => {
      const onChainRealizedAmount = removeDecimals(realizedAmount);

      onChainTotalRealizedRewards = onChainTotalRealizedRewards.plus(
        onChainRealizedAmount,
      );
      totalRealizedRewards = totalRealizedRewards.plus(onChainRealizedAmount);
    });

    // Only for past weeks in the current round as indexer data only returns for current round.
    pastWeeksInCurrentRound.forEach((week) => {
      // This might not exist if the week has not been registered on chain yet
      const onChainRealizedAmount = removeDecimals(
        get(arbRewardsClaimState.totalClaimableAmounts, week.week),
        arbToken.tokenDecimals,
      );
      // Indexer amounts are decimal adjusted
      const indexerRealizedAmount = sumBigDecimalBy(
        week.addressRewards,
        (reward) => reward.takerTokens,
      );

      onChainTotalRealizedRewards = onChainTotalRealizedRewards.plus(
        onChainRealizedAmount ?? BigDecimals.ZERO,
      );
      // Use on-chain data as the source of truth, as indexer data for past weeks will actually change when we make adjustments for blocking wash traders
      totalRealizedRewards = totalRealizedRewards.plus(
        onChainRealizedAmount ?? indexerRealizedAmount,
      );
    });

    const claimedRewards = removeDecimals(
      sumBigDecimalBy(arbRewardsClaimState.claimedAmounts, (i) => i),
      arbToken.tokenDecimals,
    );

    const unclaimedRealizedRewards =
      onChainTotalRealizedRewards.minus(claimedRewards);

    const currentWeekData = (() => {
      const currentWeek = find(subaccountArbRewards.weeks, (week) => {
        return (
          week.startTime.lte(nowSeconds) &&
          week.startTime.plus(week.period).gt(nowSeconds)
        );
      });

      if (!currentWeek) {
        return;
      }

      // Data from rewards query is already decimal adjusted
      const estimatedAddressRewards = sumBigDecimalBy(
        currentWeek.addressRewards,
        (week) => week.takerTokens,
      );

      return {
        endTimeMillis: currentWeek.startTime
          .plus(currentWeek.period)
          .times(1000)
          .toNumber(),
        week: currentWeek.week - pastRoundEndWeek,
        estimatedWeekRewards: estimatedAddressRewards,
      };
    })();

    return {
      roundDurationInWeeks,
      currentRound,
      currentWeek: currentWeekData?.week,
      currentWeekEndTimeMillis: currentWeekData?.endTimeMillis,
      estimatedWeekRewards: currentWeekData?.estimatedWeekRewards,
      totalRealizedRewards,
      claimedRewards,
      unclaimedRealizedRewards,
      // Completed if the last week of the round is reached.
      isArbRewardsCompleted: !!pastWeeksInCurrentRound.find(
        (week) => week.week === newRoundEndWeek,
      ),
    };
  }, [arbRewardsClaimState, arbToken.tokenDecimals, subaccountArbRewards]);

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
