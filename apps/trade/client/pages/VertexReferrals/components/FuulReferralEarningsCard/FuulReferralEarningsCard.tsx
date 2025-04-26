'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ClaimFuulEarnings } from 'client/pages/VertexReferrals/components/FuulReferralEarningsCard/ClaimFuulEarnings';
import { ConfirmFuulReferral } from 'client/pages/VertexReferrals/components/FuulReferralEarningsCard/ConfirmFuulReferral';
import { useFuulReferralEarningsCard } from 'client/pages/VertexReferrals/components/FuulReferralEarningsCard/useFuulReferralEarningsCard';
import { FuulReferralsCard } from 'client/pages/VertexReferrals/components/FuulReferralsCard';

export function FuulReferralEarningsCard() {
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
  } = useFuulReferralEarningsCard();

  return (
    <FuulReferralsCard title="Earnings">
      <div
        className={joinClassNames(
          'flex flex-col items-start gap-y-2.5',
          'sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <ValueWithLabel.Vertical
          sizeVariant="lg"
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
            tooltip={{ id: 'fuulReferralsFeeRebates' }}
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
          sizeVariant="lg"
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
      <ClaimFuulEarnings
        disableClaim={disableClaim}
        rewardsChain={rewardsChain}
      />
      <ConfirmFuulReferral
        className="mt-auto"
        referrerForAddress={referrerForAddress}
        referralCodeForSession={referralCodeForSession}
        disableConfirmReferral={disableConfirmReferral}
      />
    </FuulReferralsCard>
  );
}
