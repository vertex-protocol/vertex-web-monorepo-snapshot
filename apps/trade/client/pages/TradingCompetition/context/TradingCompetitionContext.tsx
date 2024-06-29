import { usePrimaryChainId } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import {
  LeaderboardContest,
  useLeaderboardContests,
} from 'client/hooks/query/tradingCompetition/useLeaderboardContests';
import {
  PrizePool,
  TradingCompetitionConfig,
} from 'client/pages/TradingCompetition/configs/types';
import { now, range } from 'lodash';
import { createContext, useContext, useMemo } from 'react';

interface TradingCompetitionContextData {
  config: TradingCompetitionConfig;
  /**
   * This represents the "index of the contest in `contestIds` + 1" that is either:
   *   - active,
   *   - pending to start, or
   *   - the final period if the competition has finished.
   *
   * For example, if we have `contestIds` `[938, 701]`, and `701` is active, then
   * `currentPeriod` would be 2 (index of `701` + 1).
   *
   * For competitions without the concept of periods, the length of `contestIds`
   * is just 1, so this will also be just 1.
   */
  currentPeriod: number | undefined;
  /**
   * This represents the contest object that is either
   *   - active,
   *   - pending to start, or
   *   - the final contest if the competition has finished.
   *
   * It differs from `currentPeriod` in that it is the actual contest object, rather than
   * an index, and in turn is useful for all competitions, not just those with the concept of periods.
   */
  currentContest: LeaderboardContest | undefined;
  currentContestStatus: 'pending' | 'active' | 'done' | undefined;
  currentContestPrizePool: PrizePool | undefined;
  /**
   * An array of the relevant contest ids sorted by start time in asc order.
   */
  contestIds: number[] | undefined;
}

const TradingCompetitionContext = createContext<TradingCompetitionContextData>(
  {} as TradingCompetitionContextData,
);

export const useTradingCompetitionContext = () =>
  useContext(TradingCompetitionContext);

export function TradingCompetitionContextProvider({
  children,
  config,
}: WithChildren<{ config: TradingCompetitionConfig }>) {
  const primaryChainId = usePrimaryChainId();
  const contestIdsForChain = config.contestIdsByChainId[primaryChainId];
  const prizePoolByContestId =
    config.prizePoolByChainAndContestIds[primaryChainId];

  const tradingCompetitionData = useTradingCompetitionData({
    contestIds: contestIdsForChain,
    prizePoolByContestId,
  });

  const data = useMemo(() => {
    return {
      config,
      ...tradingCompetitionData,
    };
  }, [config, tradingCompetitionData]);

  return (
    <TradingCompetitionContext.Provider value={data}>
      {children}
    </TradingCompetitionContext.Provider>
  );
}

function useTradingCompetitionData({
  contestIds,
  prizePoolByContestId,
}: {
  contestIds: number[] | undefined;
  prizePoolByContestId: Record<number, PrizePool> | undefined;
}) {
  const { data: contestsData } = useLeaderboardContests({ contestIds });

  // Contests are returned from the API sorted, so we use them to create a sorted
  // array of contest ids that we can use throughout the page.
  const contestIdsSortedByStartTime = useMemo(
    () => contestsData?.contests.map((contest) => contest.contestId),
    [contestsData],
  );

  const {
    currentPeriod,
    currentContest,
    currentContestStatus,
    currentContestPrizePool,
  } = useMemo((): Omit<
    TradingCompetitionContextData,
    'config' | 'contestIds'
  > => {
    const contests = contestsData?.contests;
    const numContests = contests?.length;

    if (!numContests || !prizePoolByContestId) {
      return {
        currentPeriod: undefined,
        currentContest: undefined,
        currentContestStatus: undefined,
        currentContestPrizePool: undefined,
      };
    }

    // Try to find an ongoing contest or one that's yet to begin.
    const nowMillis = now();

    for (const i of range(numContests)) {
      const contest = contests[i];
      const period = i + 1;
      const currentContestPrizePool = prizePoolByContestId[contest.contestId];

      // Currently active contest
      if (
        contest.startTimeMillis <= nowMillis &&
        contest.endTimeMillis > nowMillis
      ) {
        return {
          currentPeriod: period,
          currentContest: contest,
          currentContestStatus: 'active',
          currentContestPrizePool,
        };
      }

      // Contest that's yet to start
      if (contest.startTimeMillis > nowMillis) {
        return {
          currentPeriod: period,
          currentContest: contest,
          currentContestStatus: 'pending',
          currentContestPrizePool,
        };
      }
    }

    // The last contest - at this point, given the above checks, it must be done.
    const lastContest = contests[numContests - 1];
    return {
      currentPeriod: numContests,
      currentContest: lastContest,
      currentContestStatus: 'done',
      currentContestPrizePool: prizePoolByContestId[lastContest.contestId],
    };
  }, [contestsData, prizePoolByContestId]);

  return {
    contestIds: contestIdsSortedByStartTime,
    currentPeriod,
    currentContest,
    currentContestStatus,
    currentContestPrizePool,
  };
}
