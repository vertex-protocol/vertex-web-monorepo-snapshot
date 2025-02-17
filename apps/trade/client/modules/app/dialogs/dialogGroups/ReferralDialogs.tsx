import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClaimFuulReferralEarningsDialog } from 'client/modules/referrals/fuul/dialogs/ClaimFuulReferralEarningsDialog/ClaimFuulReferralEarningsDialog';
import { ConfirmFuulReferralDialog } from 'client/modules/referrals/fuul/dialogs/ConfirmFuulReferralDialog/ConfirmFuulReferralDialog';
import { CustomizeFuulReferralLinkDialog } from 'client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/CustomizeFuulReferralLinkDialog';

export function ReferralDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'claim_fuul_referral_earnings' && (
        <ClaimFuulReferralEarningsDialog />
      )}
      {currentDialog?.type === 'confirm_fuul_referral' && (
        <ConfirmFuulReferralDialog />
      )}
      {currentDialog?.type === 'customize_fuul_referral_link' && (
        <CustomizeFuulReferralLinkDialog />
      )}
    </>
  );
}
