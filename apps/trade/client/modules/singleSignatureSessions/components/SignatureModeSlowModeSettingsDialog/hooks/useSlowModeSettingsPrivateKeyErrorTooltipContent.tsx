import { SignatureModeSlowModeSettingsFormErrorType } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types';
import { useMemo } from 'react';

export function useSlowModeSettingsPrivateKeyErrorTooltipContent({
  error,
}: {
  error: SignatureModeSlowModeSettingsFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (error) {
      case 'invalid_private_key':
        return 'Please enter a valid private key beginning with "0x".';
      default:
        return null;
    }
  }, [error]);
}
