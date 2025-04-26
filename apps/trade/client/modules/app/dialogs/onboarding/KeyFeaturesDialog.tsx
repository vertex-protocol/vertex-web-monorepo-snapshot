import { PrimaryButton } from '@vertex-protocol/web-ui';
import { KeyFeatures } from 'client/components/KeyFeatures';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function KeyFeaturesDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Welcome!</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <KeyFeatures />
        <PrimaryButton onClick={hide}>Start Trading</PrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
