import { PrizePool, TierData } from 'client/modules/tradingCompetition/types';
import { TradingCompetitionBlitzPrize as BlitzPrize } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/blitz/TradingCompetitionBlitzPrize';
import tier1LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/blitz/tier-label/tier-1-label.svg';
import tier2LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/blitz/tier-label/tier-2-label.svg';
import { BLITZ_TRADING_COMPETITION_ROUTES } from 'client/pages/TradingCompetition/configs/blitz/routes';
import { range } from 'lodash';

export const TIER_1_PRIZE_POOL: PrizePool = [{ amount: '8k', symbol: 'GOLD' }];
export const TIER_2_PRIZE_POOL: PrizePool = [
  { amount: '~4.6k', symbol: 'GOLD' },
];

export const TIER_1_TIER_DATA: TierData = {
  tier: 1,
  labelImageSrc: tier1LabelImageSrc,
  href: BLITZ_TRADING_COMPETITION_ROUTES.tier1,
  prizePool: TIER_1_PRIZE_POOL,
  participantPrizes: [
    <BlitzPrize key={0} goldAmount={2500} />,
    <BlitzPrize key={1} goldAmount={1750} />,
    <BlitzPrize key={2} goldAmount={1250} />,
    <BlitzPrize key={3} goldAmount={750} />,
    <BlitzPrize key={4} goldAmount={500} />,
    ...range(5, 10).map((_, i) => <BlitzPrize key={i} goldAmount={250} />),
  ],
};
export const TIER_2_TIER_DATA: TierData = {
  tier: 2,
  labelImageSrc: tier2LabelImageSrc,
  href: BLITZ_TRADING_COMPETITION_ROUTES.tier2,
  prizePool: TIER_2_PRIZE_POOL,
  participantPrizes: [
    <BlitzPrize key={0} goldAmount={1350} />,
    <BlitzPrize key={1} goldAmount={1000} />,
    <BlitzPrize key={2} goldAmount={750} />,
    <BlitzPrize key={3} goldAmount={500} />,
    <BlitzPrize key={4} goldAmount={300} />,
    ...range(5, 9).map((_, i) => <BlitzPrize key={i} goldAmount={150} />),
    <BlitzPrize key={9} goldAmount={139} />,
  ],
};
