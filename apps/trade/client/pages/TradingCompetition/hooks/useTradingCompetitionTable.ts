import {
  BigDecimal,
  GetIndexerLeaderboardResponse,
  IndexerLeaderboardParticipant,
} from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { usePaginatedLeaderboard } from 'client/hooks/query/tradingCompetition/usePaginatedLeaderboard';
import fifthPlacePentagon from 'client/pages/TradingCompetition/assets/fifth-place-pentagon.svg';
import firstPlacePentagon from 'client/pages/TradingCompetition/assets/first-place-pentagon.svg';
import fourthPlacePentagon from 'client/pages/TradingCompetition/assets/fourth-place-pentagon.svg';
import secondPlacePentagon from 'client/pages/TradingCompetition/assets/second-place-pentagon.svg';
import thirdPlacePentagon from 'client/pages/TradingCompetition/assets/third-place-pentagon.svg';
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
  prize: ReactNode;
}

interface Params {
  period: number;
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

export function useTradingCompetitionTable({ period }: Params) {
  const {
    config: { rankType, participantPrizes },
    contestIds,
  } = useTradingCompetitionContext();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    usePaginatedLeaderboard({
      pageSize: PAGE_SIZE,
      contestId: contestIds?.[period - 1],
      rankType,
    });

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<
      GetIndexerLeaderboardResponse,
      IndexerLeaderboardParticipant
    >({
      pageSize: PAGE_SIZE,
      numPagesFromQuery: data?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const quotePriceUsd = usePrimaryQuotePriceUsd();

  const participants: TradingCompetitionTableItem[] = useMemo(
    () =>
      getPageData(data).map((participant) => {
        const { roiRank } = participant;
        const rankAsNumber = roiRank.toNumber();
        const iconSrc = iconSrcs[rankAsNumber - 1];

        // We only assign prizes to participants with % PnL > 0.
        const prize = participant.percentRoi.gt(0)
          ? participantPrizes[rankAsNumber - 1]
          : undefined;

        return {
          rankingData: { rank: roiRank, iconSrc },
          subaccountOwner: participant.subaccount.subaccountOwner,
          percentRoi: participant.percentRoi,
          pnlUsd: participant.pnl.multipliedBy(quotePriceUsd),
          prize,
        };
      }),
    [data, getPageData, quotePriceUsd, participantPrizes],
  );

  return {
    participants,
    isLoading: isFetchingNextPage || isLoading,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
