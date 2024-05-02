import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';
import { ReactNode } from 'react';
import { WithChildren } from '@vertex-protocol/web-common';

interface ActionErrorNotificationProps extends ToastProps, WithChildren {
  title: string;
  bodyContent: ReactNode;
}

export function ActionErrorNotification({
  title,
  bodyContent,
  visible,
  ttl,
  onDismiss,
}: ActionErrorNotificationProps) {
  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="failure" onDismiss={onDismiss}>
        {title}
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="failure" ttl={ttl} />
      <ActionToast.Body variant="failure">{bodyContent}</ActionToast.Body>
    </ActionToast.Container>
  );
}
