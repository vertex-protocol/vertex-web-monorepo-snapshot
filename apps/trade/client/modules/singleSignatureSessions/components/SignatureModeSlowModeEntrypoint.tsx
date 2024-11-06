import { LinkButton } from '@vertex-protocol/web-ui';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function SignatureModeSlowModeEntrypoint() {
  const isSmartContractWalletConnected = useIsSmartContractWalletConnected();
  const { push } = useDialog();

  if (isSmartContractWalletConnected) {
    // Display a more prominent message if we know the user is using a smart contract wallet
    return (
      <div className="text-accent">
        It looks like you&apos;re using a smart contract wallet. Please use{' '}
        <LinkButton
          colorVariant="primary"
          onClick={() => {
            push({
              type: 'signature_mode_slow_mode_settings',
              params: {},
            });
          }}
        >
          Advanced 1CT Settings
        </LinkButton>
        .
      </div>
    );
  }

  return (
    <div>
      Using Safe or a smart contract wallet?{' '}
      <LinkButton
        colorVariant="primary"
        onClick={() => {
          push({
            type: 'signature_mode_slow_mode_settings',
            params: {},
          });
        }}
      >
        Click Here
      </LinkButton>
    </div>
  );
}
