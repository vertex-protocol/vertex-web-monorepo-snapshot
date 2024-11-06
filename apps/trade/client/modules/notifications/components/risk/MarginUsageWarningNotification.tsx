import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { Toast } from 'client/components/Toast/Toast';
import { TOAST_HEADER_ICON_SIZE } from 'client/components/Toast/consts';
import { ToastProps } from 'client/components/Toast/types';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export type MarginUsageWarningNotificationProps = ToastProps;

export function MarginUsageWarningNotification({
  visible,
  ttl,
  onDismiss,
}: MarginUsageWarningNotificationProps) {
  const { show } = useDialog();

  const bodyContent = (
    <div className="flex flex-col items-start gap-y-4">
      <p>
        Your initial margin usage has reached 100%. Please deposit more
        collateral or close positions to continue trading.
      </p>
      <SecondaryButton
        onClick={() => {
          show({ type: 'deposit', params: {} });
          onDismiss();
        }}
        className="text-text-secondary"
      >
        Deposit Funds
      </SecondaryButton>
    </div>
  );

  const headerContent = (
    <div className="flex items-center gap-x-2">
      <Icons.Warning className="text-accent" size={TOAST_HEADER_ICON_SIZE} />
      <span>Margin Usage - 100%</span>
    </div>
  );

  return (
    <Toast.Container visible={visible}>
      <Toast.Header onDismiss={onDismiss}>{headerContent}</Toast.Header>
      <Toast.Separator ttl={ttl} />
      <Toast.Body>{bodyContent}</Toast.Body>
    </Toast.Container>
  );
}
