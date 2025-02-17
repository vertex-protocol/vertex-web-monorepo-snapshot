import { DisclosureCard, LinkButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function SlowMode1CTSetupPrompt() {
  const { push } = useDialog();
  const pushSlowModeSettingsDialog = () => {
    push({
      type: 'signature_mode_slow_mode_settings',
      params: {},
    });
  };

  return (
    <DisclosureCard
      title="Enable 1-Click Trading"
      description={
        <>
          It looks like you&apos;re using a smart contract wallet.
          <br />
          Please{' '}
          <LinkButton
            colorVariant="accent"
            onClick={pushSlowModeSettingsDialog}
          >
            enable 1-Click Trading
          </LinkButton>{' '}
          to withdraw.
        </>
      }
    />
  );
}
