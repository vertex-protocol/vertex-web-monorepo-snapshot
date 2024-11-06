import {
  BigDecimals,
  IndexerFoundationTakerRewardsWeek,
  removeDecimals,
  sumBigDecimalBy,
} from '@vertex-protocol/client';
import { useAccountFoundationRewardsClaimState } from 'client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState';
import { useSubaccountFoundationRewards } from 'client/hooks/query/foundationRewards/useSubaccountFoundationRewards';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import {
  FoundationTakerRewardsWeek,
  UseFoundationRewards,
} from 'client/pages/VertexRewards/hooks/types';
import { isBefore, isWithinInterval } from 'date-fns';
import { get, last, now } from 'lodash';
import { useMemo } from 'react';

const processIndexerFoundationTakerRewardsWeek = (
  week: IndexerFoundationTakerRewardsWeek,
): FoundationTakerRewardsWeek => {
  // Data from rewards query is already decimal adjusted
  const addressRewards = sumBigDecimalBy(
    week.addressRewards,
    (week) => week.takerTokens,
  );

  return {
    ...week,
    startTimeMillis: week.startTime.times(1000).toNumber(),
    endTimeMillis: week.startTime.plus(week.period).times(1000).toNumber(),
    addressRewards,
  };
};

export function useFoundationRewards(): UseFoundationRewards {
  const foundationToken = useFoundationToken();

  const { data: subaccountFoundationRewards } =
    useSubaccountFoundationRewards();

  const { data: foundationRewardsClaimState } =
    useAccountFoundationRewardsClaimState();

  const mappedData = useMemo(() => {
    if (!foundationRewardsClaimState || !subaccountFoundationRewards) {
      return;
    }

    const prevRoundsTotalRealizedRewards = (() => {
      // First week of the current round, weeks are in reverse order.
      const currentRoundFirstWeek = last(subaccountFoundationRewards.weeks);

      if (!currentRoundFirstWeek) {
        return;
      }

      // Claimable rewards from past rounds.
      const pastRoundWeeks =
        foundationRewardsClaimState.totalClaimableAmounts.slice(
          0,
          currentRoundFirstWeek.week,
        );

      // Sum all claimable amounts from past rounds.
      return removeDecimals(
        sumBigDecimalBy(pastRoundWeeks, (claimableAmount) => claimableAmount),
        foundationToken.tokenDecimals,
      );
    })();

    const nowMillis = now();
    // Sum(Rewards for each completed week, start from total realized rewards from previous rounds)
    let totalRealizedRewards =
      prevRoundsTotalRealizedRewards ?? BigDecimals.ZERO;
    // Sum(Rewards for each completed week that has been registered on chain, start from total realized rewards from previous rounds)
    // This lags behind totalRealizedRewards from the indexer as the merkle proof needs to be manually added
    let onChainTotalRealizedRewards =
      prevRoundsTotalRealizedRewards ?? BigDecimals.ZERO;

    let currentWeek: FoundationTakerRewardsWeek | undefined;

    // Only for past weeks in the current round as indexer data only returns for current round.
    subaccountFoundationRewards.weeks.forEach((week) => {
      const foundationTakerRewardsWeek =
        processIndexerFoundationTakerRewardsWeek(week);

      // We skip calculating for weeks that have not started yet.
      if (isBefore(nowMillis, foundationTakerRewardsWeek.startTimeMillis)) {
        return;
      }

      // We are at current week.
      if (
        isWithinInterval(nowMillis, {
          start: foundationTakerRewardsWeek.startTimeMillis,
          end: foundationTakerRewardsWeek.endTimeMillis,
        })
      ) {
        currentWeek = foundationTakerRewardsWeek;
        // Return here to skip calculating for the current week.
        return;
      }

      // Calculate rewards for week in current round.
      // This might not exist if the week has not been registered on chain yet
      const onChainRealizedAmount = removeDecimals(
        get(
          foundationRewardsClaimState.totalClaimableAmounts,
          week.week,
          undefined,
        ),
        foundationToken.tokenDecimals,
      );

      // Indexer amounts are decimal adjusted
      const indexerRealizedAmount = foundationTakerRewardsWeek.addressRewards;

      onChainTotalRealizedRewards = onChainTotalRealizedRewards.plus(
        onChainRealizedAmount ?? BigDecimals.ZERO,
      );

      // Use on-chain data as the source of truth, as indexer data for past weeks will actually change when we make adjustments for blocking wash traders
      totalRealizedRewards = totalRealizedRewards.plus(
        onChainRealizedAmount ?? indexerRealizedAmount,
      );
    });

    const claimedRewards = removeDecimals(
      sumBigDecimalBy(foundationRewardsClaimState.claimedAmounts, (i) => i),
      foundationToken.tokenDecimals,
    );

    // Unclaimed rewards from all past weeks.
    const unclaimedRealizedRewards =
      onChainTotalRealizedRewards.minus(claimedRewards);

    return {
      claimedRewards,
      totalRealizedRewards,
      unclaimedRealizedRewards,
      // If the rewards are completed there will be no current week
      isCompleted: !currentWeek,
      currentWeek,
    };
  }, [
    foundationRewardsClaimState,
    foundationToken.tokenDecimals,
    subaccountFoundationRewards,
  ]);

  return { data: mappedData };
}
