import { CustomizeReferralLinkErrorType } from 'client/modules/referrals/dialogs/CustomizeReferralLinkDialog/hooks/useCustomizeReferralLinkDialog';
import { useMemo } from 'react';

export function useCustomizeReferralLinkErrorTooltipContent({
  formError,
}: {
  formError: CustomizeReferralLinkErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Referral codes must contain only letters, numbers, or dashes, with a maximum length of 20 characters.';
      case 'code_taken':
        return 'Code is taken. Please enter a different one.';
      default:
        return null;
    }
  }, [formError]);
}
