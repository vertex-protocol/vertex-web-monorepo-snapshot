import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClaimReferralEarningsDialog } from 'client/modules/referrals/dialogs/ClaimReferralEarningsDialog/ClaimReferralEarningsDialog';
import { ConfirmReferralDialog } from 'client/modules/referrals/dialogs/ConfirmReferralDialog/ConfirmReferralDialog';
import { CustomizeReferralLinkDialog } from 'client/modules/referrals/dialogs/CustomizeReferralLinkDialog/CustomizeReferralLinkDialog';

export function ReferralDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'claim_referral_earnings' && (
        <ClaimReferralEarningsDialog />
      )}
      {currentDialog?.type === 'confirm_referral' && <ConfirmReferralDialog />}
      {currentDialog?.type === 'customize_referral_link' && (
        <CustomizeReferralLinkDialog />
      )}
    </>
  );
}
