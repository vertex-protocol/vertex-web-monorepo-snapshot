import { BigDecimal } from '@vertex-protocol/client';

export interface FoundationTakerRewardsWeek {
  week: number;
  startTimeMillis: number;
  endTimeMillis: number;
  addressRewards: BigDecimal;
}

interface FoundationRewardsData {
  claimedRewards: BigDecimal;
  totalRealizedRewards: BigDecimal;
  unclaimedRealizedRewards: BigDecimal;
  isCompleted: boolean;
  currentWeek: FoundationTakerRewardsWeek | undefined;
}

export interface UseFoundationRewards {
  data: FoundationRewardsData | undefined;
}
