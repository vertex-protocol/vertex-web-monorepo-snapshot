'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { CounterPill } from '@vertex-protocol/web-ui';
import { useAddressReferralRewards } from 'client/modules/referrals/hooks/query/useAddressReferralRewards';

export function ReferralRankPill() {
  const { data: referralRewardsData } = useAddressReferralRewards();

  if (!referralRewardsData?.rank) {
    return null;
  }

  return (
    <CounterPill className="py-1 text-sm">
      Your rank:{' '}
      <span className="text-text-primary">
        {formatNumber(referralRewardsData?.rank, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </span>
    </CounterPill>
  );
}
