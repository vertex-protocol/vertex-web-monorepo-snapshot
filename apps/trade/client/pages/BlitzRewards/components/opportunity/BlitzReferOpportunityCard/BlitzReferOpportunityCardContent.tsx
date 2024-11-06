'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useAddressTakerRewards } from 'client/hooks/query/rewards/useAddressTakerRewards';
import { useSubaccountReferralCode } from 'client/hooks/query/subaccount/useSubaccountReferralCode';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ReferralLinkBar } from 'client/modules/referrals/components/ReferralLink/ReferralLinkBar';
import { useReferralLink } from 'client/modules/referrals/hooks/useReferralLink';

export function BlitzReferOpportunityCardContent() {
  const { data: referralCodeData } = useSubaccountReferralCode();
  const { data: takerRewardsData } = useAddressTakerRewards();

  const { baseUrlWithQueryParam, referralLink } = useReferralLink({
    referralCode: referralCodeData?.referralCode,
  });
  const isConnected = useIsConnected();
  const requiresFirstDeposit = useRequiresInitialDeposit();

  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-4">
      <div className="text-text-secondary">Your referral link</div>
      <ReferralLinkBar
        isConnected={isConnected}
        requiresFirstDeposit={requiresFirstDeposit}
        referralCode={referralCodeData?.referralCode}
        baseUrlWithQueryParam={baseUrlWithQueryParam}
        socialShareText={`Trade on Blitz and earn points. Trade spot and perpetuals on a blazing-fast orderbook DEX.\nGet in here: ${referralLink}`}
      />
      <ValueWithLabel.Vertical
        label="Users Referred"
        value={takerRewardsData?.totalReferrals}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      />
    </div>
  );
}
