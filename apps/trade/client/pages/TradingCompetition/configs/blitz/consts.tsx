import { PrizePool, TierData } from 'client/modules/tradingCompetition/types';
import tier1LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/blitz/tier-label/tier-1-label.svg';
import tier2LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/blitz/tier-label/tier-2-label.svg';
import { BLITZ_TRADING_COMPETITION_ROUTES } from 'client/pages/TradingCompetition/configs/blitz/routes';
import { TradingCompetitionBlitzPrize as BlitzPrize } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/blitz/TradingCompetitionBlitzPrize';

export const TIER_1_PRIZE_POOL: PrizePool = [
  { amount: '17.5k', symbol: 'GOLD' },
];
export const TIER_2_PRIZE_POOL: PrizePool = [
  { amount: '7.5k', symbol: 'GOLD' },
];

export const TIER_1_TIER_DATA: TierData = {
  tier: 1,
  labelImageSrc: tier1LabelImageSrc,
  href: BLITZ_TRADING_COMPETITION_ROUTES.tier1,
  prizePool: TIER_1_PRIZE_POOL,
  participantPrizes: [
    <BlitzPrize key={0} goldAmount={5000} />,
    <BlitzPrize key={1} goldAmount={3000} />,
    <BlitzPrize key={2} goldAmount={2000} />,
    <BlitzPrize key={4} goldAmount={1800} />,
    <BlitzPrize key={5} goldAmount={1500} />,
    <BlitzPrize key={6} goldAmount={1200} />,
    <BlitzPrize key={7} goldAmount={1000} />,
    <BlitzPrize key={8} goldAmount={800} />,
    <BlitzPrize key={9} goldAmount={700} />,
    <BlitzPrize key={10} goldAmount={500} />,
  ],
};

export const TIER_2_TIER_DATA: TierData = {
  tier: 2,
  labelImageSrc: tier2LabelImageSrc,
  href: BLITZ_TRADING_COMPETITION_ROUTES.tier2,
  prizePool: TIER_2_PRIZE_POOL,
  participantPrizes: [
    <BlitzPrize key={0} goldAmount={2000} />,
    <BlitzPrize key={1} goldAmount={1200} />,
    <BlitzPrize key={2} goldAmount={900} />,
    <BlitzPrize key={3} goldAmount={800} />,
    <BlitzPrize key={4} goldAmount={700} />,
    <BlitzPrize key={5} goldAmount={600} />,
    <BlitzPrize key={6} goldAmount={500} />,
    <BlitzPrize key={7} goldAmount={400} />,
    <BlitzPrize key={8} goldAmount={300} />,
    <BlitzPrize key={9} goldAmount={98} />,
  ],
};
