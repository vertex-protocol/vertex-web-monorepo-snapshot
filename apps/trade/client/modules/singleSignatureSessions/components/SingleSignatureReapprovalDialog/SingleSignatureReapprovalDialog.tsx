import { PrimaryButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeSlowModeEntrypoint } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint';
import { SingleSignatureReapprovalSubmitButton } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapprovalSubmitButton';
import { useSingleSignatureReapprovalDialog } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/useSingleSignatureReapprovalDialog';

export function SingleSignatureReapprovalDialog() {
  const { hide } = useDialog();
  const { rememberMe, setRememberMe, buttonState, onSubmit } =
    useSingleSignatureReapprovalDialog();
  const isSmartContractWalletConnected = useIsSmartContractWalletConnected();

  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
  });

  const actionContent = (() => {
    if (isSmartContractWalletConnected) {
      // Hide the actions to divert their attention to SignatureModeSlowModeEntrypoint
      return null;
    }
    if (userStateErrorButtonProps) {
      return <PrimaryButton {...userStateErrorButtonProps} />;
    }

    return (
      <div className="flex flex-col gap-y-2">
        <RememberMeSwitch
          disabled={buttonState === 'loading'}
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        />
        <SingleSignatureReapprovalSubmitButton
          onSubmit={onSubmit}
          buttonState={buttonState}
        />
      </div>
    );
  })();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Approve 1-Click Trading
      </BaseAppDialog.Title>
      <BaseAppDialog.Body className="text-text-tertiary">
        <div className="flex flex-col gap-y-2">
          <p>
            Approve 1-Click Trading to enjoy a seamless trading experience and
            to enable TP/SL orders.
          </p>
          <SignatureModeSlowModeEntrypoint
            isSmartContractWalletConnected={isSmartContractWalletConnected}
          />
        </div>
        {actionContent}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
