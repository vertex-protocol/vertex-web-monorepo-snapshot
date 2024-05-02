import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeNumSwitchesRemaining } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeNumSwitchesRemaining';
import { SignatureModeRadioGroup } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeRadioGroup';
import { SignatureModeSaveSettingsButton } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeSaveSettingsButton';
import { SignatureModeUserStateErrorCard } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeUserStateErrorCard';
import { SignatureModeUserStateWarning } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeUserWarning';
import { useSignatureModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/useSignatureModeSettingsDialog';
import { SignatureModeSlowModeEntrypoint } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint';
import { SignatureTxCountMessage } from 'client/modules/singleSignatureSessions/components/SignatureTxCountMessage';

export function SignatureModeSettingsDialog() {
  const { hide } = useDialog();
  const {
    selectedMode,
    rememberMe,
    hasChangedMode,
    setRememberMe,
    showRememberMeToggle,
    buttonState,
    disableInputs,
    userStateWarning,
    userStateError,
    numSwitchesRemaining,
    totalTxLimit,
    onSubmit,
    setSelectedMode,
  } = useSignatureModeSettingsDialog();

  const checkIcon = <Icons.MdCheck size={16} className="text-accent" />;
  const closeIcon = <Icons.MdClose size={16} className="text-disabled" />;

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Trading Mode</BaseDialog.Title>
      <BaseDialog.Body className="flex w-full flex-col gap-y-6">
        <SignatureModeUserStateErrorCard userStateError={userStateError} />
        {/*Signature type buttons*/}
        <SignatureModeRadioGroup.Root
          className="flex flex-col gap-y-2"
          value={selectedMode}
          onValueChange={setSelectedMode}
        >
          <SignatureModeRadioGroup.Card
            value="sign_once"
            title={
              <div className="flex items-center gap-x-1.5">
                <span>One-Click Trading</span>
                <div
                  className={joinClassNames(
                    'bg-surface-1 text-text-secondary text-2xs',
                    'flex items-center gap-x-1 rounded-2xl px-2 py-0.5',
                    'border-accent border',
                  )}
                >
                  <Icons.BsFillLightningChargeFill
                    className="text-accent"
                    size={8}
                  />
                  <span>Suggested</span>
                </div>
              </div>
            }
            disabled={disableInputs}
            active={selectedMode === 'sign_once'}
            description="Only sign one approval transaction when you start a trading session."
            listContent={
              <>
                <SignatureModeRadioGroup.CardListItem
                  description="Seamless Trading"
                  icon={checkIcon}
                />
                <SignatureModeRadioGroup.CardListItem
                  description="Enables take profit & stop loss orders"
                  icon={checkIcon}
                />
                <SignatureModeNumSwitchesRemaining
                  className="mt-2"
                  numSwitchesRemaining={numSwitchesRemaining}
                  totalTxLimit={totalTxLimit}
                />
              </>
            }
          />
          <SignatureModeRadioGroup.Card
            value="sign_always"
            title="Sign Every Transaction"
            active={selectedMode === 'sign_always'}
            description="Every order requires a wallet signature."
            disabled={disableInputs}
            listContent={
              <SignatureModeRadioGroup.CardListItem
                description="Disables take profit & stop loss orders"
                icon={closeIcon}
              />
            }
          />
          <SignatureModeSlowModeEntrypoint />
        </SignatureModeRadioGroup.Root>
        <SignatureModeUserStateWarning userStateWarning={userStateWarning} />
        <div className="flex flex-col gap-y-3">
          {showRememberMeToggle && (
            <RememberMeSwitch
              disabled={disableInputs}
              checked={rememberMe}
              onCheckedChange={setRememberMe}
            />
          )}
          <div className="flex flex-col gap-y-1.5">
            <SignatureModeSaveSettingsButton
              buttonState={buttonState}
              onSubmit={onSubmit}
            />
            {buttonState === 'enabled' && (
              <SignatureTxCountMessage
                isSignOnceSelected={selectedMode === 'sign_once'}
                hasChangedMode={hasChangedMode}
              />
            )}
          </div>
        </div>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
