import { CustomizeFuulReferralLinkErrorType } from 'client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/hooks/useCustomizeFuulReferralLinkDialog';
import { useMemo } from 'react';

export function useCustomizeFuulReferralLinkErrorTooltipContent({
  formError,
}: {
  formError: CustomizeFuulReferralLinkErrorType | undefined;
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
