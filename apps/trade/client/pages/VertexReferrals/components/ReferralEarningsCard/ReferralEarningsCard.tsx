'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ClaimEarnings } from 'client/pages/VertexReferrals/components/ReferralEarningsCard/ClaimEarnings';
import { ConfirmReferral } from 'client/pages/VertexReferrals/components/ReferralEarningsCard/ConfirmReferral';
import { useReferralEarningsCard } from 'client/pages/VertexReferrals/components/ReferralEarningsCard/useReferralEarningsCard';
import { ReferralsCard } from 'client/pages/VertexReferrals/components/ReferralsCard';

export function ReferralEarningsCard() {
  const {
    claimableRewardsUsdc,
    claimedRewardsUsdc,
    disableClaim,
    disableConfirmReferral,
    referrerForAddress,
    payoutToken,
    referralCodeForSession,
    rewardsChain,
    commissionsEarnedUsdc,
    rebatesEarnedUsdc,
    totalRewardsEarnedUsdc,
  } = useReferralEarningsCard();

  return (
    <ReferralsCard title="Earnings">
      <div
        className={joinClassNames(
          'flex flex-col items-start gap-y-2.5',
          'sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <ValueWithLabel.Vertical
          label="Total Earned"
          value={totalRewardsEarnedUsdc}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={payoutToken.symbol}
        />
        <div className="flex flex-col gap-y-1.5">
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            label="Commissions:"
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            value={commissionsEarnedUsdc}
            valueEndElement={payoutToken.symbol}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            label="Fee Rebates:"
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            value={rebatesEarnedUsdc}
            valueEndElement={payoutToken.symbol}
            tooltip={{ id: 'referralsFeeRebates' }}
          />
        </div>
      </div>
      <Divider />
      <div
        className={joinClassNames(
          'flex flex-col items-start gap-y-2.5',
          'sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <ValueWithLabel.Vertical
          label="Available to Claim"
          value={claimableRewardsUsdc}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={payoutToken.symbol}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Total claimed:"
          value={claimedRewardsUsdc}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={payoutToken.symbol}
        />
      </div>
      <ClaimEarnings disableClaim={disableClaim} rewardsChain={rewardsChain} />
      <ConfirmReferral
        className="mt-auto"
        referrerForAddress={referrerForAddress}
        referralCodeForSession={referralCodeForSession}
        disableConfirmReferral={disableConfirmReferral}
      />
    </ReferralsCard>
  );
}
