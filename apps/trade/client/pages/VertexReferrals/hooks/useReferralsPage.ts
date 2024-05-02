import { sumBigDecimalBy } from '@vertex-protocol/utils';
import { useAddressTakerRewards } from 'client/hooks/query/rewards/useAddressTakerRewards';
import { useLatestRewardsEpochs } from 'client/modules/rewards/hooks/useLatestRewardsEpochs';
import { useMemo } from 'react';

export function useReferralsPage() {
  const { data: takerRewardsData } = useAddressTakerRewards();
  const {
    data: { currentEpoch },
  } = useLatestRewardsEpochs();

  const realizedReferralRewards = useMemo(() => {
    if (!currentEpoch || !takerRewardsData?.epochs) {
      return;
    }

    return sumBigDecimalBy(
      takerRewardsData.epochs,
      (epoch) => epoch.takerReferralTokens,
    );
  }, [currentEpoch, takerRewardsData?.epochs]);

  return {
    totalReferralCount: takerRewardsData?.totalReferrals,
    realizedReferralRewards,
  };
}
