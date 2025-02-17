import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { ErrorPanel } from 'client/components/ErrorPanel';
import { Form } from 'client/components/Form';
import { SLOW_MODE_FEE_AMOUNT_USDC } from 'client/hooks/subaccount/useSlowModeFeeAllowance';
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
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const {
    form,
    formError,
    privateKeyInputError,
    validatePrivateKey,
    setRandomPrivateKey,
    buttonState,
    userAction,
    onEnableSingleSignatureChange,
    onSubmit,
  } = useSignatureModeSlowModeSettingsDialog();

  const privateKeyErrorTooltipContent =
    useSlowModeSettingsPrivateKeyErrorTooltipContent({
      error: privateKeyInputError,
    });

  const isSingleSignatureEnabled = form.watch('selectedMode') === 'sign_once';
  const disablePrivateKeyInput = !isSingleSignatureEnabled;
  const hasInsufficientBalanceForFee =
    formError === 'insufficient_balance_for_fee';

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
          {/*Show clear warning to user when they don't have enough balance for the fee*/}
          {hasInsufficientBalanceForFee && (
            <ErrorPanel>
              Insufficient {primaryQuoteSymbol} balance. Please ensure that you
              have {SLOW_MODE_FEE_AMOUNT_USDC} {primaryQuoteSymbol} in your
              wallet to pay the transaction fee.
            </ErrorPanel>
          )}
          <SlowModeSettingsActionButton
            userAction={userAction}
            buttonState={buttonState}
          />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
