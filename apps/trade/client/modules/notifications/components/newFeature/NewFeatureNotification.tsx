import { Icons } from '@vertex-protocol/web-ui';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';
import { ReactNode } from 'react';

interface Props extends ToastProps {
  title: string;
  content: ReactNode;
}

export function NewFeatureNotification({
  title,
  content,
  onDismiss,
  visible,
  ttl,
}: Props) {
  return (
    <Toast.Container visible={visible}>
      <Toast.Header
        onDismiss={onDismiss}
        className="text-accent flex items-center gap-x-2"
      >
        <Icons.MdOutlineNotificationsActive size={18} />
        {title}
      </Toast.Header>
      <Toast.Separator ttl={ttl} />
      <Toast.Body>{content}</Toast.Body>
    </Toast.Container>
  );
}
