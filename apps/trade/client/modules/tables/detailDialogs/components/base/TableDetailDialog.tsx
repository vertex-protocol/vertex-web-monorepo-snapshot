import { Divider } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ReactNode } from 'react';

interface Props {
  title: string;
  header: ReactNode;
  metricItems: ReactNode;
  actions: ReactNode;
}

export function TableDetailDialog({
  title,
  header,
  metricItems,
  actions,
}: Props) {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>{title}</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        {header}
        <Divider />
        {metricItems}
        {actions}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
