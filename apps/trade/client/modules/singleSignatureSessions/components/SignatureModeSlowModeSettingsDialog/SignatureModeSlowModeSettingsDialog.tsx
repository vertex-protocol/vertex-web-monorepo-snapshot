import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useSignatureModeSlowModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/useSignatureModeSlowModeSettingsDialog';
import React from 'react';
import { SlowModeSettingsActionButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeSettingsActionButton';
import { PrivateKeyInput } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/PrivateKeyInput';
import { SlowModeEnable1CTSwitch } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeEnable1CTSwitch';
import { SlowModeSettingsInfoCollapsible } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeSettingsInfoCollapsible';
import { Divider } from '@vertex-protocol/web-ui';
import { useSlowModeSettingsPrivateKeyErrorTooltipContent } from './hooks/useSlowModeSettingsPrivateKeyErrorTooltipContent';
import { Form } from 'client/components/Form';

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
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>
        Trading Mode (Advanced)
      </BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex flex-col gap-y-4 text-sm">
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
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
