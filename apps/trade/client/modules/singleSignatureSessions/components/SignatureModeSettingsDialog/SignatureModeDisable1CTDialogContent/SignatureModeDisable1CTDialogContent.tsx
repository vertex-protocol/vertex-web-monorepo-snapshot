import { PrimaryButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeDisable1CTSubmitButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeDisable1CTSubmitButton';
import { SignatureModeNumSwitchesRemaining } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeNumSwitchesRemaining';
import { SignatureModeSaveRememberMeButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeSaveRememberMeButton';
import { SignatureModeUserStateWarning } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeUserWarning';
import { useSignatureModeDisable1CTDialogContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeDisable1CTDialogContent';
import { useSignatureModeRememberMe } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeRememberMe';
import { SignatureModeSlowModeEntrypoint } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint';

interface Props {
  onDisableSuccess(): void;
}

export function SignatureModeDisable1CTDialogContent({
  onDisableSuccess,
}: Props) {
  const {
    buttonState: disable1CTButtonState,
    userStateWarning,
    numSwitchesRemaining,
    totalTxLimit,
    onSubmit: onSubmitDisable1CT,
  } = useSignatureModeDisable1CTDialogContent({
    onDisableSuccess,
  });

  const {
    buttonState: rememberMeButtonState,
    showSaveRememberMeButton,
    onSubmit: onSubmitRememberMe,
    rememberMe,
    setRememberMe,
  } = useSignatureModeRememberMe();

  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
  });

  const actionContent = (() => {
    if (userStateErrorButtonProps) {
      return <PrimaryButton {...userStateErrorButtonProps} />;
    }

    return (
      <div className="flex flex-col gap-y-2">
        <RememberMeSwitch
          disabled={rememberMeButtonState === 'loading'}
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        />
        {showSaveRememberMeButton && (
          <SignatureModeSaveRememberMeButton
            buttonState={rememberMeButtonState}
            onSubmit={onSubmitRememberMe}
          />
        )}
        <SignatureModeDisable1CTSubmitButton
          buttonState={disable1CTButtonState}
          onSubmit={onSubmitDisable1CT}
        />
      </div>
    );
  })();

  return (
    <>
      <div className="text-text-tertiary flex flex-col gap-y-2">
        <p>
          Enjoy a seamless trading experience with 1-Click Trading. Sign one
          approval transaction at the start of your trading session and you
          won’t need to sign again.
        </p>
        <SignatureModeSlowModeEntrypoint />
      </div>
      <SignatureModeUserStateWarning userStateWarning={userStateWarning} />
      {actionContent}
      <SignatureModeNumSwitchesRemaining
        numSwitchesRemaining={numSwitchesRemaining}
        totalTxLimit={totalTxLimit}
      />
    </>
  );
}
