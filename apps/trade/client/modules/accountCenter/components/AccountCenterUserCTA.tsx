import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useButtonUserStateErrorProps } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

/**
 * Renders a CTA button for the most immediate action that a user needs to take to start trading on Vertex
 * @constructor
 */
export function AccountCenterUserCTA() {
  const { show } = useDialog();
  const { signingPreference } = useSubaccountContext();
  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: {
      not_connected: false,
      incorrect_connected_chain: true,
      incorrect_chain_env: false,
      requires_initial_deposit: true,
      requires_sign_once_approval: true,
      // We want to show the 1CT enable button if the user is not in sign_once mode. Rather than only when user has not decided on a signing preference. So we set to false and handle the case in the buttonProps logic.
      requires_single_signature_setup: false,
    },
  });

  const buttonProps = (() => {
    if (userStateErrorButtonProps) {
      return userStateErrorButtonProps;
    }

    // Show 1CT enable if it's not sign_once.
    if (signingPreference.current?.type !== 'sign_once') {
      return {
        onClick: () => {
          show({
            type: 'signature_mode_settings',
            params: {},
          });
        },
        children: 'Enable 1CT',
      };
    }
  })();

  if (!buttonProps) {
    return null;
  }

  return <PrimaryButton {...buttonProps} />;
}
