import { sumBigDecimalBy } from '@vertex-protocol/client';
import { useAddressTakerRewards } from 'client/hooks/query/rewards/useAddressTakerRewards';
import { useMemo } from 'react';

/**
 * Returns the total referral rewards earned by the user from our old referral program managed by our own backend.
 * We have since switched to Fuul, but we want to display past rewards earned
 */
export function usePastProgramReferralRewards() {
  const { data: takerRewardsData } = useAddressTakerRewards();

  return useMemo(() => {
    if (!takerRewardsData?.epochs) {
      return;
    }

    return sumBigDecimalBy(
      takerRewardsData.epochs,
      (epoch) => epoch.takerReferralTokens,
    );
  }, [takerRewardsData?.epochs]);
}
