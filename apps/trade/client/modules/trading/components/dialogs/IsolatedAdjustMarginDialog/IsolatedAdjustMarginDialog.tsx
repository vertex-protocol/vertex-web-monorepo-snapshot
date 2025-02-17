import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { IsolatedAdjustMarginDialogSummaryDisclosure } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginDialogSummaryDisclosure';
import { IsolatedAdjustMarginInputs } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginInputs/IsolatedAdjustMarginInputs';
import { IsolatedAdjustMarginModeControl } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginModeControl';
import { IsolatedAdjustMarginSubmitButton } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginSubmitButton';
import { useIsolatedAdjustMarginForm } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/useIsolatedAdjustMarginForm';

export interface IsolatedAdjustMarginDialogParams {
  isoSubaccountName: string;
}

export function IsolatedAdjustMarginDialog({
  isoSubaccountName,
}: IsolatedAdjustMarginDialogParams) {
  const { hide } = useDialog();
  const {
    form,
    isAddMargin,
    validAmount,
    validPercentageAmount,
    maxWithdrawable,
    primaryQuoteTokenIcon,
    primaryQuoteTokenSymbol,
    estimatedAdjustmentValueUsd,
    formError,
    enableBorrows,
    buttonState,
    validateAmount,
    onSubmit,
    onAdjustmentModeChange,
    onFractionSelected,
    onEnableBorrowsChange,
    onMaxAmountClicked,
  } = useIsolatedAdjustMarginForm({
    isoSubaccountName,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Adjust Margin</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <IsolatedAdjustMarginModeControl
            isAddMargin={isAddMargin}
            onAdjustmentModeChange={onAdjustmentModeChange}
          />
          <IsolatedAdjustMarginInputs
            enableBorrows={enableBorrows}
            estimatedAdjustmentValueUsd={estimatedAdjustmentValueUsd}
            form={form}
            formError={formError}
            isAddMargin={isAddMargin}
            maxWithdrawable={maxWithdrawable}
            onEnableBorrowsChange={onEnableBorrowsChange}
            onMaxAmountClicked={onMaxAmountClicked}
            primaryQuoteTokenIconSrc={primaryQuoteTokenIcon.asset}
            primaryQuoteTokenSymbol={primaryQuoteTokenSymbol}
            validateAmount={validateAmount}
          />
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
          />
          <ActionSummary.Container>
            <IsolatedAdjustMarginDialogSummaryDisclosure
              primaryQuoteTokenSymbol={primaryQuoteTokenSymbol}
              isAddMargin={isAddMargin}
              isoSubaccountName={isoSubaccountName}
              validAmount={validAmount}
            />
            <IsolatedAdjustMarginSubmitButton
              isAddMargin={isAddMargin}
              state={buttonState}
            />
          </ActionSummary.Container>
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
