import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
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
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>{title}</BaseDialog.Title>
      <BaseDialog.Body className="flex w-full flex-col py-2">
        <div className="border-overlay-divider/10 border-b py-4">{header}</div>
        <div className="py-4">{metricItems}</div>
        <div className="py-4">{actions}</div>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
