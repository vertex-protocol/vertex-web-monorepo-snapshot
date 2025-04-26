'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Pill } from '@vertex-protocol/web-ui';
import { useAddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulReferralRewards';

export function FuulReferralRankPill() {
  const { data: referralRewardsData } = useAddressFuulReferralRewards();

  if (!referralRewardsData?.rank) {
    return null;
  }

  return (
    <Pill
      colorVariant="tertiary"
      sizeVariant="xs"
      borderRadiusVariant="sm"
      className="text-sm"
    >
      Your rank:{' '}
      <span className="text-text-primary">
        {formatNumber(referralRewardsData?.rank, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </span>
    </Pill>
  );
}
