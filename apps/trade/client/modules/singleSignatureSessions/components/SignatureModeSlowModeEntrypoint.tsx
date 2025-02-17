import { LinkButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function SignatureModeSlowModeEntrypoint({
  isSmartContractWalletConnected,
}: {
  isSmartContractWalletConnected: boolean | undefined;
}) {
  const { push } = useDialog();

  if (isSmartContractWalletConnected) {
    // Display a more prominent message if we know the user is using a smart contract wallet, the primary CTA's will
    // be hidden in lieu of this message
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
