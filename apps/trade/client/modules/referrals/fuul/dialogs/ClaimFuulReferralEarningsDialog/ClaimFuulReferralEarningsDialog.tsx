import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClaimFuulReferralEarningsSubmitButton } from 'client/modules/referrals/fuul/dialogs/ClaimFuulReferralEarningsDialog/ClaimFuulReferralEarningsSubmitButton';
import { useClaimFuulReferralEarningsDialog } from 'client/modules/referrals/fuul/dialogs/ClaimFuulReferralEarningsDialog/hooks/useClaimFuulReferralEarningsDialog';
import Image from 'next/image';

export function ClaimFuulReferralEarningsDialog() {
  const { onSubmit, buttonState, claimableRewardsUsdc, payoutToken } =
    useClaimFuulReferralEarningsDialog();
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Claim Earnings</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <div className="flex flex-col items-center gap-y-1.5">
          <div className="text-text-tertiary text-base">Available to claim</div>
          <div className="text-text-primary flex items-center gap-x-1.5 text-4xl">
            <Image
              className="h-7 w-auto"
              src={payoutToken.icon.asset}
              alt={payoutToken.symbol}
            />
            {formatNumber(claimableRewardsUsdc, {
              formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
            })}
          </div>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <ClaimFuulReferralEarningsSubmitButton
            state={buttonState}
            onSubmit={onSubmit}
          />
          <p className="text-text-tertiary text-center">
            You will receive rewards in your wallet
          </p>
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
