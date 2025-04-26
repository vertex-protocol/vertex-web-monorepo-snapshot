import { SkateVaultFormErrorType } from 'client/modules/skateVaults/dialogs/types';

interface Params {
  formError: SkateVaultFormErrorType | undefined;
}

export function useVaultFormAmountErrorTooltipContent({ formError }: Params) {
  if (!formError) {
    return null;
  }

  return {
    invalid_input: 'Please enter a valid amount.',
    max_exceeded: 'Amount is more than wallet balance.',
  }[formError];
}
