import { Divider } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useSignatureModeSlowModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/useSignatureModeSlowModeSettingsDialog';
import { useSlowModeSettingsPrivateKeyErrorTooltipContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/useSlowModeSettingsPrivateKeyErrorTooltipContent';
import { PrivateKeyInput } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/PrivateKeyInput';
import { SlowModeEnable1CTSwitch } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeEnable1CTSwitch';
import { SlowModeSettingsActionButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeSettingsActionButton';
import { SlowModeSettingsInfoCollapsible } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeSettingsInfoCollapsible';

export function SignatureModeSlowModeSettingsDialog() {
  const { hide } = useDialog();
  const {
    form,
    formError,
    validatePrivateKey,
    setRandomPrivateKey,
    buttonState,
    userAction,
    onEnableSingleSignatureChange,
    onSubmit,
  } = useSignatureModeSlowModeSettingsDialog();

  const privateKeyErrorTooltipContent =
    useSlowModeSettingsPrivateKeyErrorTooltipContent({ formError });

  const isSingleSignatureEnabled = form.watch('selectedMode') === 'sign_once';
  const disablePrivateKeyInput = !isSingleSignatureEnabled;

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Advanced 1CT</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <SlowModeSettingsInfoCollapsible />
          <Divider />
          <SlowModeEnable1CTSwitch
            checked={isSingleSignatureEnabled}
            onCheckedChange={onEnableSingleSignatureChange}
          />
          <PrivateKeyInput
            form={form}
            error={privateKeyErrorTooltipContent}
            setRandomPrivateKey={setRandomPrivateKey}
            validatePrivateKey={validatePrivateKey}
            disabled={disablePrivateKeyInput}
          />
          <SlowModeSettingsActionButton
            userAction={userAction}
            buttonState={buttonState}
          />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
