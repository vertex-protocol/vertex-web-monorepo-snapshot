import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
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
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>{title}</BaseAppDialog.Title>
      <BaseAppDialog.Body className="items-center">
        <CheckmarkIcon size={100} />
        <p className="text-center text-base">{description}</p>
        {!!cta && (
          <PrimaryButton className="w-full" onClick={cta.onClick}>
            {cta.label}
          </PrimaryButton>
        )}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
