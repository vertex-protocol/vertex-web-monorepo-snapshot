import { BigDecimal } from '@vertex-protocol/client';
import {
  LeaderboardContest,
  useLeaderboardContests,
} from 'client/hooks/query/tradingCompetition/useLeaderboardContests';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import {
  PrizePool,
  TierData,
  TradingCompetitionConfig,
} from 'client/modules/tradingCompetition/types';
import { now } from 'lodash';
import { useMemo } from 'react';

export interface UseTradingCompetitionData {
  /**
   * Contests sorted asc by tier.
   */
  contests: LeaderboardContest[] | undefined;
  /**
   * The contest for the given tier page, or for the first tier if on the landing page.
   */
  currentContest: LeaderboardContest | undefined;
  currentContestStatus: 'pending' | 'active' | 'done' | undefined;
  currentContestPrizePool: PrizePool | undefined;
  currentContestTierData: TierData | undefined;
  /**
   * Contests may require either a min. account value or a min. product balance.
   * For contests that require a min. account value, this will be set to the user's
   * account value.
   */
  accountValueUsd: BigDecimal | undefined;
  /**
   * Contests may require either a min. account value or a min. product balance.
   * For contests that require a min. product balance, this will be set to the user's
   * balance for the relevant product.
   */
  productBalance: BigDecimal | undefined;
  isLoadingContestData: boolean;
}

interface Params {
  /**
   * Used to determine the current contest. If not provided, the first contest returned from the API will be used.
   */
  tierContestId?: number;
  config: TradingCompetitionConfig;
}

export function useTradingCompetitionData({ tierContestId, config }: Params) {
  const {
    contestIds,
    tierDataByContestId,
    chainEnv,
    requiredProductBalanceMetadata,
  } = config;
  const { data: contestsData, isLoading: isLeaderboardContestsLoading } =
    useLeaderboardContests({
      contestIds,
      chainEnv,
    });

  const { balances: spotBalances } = useSpotBalances();
  const { data: derivedSubaccountOverview } = useDerivedSubaccountOverview();

  const {
    contests,
    currentContest,
    currentContestStatus,
    currentContestPrizePool,
    currentContestTierData,
  }: Pick<
    UseTradingCompetitionData,
    | 'contests'
    | 'currentContest'
    | 'currentContestStatus'
    | 'currentContestPrizePool'
    | 'currentContestTierData'
  > = useMemo(() => {
    const contests = contestsData?.contests;
    const numContests = contests?.length;

    if (!numContests || !tierDataByContestId) {
      return {
        contests: undefined,
        currentContest: undefined,
        currentContestStatus: undefined,
        currentContestPrizePool: undefined,
        currentContestTierData: undefined,
      };
    }

    // If tierContestId is not provided use the first tier as current contest and tier data is undefined.
    const { currentContest, currentContestTierData } = (() => {
      const tierData = tierContestId
        ? tierDataByContestId?.[tierContestId]
        : undefined;

      if (!tierData) {
        return {
          currentContest: contests[0],
          currentContestTierData: undefined,
        };
      }

      return {
        currentContest: contests[tierData.tier - 1],
        currentContestTierData: tierData,
      };
    })();

    const currentContestPrizePool = currentContestTierData?.prizePool;

    const currentContestStatus = (() => {
      const nowMillis = now();

      // Currently active contest
      if (
        currentContest.startTimeMillis <= nowMillis &&
        currentContest.endTimeMillis > nowMillis
      ) {
        return 'active';
      }

      // Contest that's yet to start
      if (currentContest.startTimeMillis > nowMillis) {
        return 'pending';
      }

      // Given the above didn't pass, the contest has ended.
      return 'done';
    })();

    return {
      contests,
      currentContest,
      currentContestStatus,
      currentContestPrizePool,
      currentContestTierData,
    };
  }, [contestsData?.contests, tierContestId, tierDataByContestId]);

  const accountValueUsd = !requiredProductBalanceMetadata
    ? derivedSubaccountOverview?.portfolioValueUsd
    : undefined;

  const productBalance = useMemo(() => {
    if (!requiredProductBalanceMetadata || !spotBalances) {
      return;
    }

    return spotBalances.find(
      (balance) =>
        balance.productId === requiredProductBalanceMetadata.productId,
    )?.amount;
  }, [spotBalances, requiredProductBalanceMetadata]);

  return {
    contests,
    currentContest,
    currentContestStatus,
    currentContestPrizePool,
    currentContestTierData,
    accountValueUsd,
    productBalance,
    isLoadingContestData: isLeaderboardContestsLoading,
  };
}
