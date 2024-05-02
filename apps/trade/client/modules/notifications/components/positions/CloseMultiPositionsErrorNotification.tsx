import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';

interface CloseMultiPositionsNotificationProps extends ToastProps {
  numFailed: number;
}

export function CloseMultiPositionsErrorNotification({
  numFailed,
  visible,
  ttl,
  onDismiss,
}: CloseMultiPositionsNotificationProps) {
  const numFailedCount = `${numFailed} position${numFailed > 1 ? 's' : ''}`;

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="failure" onDismiss={onDismiss}>
        {numFailed > 1 ? 'Positions' : 'Position'} Failed to Close
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="failure" ttl={ttl} />
      <ActionToast.Body variant="failure">
        {numFailedCount} failed to close. Please try closing{' '}
        {numFailed > 1 ? 'them' : 'it'} individually.
      </ActionToast.Body>
    </ActionToast.Container>
  );
}
