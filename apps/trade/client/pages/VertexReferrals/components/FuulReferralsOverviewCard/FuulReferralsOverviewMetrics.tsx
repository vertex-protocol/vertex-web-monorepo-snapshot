'use client';

import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { useAddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulReferralRewards';

export function FuulReferralsOverviewMetrics() {
  const { data: referralRewardsData } = useAddressFuulReferralRewards();
  const { volumeAmountSymbol } = useFuulReferralsContext();

  return (
    <div className="flex gap-x-10">
      <ValueWithLabel.Vertical
        label="Sign Ups"
        value={referralRewardsData?.numReferredUsers}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      />
      <ValueWithLabel.Vertical
        label="Total Taker Volume"
        value={referralRewardsData?.referredVolumeUsdc}
        numberFormatSpecifier={
          CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
        }
        valueEndElement={volumeAmountSymbol}
      />
    </div>
  );
}
