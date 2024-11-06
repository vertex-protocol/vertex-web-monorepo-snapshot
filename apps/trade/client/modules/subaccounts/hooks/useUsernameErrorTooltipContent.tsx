import { ProfileErrorType } from 'client/modules/subaccounts/types';
import { useMemo } from 'react';

export function useUsernameErrorTooltipContent({
  formError,
}: {
  formError: ProfileErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'username_error':
        return 'Usernames must be less than 24 characters and contain only letters, numbers, and underscores.';
      default:
        return null;
    }
  }, [formError]);
}
