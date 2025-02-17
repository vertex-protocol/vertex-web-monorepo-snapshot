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

type EligibilityRequirement =
  | {
      eligibilityType: 'product_balance';
      productMetadata: ProductMetadata;
    }
  | {
      eligibilityType: 'staked_vrtx';
      productMetadata: ProductMetadata;
    }
  | {
      eligibilityType: 'account_value';
      productMetadata?: never;
    };

interface ProductMetadata {
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
   * Configures the competition's eligibility requirement (e.g. min. account value).
   */
  eligibilityRequirement: EligibilityRequirement;
  /**
   * We don't really have the notion of "rounds" in a competition, as each competition is unique and not tied to others.
   * This is a way for us to "hardcode" the number of rounds in a competition.
   */
  rounds?: {
    total: number;
    current: number;
  };
}
