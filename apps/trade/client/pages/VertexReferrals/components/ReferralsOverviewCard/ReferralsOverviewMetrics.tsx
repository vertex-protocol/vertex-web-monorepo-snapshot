'use client';

import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { useAddressReferralRewards } from 'client/modules/referrals/hooks/query/useAddressReferralRewards';

export function ReferralsOverviewMetrics() {
  const { data: referralRewardsData } = useAddressReferralRewards();
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
