import { PrizePool, TierData } from 'client/modules/tradingCompetition/types';
import tier1LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/vertex/tier-label/tier-1-label.svg';
import tier2LabelImageSrc from 'client/pages/TradingCompetition/configs/assets/vertex/tier-label/tier-2-label.svg';
import { TradingCompetitionTablePrize as Prize } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTablePrize';

export const TIER_1_PRIZE_POOL: PrizePool = [{ amount: '35k', symbol: 'SEI' }];
export const TIER_2_PRIZE_POOL: PrizePool = [{ amount: '15k', symbol: 'SEI' }];

export const TIER_1_TIER_DATA: Omit<TierData, 'href'> = {
  tier: 1,
  labelImageSrc: tier1LabelImageSrc,
  prizePool: TIER_1_PRIZE_POOL,
  participantPrizes: [
    <Prize key={0} amount={10000} symbol="SEI" />,
    <Prize key={1} amount={7500} symbol="SEI" />,
    <Prize key={2} amount={5000} symbol="SEI" />,
    <Prize key={3} amount={4000} symbol="SEI" />,
    <Prize key={4} amount={3000} symbol="SEI" />,
    <Prize key={5} amount={2000} symbol="SEI" />,
    <Prize key={6} amount={1000} symbol="SEI" />,
    <Prize key={7} amount={1000} symbol="SEI" />,
    <Prize key={8} amount={750} symbol="SEI" />,
    <Prize key={9} amount={750} symbol="SEI" />,
  ],
};
export const TIER_2_TIER_DATA: Omit<TierData, 'href'> = {
  tier: 2,
  labelImageSrc: tier2LabelImageSrc,
  prizePool: TIER_2_PRIZE_POOL,
  participantPrizes: [
    <Prize key={0} amount={5000} symbol="SEI" />,
    <Prize key={1} amount={2500} symbol="SEI" />,
    <Prize key={2} amount={2000} symbol="SEI" />,
    <Prize key={3} amount={1500} symbol="SEI" />,
    <Prize key={4} amount={1250} symbol="SEI" />,
    <Prize key={5} amount={1000} symbol="SEI" />,
    <Prize key={6} amount={750} symbol="SEI" />,
    <Prize key={7} amount={500} symbol="SEI" />,
    <Prize key={8} amount={250} symbol="SEI" />,
    <Prize key={9} amount={250} symbol="SEI" />,
  ],
};
