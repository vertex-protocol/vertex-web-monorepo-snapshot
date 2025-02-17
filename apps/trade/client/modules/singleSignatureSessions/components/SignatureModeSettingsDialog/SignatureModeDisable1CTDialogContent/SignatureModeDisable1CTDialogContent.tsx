import { PrimaryButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeDisable1CTSubmitButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeDisable1CTSubmitButton';
import { SignatureModeNumSwitchesRemaining } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeNumSwitchesRemaining';
import { SignatureModeSaveRememberMeButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeSaveRememberMeButton';
import { SignatureModeUserStateWarning } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeUserWarning';
import { useSignatureModeDisable1CTDialogContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeDisable1CTDialogContent';
import { useSignatureModeRememberMe } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeRememberMe';
import { SignatureModeInfo } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeInfo';

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
  const isSmartContractWalletConnected = useIsSmartContractWalletConnected();

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
        <SignatureModeNumSwitchesRemaining
          numSwitchesRemaining={numSwitchesRemaining}
          totalTxLimit={totalTxLimit}
        />
      </div>
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
          <SignatureModeUserStateWarning userStateWarning={userStateWarning} />
          {actionContent}
        </>
      )}
    </>
  );
}
