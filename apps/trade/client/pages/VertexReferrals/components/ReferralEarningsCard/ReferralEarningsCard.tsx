import { BigDecimal, ChainEnv } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ClaimEarnings } from 'client/pages/VertexReferrals/components/ReferralEarningsCard/ClaimEarnings';
import { ReferralsCard } from 'client/pages/VertexReferrals/components/ReferralsCard';
import { Token } from 'common/productMetadata/types';
import { ConfirmReferral } from './ConfirmReferral';

interface Props {
  referralCodeForSession: string | undefined;
  referrerForAddress: string | null | undefined;
  totalRewardsEarnedUsdc: BigDecimal | undefined;
  commissionsEarnedUsdc: BigDecimal | undefined;
  rebatesEarnedUsdc: BigDecimal | undefined;
  claimableRewardsUsdc: BigDecimal | undefined;
  claimedRewardsUsdc: BigDecimal | undefined;
  payoutToken: Token;
  disableClaim: boolean;
  disableConfirmReferral: boolean;
  rewardsChainEnv: ChainEnv;
}

export function ReferralEarningsCard({
  referrerForAddress,
  referralCodeForSession,
  totalRewardsEarnedUsdc,
  commissionsEarnedUsdc,
  rebatesEarnedUsdc,
  claimableRewardsUsdc,
  claimedRewardsUsdc,
  payoutToken,
  disableClaim,
  disableConfirmReferral,
  rewardsChainEnv,
}: Props) {
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
      <ClaimEarnings
        disableClaim={disableClaim}
        rewardsChainEnv={rewardsChainEnv}
      />
      <ConfirmReferral
        className="mt-auto"
        referrerForAddress={referrerForAddress}
        referralCodeForSession={referralCodeForSession}
        disableConfirmReferral={disableConfirmReferral}
      />
    </ReferralsCard>
  );
}
