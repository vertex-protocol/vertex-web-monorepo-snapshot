import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';

interface CancelMultiOrdersNotificationProps extends ToastProps {
  error: string;
}

export function CancelMultiOrdersErrorNotification({
  error,
  visible,
  ttl,
  onDismiss,
}: CancelMultiOrdersNotificationProps) {
  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="failure" onDismiss={onDismiss}>
        Orders Not Cancelled
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="failure" ttl={ttl} />
      <ActionToast.Body variant="failure">{error}.</ActionToast.Body>
    </ActionToast.Container>
  );
}
