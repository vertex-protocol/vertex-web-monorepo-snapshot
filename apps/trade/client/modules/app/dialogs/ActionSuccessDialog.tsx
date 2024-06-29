import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { CheckmarkIcon } from 'client/components/CheckmarkIcon';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export interface ActionSuccessDialogParams extends WithClassnames {
  title: string;
  description: string;
  cta?: {
    label: string;
    onClick: () => void;
  };
}

export function ActionSuccessDialog({
  title,
  description,
  cta,
}: ActionSuccessDialogParams) {
  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>{title}</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col items-center gap-y-4">
        <CheckmarkIcon size={100} />
        <p className="text-center">{description}</p>
        {!!cta && (
          <PrimaryButton className="w-full" onClick={cta.onClick}>
            {cta.label}
          </PrimaryButton>
        )}
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
