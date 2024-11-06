import { PrimaryButton, TextButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeEnable1CTSubmitButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeEnable1CTSubmitButton';
import { SignatureModeUserStateErrorCard } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeUserStateErrorCard';
import { useSignatureModeEnable1CTDialogContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/useSignatureModeEnable1CTDialogContent';
import { SignatureModeSlowModeEntrypoint } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint';

interface Props {
  onEnableSuccess(): void;
}

export function SignatureModeEnable1CTDialogContent({
  onEnableSuccess,
}: Props) {
  const {
    buttonState,
    userStateError,
    onSubmit,
    disableInputs,
    rememberMe,
    setRememberMe,
    requiresSingleSignatureSetup,
    skipSignOnceSuggestion,
  } = useSignatureModeEnable1CTDialogContent({
    onEnableSuccess,
  });

  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
  });

  const actionContent = (() => {
    if (userStateErrorButtonProps) {
      return <PrimaryButton {...userStateErrorButtonProps} />;
    }

    return (
      <>
        <div className="flex flex-col gap-y-2">
          <RememberMeSwitch
            disabled={disableInputs}
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          <SignatureModeEnable1CTSubmitButton
            buttonState={buttonState}
            onSubmit={onSubmit}
          />
        </div>
        {requiresSingleSignatureSetup && (
          <TextButton
            className="text-text-tertiary text-center"
            onClick={skipSignOnceSuggestion}
          >
            Sign every transaction instead
          </TextButton>
        )}
      </>
    );
  })();

  return (
    <>
      <div className="text-text-tertiary flex flex-col gap-y-2">
        <p>
          Enjoy a seamless trading experience with 1-Click Trading. Sign one
          approval transaction at the start of your trading session and you
          won&apos;t need to sign again.
        </p>
        <SignatureModeSlowModeEntrypoint />
      </div>
      <SignatureModeUserStateErrorCard userStateError={userStateError} />
      {actionContent}
    </>
  );
}
