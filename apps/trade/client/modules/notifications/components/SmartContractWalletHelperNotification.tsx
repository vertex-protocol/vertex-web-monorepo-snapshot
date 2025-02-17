import { SecondaryButton } from '@vertex-protocol/web-ui';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function SmartContractWalletHelperNotification({
  onDismiss,
  visible,
  ttl,
}: ToastProps) {
  const { push } = useDialog();
  const pushSlowModeSettingsDialog = () => {
    push({
      type: 'signature_mode_slow_mode_settings',
      params: {},
    });
    onDismiss();
  };

  const content = (
    <div className="flex flex-col items-start gap-y-3">
      <p>
        Smart contract wallets require 1-Click Trading to interact with the app.
        Please enable 1CT now.
      </p>
      <SecondaryButton size="xs" onClick={pushSlowModeSettingsDialog}>
        Enable 1CT
      </SecondaryButton>
    </div>
  );

  return (
    <Toast.Container visible={visible}>
      <Toast.Header onDismiss={onDismiss} className="text-accent">
        1-Click Trading Required
      </Toast.Header>
      <Toast.Separator ttl={ttl} />
      <Toast.Body>{content}</Toast.Body>
    </Toast.Container>
  );
}
