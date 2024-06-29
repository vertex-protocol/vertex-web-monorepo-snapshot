import { BigDecimals, nowInSeconds } from '@vertex-protocol/client';
import { sumBigDecimalBy } from '@vertex-protocol/utils';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { isBefore } from 'date-fns';
import { find, get } from 'lodash';
import { useClaimMantleRewards } from './useClaimMantleRewards';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { useAccountFoundationRewardsClaimState } from 'client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState';
import { useSubaccountFoundationRewards } from 'client/hooks/query/foundationRewards/useSubaccountFoundationRewards';

export function useMantleRewardsSummaryCard() {
  const {
    claim,
    isSuccess: isClaimSuccess,
    isLoading: isClaiming,
  } = useClaimMantleRewards();
  const mantleToken = useFoundationToken();
  const userActionState = useUserActionState();
  const { data: mantleRewardsClaimState } =
    useAccountFoundationRewardsClaimState();
  const { data: subaccountMantleRewards } = useSubaccountFoundationRewards();

  const mappedData = useMemo(() => {
    if (!subaccountMantleRewards || !mantleRewardsClaimState) {
      return {};
    }

    const nowSeconds = nowInSeconds();

    const pastWeeks = subaccountMantleRewards.weeks.filter((week) =>
      isBefore(week.startTime.plus(week.period).toNumber(), nowSeconds),
    );

    // Sum(Rewards for each completed week)
    let totalRealizedRewards = BigDecimals.ZERO;
    // Sum(Rewards for each completed week that has been registered on chain)
    // This lags behind totalRealizedRewards from the indexer as the merkle proof needs to be manually added
    let onChainTotalRealizedRewards = BigDecimals.ZERO;

    pastWeeks.forEach((week) => {
      // This might not exist if the week has not been registered on chain yet
      const onChainRealizedAmount = removeDecimals(
        get(mantleRewardsClaimState.totalClaimableAmounts, week.week),
        mantleToken.tokenDecimals,
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
      sumBigDecimalBy(mantleRewardsClaimState.claimedAmounts, (i) => i),
      mantleToken.tokenDecimals,
    );

    const unclaimedRealizedRewards =
      onChainTotalRealizedRewards.minus(claimedRewards);

    const currentWeekData = (() => {
      const currentWeek = find(subaccountMantleRewards.weeks, (week) => {
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
        week: currentWeek.week,
        estimatedWeekRewards: estimatedAddressRewards,
      };
    })();

    return {
      currentWeek: currentWeekData?.week,
      currentWeekEndTimeMillis: currentWeekData?.endTimeMillis,
      estimatedWeekRewards: currentWeekData?.estimatedWeekRewards,
      totalRealizedRewards,
      claimedRewards,
      unclaimedRealizedRewards,
    };
  }, [
    mantleRewardsClaimState,
    mantleToken.tokenDecimals,
    subaccountMantleRewards,
  ]);

  return {
    ...mappedData,
    onClaimClick: claim,
    mantleToken,
    isClaimSuccess,
    isClaiming,
    disableClaimButton:
      userActionState === 'block_all' ||
      !mappedData.unclaimedRealizedRewards ||
      mappedData.unclaimedRealizedRewards.isZero(),
  };
}
