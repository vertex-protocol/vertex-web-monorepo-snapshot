import { ActionSummary } from 'client/components/ActionSummary';
import { ErrorPanel } from 'client/components/ErrorPanel';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SubaccountQuoteTransferAmountInput } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferAmountInput';
import { SubaccountQuoteTransferEnableBorrowsSwitch } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferEnableBorrowsSwitch';
import { SubaccountQuoteTransferInputSummary } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferInputSummary';
import { SubaccountQuoteTransferOverviewCards } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferOverviewCards';
import { SubaccountQuoteTransferSelect } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferSelect';
import { SubaccountQuoteTransferSubmitButton } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferSubmitButton';
import { SubaccountQuoteTransferSummaryDisclosure } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferSummaryDisclosure';
import { useSubaccountQuoteTransferAmountErrorTooltipContent } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferAmountErrorTooltipContent';
import { useSubaccountQuoteTransferForm } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferForm';

export interface SubaccountQuoteTransferDialogParams {
  recipientSubaccountName?: string;
}

export function SubaccountQuoteTransferDialog({
  recipientSubaccountName,
}: SubaccountQuoteTransferDialogParams) {
  const { hide } = useDialog();
  const {
    form,
    formError,
    hasSameSubaccountError,
    amountInputValueUsd,
    validateAmount,
    validPercentageAmount,
    onFractionSelected,
    enableBorrows,
    decimalAdjustedMaxWithdrawableWithFee,
    subaccounts,
    senderSubaccount,
    recipientSubaccount,
    currentSubaccount,
    primaryQuoteToken,
    senderEstimateStateTxs,
    recipientEstimateStateTxs,
    senderQuoteBalanceDelta,
    recipientQuoteBalanceDelta,
    buttonState,
    onSubmit,
  } = useSubaccountQuoteTransferForm({ recipientSubaccountName });

  const { register, setValue } = form;

  const amountErrorTooltipContent =
    useSubaccountQuoteTransferAmountErrorTooltipContent({
      formError,
      primaryQuoteTokenSymbol: primaryQuoteToken.symbol,
    });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Transfer Funds</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <div className="grid grid-cols-2">
            <SubaccountQuoteTransferSelect
              id="senderSubaccountName"
              form={form}
              subaccounts={subaccounts}
              selectedSubaccount={senderSubaccount}
            />
            <SubaccountQuoteTransferSelect
              id="recipientSubaccountName"
              form={form}
              subaccounts={subaccounts}
              selectedSubaccount={recipientSubaccount}
            />
          </div>
          <SubaccountQuoteTransferOverviewCards
            currentSubaccount={currentSubaccount}
            senderSubaccount={senderSubaccount}
            recipientSubaccount={recipientSubaccount}
            primaryQuoteToken={primaryQuoteToken}
          />
          {hasSameSubaccountError && (
            <ErrorPanel>You cannot transfer to the same account.</ErrorPanel>
          )}
          <div className="flex flex-col gap-y-3.5">
            <SubaccountQuoteTransferEnableBorrowsSwitch
              enableBorrows={enableBorrows}
              form={form}
            />
            <div className="flex flex-col gap-y-1.5">
              <SubaccountQuoteTransferAmountInput
                {...register('amount', { validate: validateAmount })}
                estimatedValueUsd={amountInputValueUsd}
                error={amountErrorTooltipContent}
                primaryQuoteToken={primaryQuoteToken}
                onFocus={() => setValue('amountSource', 'absolute')}
              />
              <SubaccountQuoteTransferInputSummary
                decimalAdjustedMaxWithdrawableWithFee={
                  decimalAdjustedMaxWithdrawableWithFee
                }
                enableBorrows={enableBorrows}
                onFractionSelected={onFractionSelected}
                symbol={primaryQuoteToken.symbol}
              />
            </div>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
          />
          <ActionSummary.Container>
            <SubaccountQuoteTransferSummaryDisclosure
              senderEstimateStateTxs={senderEstimateStateTxs}
              recipientEstimateStateTxs={recipientEstimateStateTxs}
              senderQuoteBalanceDelta={senderQuoteBalanceDelta}
              recipientQuoteBalanceDelta={recipientQuoteBalanceDelta}
              symbol={primaryQuoteToken.symbol}
              senderSubaccount={senderSubaccount}
              recipientSubaccount={recipientSubaccount}
            />
            <SubaccountQuoteTransferSubmitButton state={buttonState} />
          </ActionSummary.Container>
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
