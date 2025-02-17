import { PrizePool, TierData } from 'client/modules/tradingCompetition/types';
import tier1LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/vertex/tier-label/tier-1-label.svg';
import tier2LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/vertex/tier-label/tier-2-label.svg';
import { VERTEX_TRADING_COMP_ROUND_1_ROUTES } from 'client/pages/TradingCompetition/configs/vrtx/routes';
import { TradingCompetitionTablePrize as Prize } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTablePrize';

export const TIER_1_PRIZE_POOL: PrizePool = [
  { amount: '3.5k', symbol: 'USDC' },
];
export const TIER_2_PRIZE_POOL: PrizePool = [
  { amount: '1.5k', symbol: 'USDC' },
];

export const ROUND_1_TIER_1_TIER_DATA: TierData = {
  tier: 1,
  href: VERTEX_TRADING_COMP_ROUND_1_ROUTES.tier1,
  labelImageSrc: tier1LabelImageSrc,
  prizePool: TIER_1_PRIZE_POOL,
  participantPrizes: [
    <Prize key={0} amount={2000} symbol="USDC" />,
    <Prize key={1} amount={1000} symbol="USDC" />,
    <Prize key={2} amount={500} symbol="USDC" />,
  ],
};

export const ROUND_1_TIER_2_TIER_DATA: TierData = {
  tier: 2,
  href: VERTEX_TRADING_COMP_ROUND_1_ROUTES.tier2,
  labelImageSrc: tier2LabelImageSrc,
  prizePool: TIER_2_PRIZE_POOL,
  participantPrizes: [
    <Prize key={0} amount={750} symbol="USDC" />,
    <Prize key={1} amount={500} symbol="USDC" />,
    <Prize key={2} amount={250} symbol="USDC" />,
  ],
};
