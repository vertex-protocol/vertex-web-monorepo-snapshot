'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ReferralLinkBar } from 'client/modules/referrals/ReferralLinkBar';
import { useSonicPointsEarnReferralsCard } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnReferralsCard/useSonicPointsEarnReferralsCard';
import { SonicPointsCard } from 'client/pages/SonicPoints/components/SonicPointsCard';

export function SonicPointsEarnReferralsCard({ className }: WithClassnames) {
  const {
    baseUrlWithQueryParam,
    isConnected,
    referralLink,
    referralCode,
    requiresFirstDeposit,
    usersReferred,
  } = useSonicPointsEarnReferralsCard();

  return (
    <SonicPointsCard
      className={className}
      titleContent="Sonic Referrals"
      titleTooltipId="rewardsSonicReferrals"
      contentClassName="gap-y-4"
    >
      <p>
        Earn <span className="text-text-secondary">25%</span> of the credits
        earned by traders you refer.{' '}
        <span className="text-text-secondary">
          Copy and share your referral link below.
        </span>
      </p>
      <ReferralLinkBar
        isConnected={isConnected}
        baseUrlWithQueryParam={baseUrlWithQueryParam}
        requiresFirstDeposit={requiresFirstDeposit}
        referralCode={referralCode}
        socialShareText={`Trade on Sonic and earn credits. Trade on a blazing-fast orderbook DEX.\nGet in here: ${referralLink}`}
      />
      <ValueWithLabel.Horizontal
        fitWidth
        className="mt-auto"
        sizeVariant="xs"
        label="Users referred:"
        value={usersReferred}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      />
    </SonicPointsCard>
  );
}
