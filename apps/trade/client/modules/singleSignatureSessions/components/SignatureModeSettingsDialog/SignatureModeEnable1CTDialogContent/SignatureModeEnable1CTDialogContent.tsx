import { PrimaryButton, TextButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeEnable1CTSubmitButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeEnable1CTSubmitButton';
import { SignatureModeUserStateErrorCard } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeUserStateErrorCard';
import { useSignatureModeEnable1CTDialogContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/useSignatureModeEnable1CTDialogContent';
import { SignatureModeInfo } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeInfo';

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
  const isSmartContractWalletConnected = useIsSmartContractWalletConnected();

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
            colorVariant="tertiary"
            className="text-center"
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
      <SignatureModeInfo
        isSmartContractWalletConnected={isSmartContractWalletConnected}
      />
      {/*Only show the setup content if the user is using a normal wallet, otherwise, divert their attention to the slow mode settings in SignatureModeInfo*/}
      {!isSmartContractWalletConnected && (
        <>
          <SignatureModeUserStateErrorCard userStateError={userStateError} />
          {actionContent}
        </>
      )}
    </>
  );
}
