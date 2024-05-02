import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';

interface CancelOrderNotificationProps extends ToastProps {
  error: string;
}

export function CancelOrderErrorNotification({
  error,
  visible,
  ttl,
  onDismiss,
}: CancelOrderNotificationProps) {
  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="failure" onDismiss={onDismiss}>
        Order Not Cancelled
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="failure" ttl={ttl} />
      <ActionToast.Body variant="failure">{error}.</ActionToast.Body>
    </ActionToast.Container>
  );
}
