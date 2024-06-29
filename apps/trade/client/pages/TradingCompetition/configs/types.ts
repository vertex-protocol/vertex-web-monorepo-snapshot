import { IndexerLeaderboardRankType } from '@vertex-protocol/client';
import { PrimaryChainID } from '@vertex-protocol/react-client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

export type PrizePool = { amount: string; symbol: string }[];

type PrizePoolByContestId = Record<number, PrizePool>;

interface BaseTradingCompetitionConfg {
  route: string;
  routeName: string;
  /** Href to docs with more info about this competition. */
  docsHref: string;
  /** Used for icons in the page header. */
  brandLogos: NextImageSrc[];
  prizeHeroImage: {
    mobileSrc: NextImageSrc;
    desktopSrc: NextImageSrc;
    alt: string;
  };
  pageBgImage?: ReactNode;
  contestIdsByChainId: Partial<Record<PrimaryChainID, number[]>>;
  /**
   * The prize pool for each contest on each chain.
   */
  prizePoolByChainAndContestIds: Partial<
    Record<PrimaryChainID, PrizePoolByContestId>
  >;
  rankType: IndexerLeaderboardRankType;
  /** Component to render as the prize for each participant in the leaderboard. */
  participantPrizes: ReactNode[];
}

interface TradingCompetitionWithPeriods {
  /**
   * If the contest has the concept of "periods", i.e. multiple "runs" conceptually
   * belonging to the same contest (though in the backend each period is its own contest).
   */
  hasPeriods: true;
  /** The terminology used for the period (e.g. "Season"). */
  periodLabel: string;
}

interface TradingCompetitionWithoutPeriods {
  hasPeriods: false;
  periodLabel?: never;
}

export type TradingCompetitionConfig = BaseTradingCompetitionConfg &
  (TradingCompetitionWithPeriods | TradingCompetitionWithoutPeriods);
