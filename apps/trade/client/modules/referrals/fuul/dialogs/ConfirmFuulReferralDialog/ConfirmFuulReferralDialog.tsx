import { joinClassNames } from '@vertex-protocol/web-common';
import { CheckmarkIcon } from 'client/components/CheckmarkIcon';
import { IdentityIcon } from 'client/components/Icons/IdentityIcon';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { FuulReferralLinkBar } from 'client/modules/referrals/fuul/FuulReferralLinkBar';
import { FUUL_REFERRALS_REWARDS_CONFIG } from 'client/modules/referrals/fuul/consts';
import { ConfirmFuulReferralSubmitButton } from 'client/modules/referrals/fuul/dialogs/ConfirmFuulReferralDialog/ConfirmFuulReferralSubmitButton';
import { useConfirmFuulReferralDialog } from 'client/modules/referrals/fuul/dialogs/ConfirmFuulReferralDialog/hooks/useConfirmFuulReferralDialog';
import { formatFuulReferralCode } from 'client/modules/referrals/fuul/formatFuulReferralCode';

export function ConfirmFuulReferralDialog() {
  const { hide } = useDialog();
  const { confirmButtonState, onConfirmReferral, referralCodeForSession } =
    useConfirmFuulReferralDialog();

  const isReferralConfirmed = confirmButtonState === 'success';

  const confirmReferralContent = (
    <div className="flex flex-col gap-y-3">
      <div
        className={joinClassNames(
          'flex flex-col items-center gap-y-6',
          'text-text-tertiary',
        )}
      >
        <div className="flex items-center gap-x-1.5">
          <IdentityIcon size={22} identifier={referralCodeForSession} />
          <span className="text-text-primary">
            {formatFuulReferralCode(referralCodeForSession)}
          </span>
          referred you.
        </div>
        <p className="text-text-primary text-center text-lg">
          As a referee, you save{' '}
          {FUUL_REFERRALS_REWARDS_CONFIG.rebatePercentage}% on all fees
        </p>
        <p>To continue, please confirm the referral</p>
      </div>
      <ConfirmFuulReferralSubmitButton
        state={confirmButtonState}
        onClick={onConfirmReferral}
      />
    </div>
  );

  const referralConfirmedContent = (
    <div className="flex flex-col items-center gap-y-5">
      <CheckmarkIcon size={90} />
      <div className="flex flex-col gap-y-1 text-center">
        <p className="text-text-primary text-xl">Referral Confirmed!</p>
        <p>
          Share the link below to refer other traders and earn more rewards.
        </p>
      </div>
      <FuulReferralLinkBar
        // w-full is required in order for truncate text to work properly
        className="w-full"
      />
    </div>
  );

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Confirm Referral</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        {isReferralConfirmed
          ? referralConfirmedContent
          : confirmReferralContent}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
