import { SignatureModeSlowModeSettingsFormErrorType } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types';
import { useMemo } from 'react';

export function useSlowModeSettingsPrivateKeyErrorTooltipContent({
  formError,
}: {
  formError: SignatureModeSlowModeSettingsFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_private_key':
        return 'Please enter a valid private key beginning with "0x".';
      default:
        return null;
    }
  }, [formError]);
}
