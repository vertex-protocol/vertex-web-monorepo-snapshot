import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';

interface ClosePositionNotificationProps extends ToastProps {
  error?: string;
}

export function ClosePositionErrorNotification({
  onDismiss,
  visible,
  ttl,
  error,
}: ClosePositionNotificationProps) {
  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.SectionedHeader
        variant="failure"
        leftLabel="Close Position"
        rightLabel="Order Failed"
        onDismiss={onDismiss}
      />
      <ActionToast.Separator variant="failure" ttl={ttl} />
      <ActionToast.Body variant="failure">
        Your order was not placed: {error}.
      </ActionToast.Body>
    </ActionToast.Container>
  );
}
