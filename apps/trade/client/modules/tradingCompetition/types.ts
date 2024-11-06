import { ChainEnv } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

export type PrizePool = { amount: string; symbol: string }[];

export interface TierData {
  tier: number;
  /**
   * Image src used for rendering a label in the page header and details card.
   */
  labelImageSrc: NextImageSrc;
  /**
   * The tier's page route.
   */
  href: string;
  prizePool: PrizePool;
  /**
   * Component to render as the prize for each participant in the leaderboard.
   */
  participantPrizes: ReactNode[];
}

interface RequiredProductBalanceMetadata {
  productId: number;
  symbol: string;
  iconSrc: NextImageSrc;
}

export interface TradingCompetitionConfig {
  chainEnv: ChainEnv;
  docsHref: string;
  totalPrizePoolHeroImage: {
    mobileSrc: NextImageSrc;
    desktopSrc: NextImageSrc;
    alt: string;
  };
  contestIds: number[];
  totalPrizePool: PrizePool;
  tierDataByContestId: Record<number, TierData>;
  /**
   * Relevant product metadata for contests with a min. required product balance.
   */
  requiredProductBalanceMetadata?: RequiredProductBalanceMetadata;
}
