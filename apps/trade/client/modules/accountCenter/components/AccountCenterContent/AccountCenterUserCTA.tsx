import { WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface ButtonConfig {
  onClick: () => void;
  label: string;
}

/**
 * Renders a CTA button for the most immediate action that a user needs to take to start trading on Vertex
 * @param userStateError
 * @constructor
 */
export function AccountCenterUserCTA({
  userStateError,
}: WithClassnames<{
  userStateError: UserStateError | undefined;
}>) {
  const { show } = useDialog();
  const { primaryChain, switchChain } = useEVMContext();

  const { signingPreference } = useSubaccountContext();

  const buttonConfig = ((): ButtonConfig | undefined => {
    // Any user state errors have precedence
    switch (userStateError) {
      case 'incorrect_chain':
        return {
          onClick: () => switchChain(),
          label: `Switch to ${primaryChain.name}`,
        };
      case 'requires_deposit':
        return {
          onClick: () =>
            show({
              type: 'deposit',
              params: {},
            }),
          label: 'Deposit Funds',
        };
      case 'requires_sign_once_approval':
        return {
          onClick: () =>
            show({
              type: 'single_signature_reapproval',
              params: {},
            }),
          label: 'Approve Trading',
        };
    }

    // Show 1CT setup after persisted storage loaded and mode is not sign_once.
    if (
      signingPreference.didLoadPersistedValue &&
      signingPreference.current?.type !== 'sign_once'
    ) {
      return {
        onClick: () => {
          show({
            type: 'signature_mode_settings',
            params: {},
          });
        },
        label: 'Setup 1CT',
      };
    }
  })();

  if (!buttonConfig) {
    return null;
  }

  return (
    <PrimaryButton onClick={buttonConfig.onClick}>
      {buttonConfig.label}
    </PrimaryButton>
  );
}
