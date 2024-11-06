import {
  BigDecimal,
  GetIndexerLeaderboardResponse,
  IndexerLeaderboardParticipant,
} from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import fifthPlacePentagon from 'client/assets/leaderboard/fifth-place-pentagon.svg';
import firstPlacePentagon from 'client/assets/leaderboard/first-place-pentagon.svg';
import fourthPlacePentagon from 'client/assets/leaderboard/fourth-place-pentagon.svg';
import secondPlacePentagon from 'client/assets/leaderboard/second-place-pentagon.svg';
import thirdPlacePentagon from 'client/assets/leaderboard/third-place-pentagon.svg';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { usePaginatedLeaderboard } from 'client/hooks/query/tradingCompetition/usePaginatedLeaderboard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { ReactNode, useMemo } from 'react';

export interface TradingCompetitionTableItem {
  rankingData: {
    rank: BigDecimal;
    iconSrc: NextImageSrc | undefined;
  };
  subaccountOwner: string;
  percentRoi: BigDecimal;
  pnlUsd: BigDecimal;
  accountSizeUsd: BigDecimal;
  volumePrimaryQuote: BigDecimal | undefined;
  prize: ReactNode;
}

function extractItems(data: GetIndexerLeaderboardResponse) {
  return data.participants;
}

const iconSrcs: NextImageSrc[] = [
  firstPlacePentagon,
  secondPlacePentagon,
  thirdPlacePentagon,
  fourthPlacePentagon,
  fifthPlacePentagon,
];

const PAGE_SIZE = 50;

export function useTradingCompetitionTable() {
  const {
    currentContest,
    currentContestTierData,
    config: { chainEnv },
  } = useTradingCompetitionContext();

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = usePaginatedLeaderboard({
    chainEnv,
    pageSize: PAGE_SIZE,
    contestId: currentContest?.contestId,
  });

  const {
    getPageData,
    pageCount,
    paginationState,
    setPaginationState,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerLeaderboardResponse,
    IndexerLeaderboardParticipant
  >({
    pageSize: PAGE_SIZE,
    numPagesFromQuery: data?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const participants: TradingCompetitionTableItem[] = useMemo(
    () =>
      getPageData(data).map((participant) => {
        const { roiRank } = participant;
        const rankAsNumber = roiRank.toNumber();
        const iconSrc = iconSrcs[rankAsNumber - 1];

        // We only assign prizes to participants with % ROI > 0.
        const prize = participant.percentRoi.gt(0)
          ? currentContestTierData?.participantPrizes[rankAsNumber - 1]
          : undefined;

        return {
          rankingData: { rank: roiRank, iconSrc },
          subaccountOwner: participant.subaccount.subaccountOwner,
          percentRoi: participant.percentRoi,
          pnlUsd: participant.pnl.multipliedBy(primaryQuotePriceUsd),
          accountSizeUsd:
            participant.accountValue.multipliedBy(primaryQuotePriceUsd),
          volumePrimaryQuote: participant.volume,
          prize,
        };
      }),
    [getPageData, data, currentContestTierData, primaryQuotePriceUsd],
  );

  return {
    participants,
    isLoading: isLoading || isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
