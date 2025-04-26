import { ButtonHelperInfo, LinkButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { EnableBorrowsSwitch } from 'client/components/EnableBorrowsSwitch';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { usePushHistoryPage } from 'client/hooks/ui/navigation/usePushHistoryPage';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CollateralSelectInput } from 'client/modules/collateral/components/CollateralSelectInput';
import { DelayedWithdrawalWarning } from 'client/modules/collateral/components/DelayedWithdrawalWarning';
import { SlowMode1CTSetupPrompt } from 'client/modules/collateral/components/SlowMode1CTSetupPrompt';
import { BorrowingFundsDismissible } from 'client/modules/collateral/withdraw/components/BorrowingFundsDismissible';
import { WithdrawButton } from 'client/modules/collateral/withdraw/components/WithdrawButton';
import { WithdrawInputSummary } from 'client/modules/collateral/withdraw/components/WithdrawInputSummary';
import { WithdrawSummaryDisclosure } from 'client/modules/collateral/withdraw/components/WithdrawSummaryDisclosure';
import { useWithdrawAmountErrorTooltipContent } from 'client/modules/collateral/withdraw/hooks/useWithdrawAmountErrorTooltipContent';
import { useWithdrawForm } from 'client/modules/collateral/withdraw/hooks/useWithdrawForm';

export interface WithdrawDialogParams {
  initialProductId?: number;
}

interface Props extends WithdrawDialogParams {
  defaultEnableBorrows: boolean;
}

export function WithdrawDialog({
  defaultEnableBorrows,
  initialProductId,
}: Props) {
  const { hide } = useDialog();
  const pushHistoryPage = usePushHistoryPage();
  const {
    formError,
    suggestBorrowing,
    showGasWarning,
    showOneClickTradingPrompt,
    selectedProduct,
    selectedProductMaxWithdrawable,
    availableProducts,
    buttonState,
    estimateStateTxs,
    form,
    validPercentageAmount,
    amountInputValueUsd,
    enableBorrows,
    onEnableBorrowsChange,
    validateAmount,
    onFractionSelected,
    onMaxAmountSelected,
    onSubmit,
  } = useWithdrawForm({ defaultEnableBorrows, initialProductId });

  const amountErrorTooltipContent = useWithdrawAmountErrorTooltipContent({
    formError,
    suggestBorrowing,
  });

  const dialogTitle = enableBorrows ? 'Borrow & Withdraw' : 'Withdraw';

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>{dialogTitle}</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <BorrowingFundsDismissible enableBorrows={enableBorrows} />
          {showOneClickTradingPrompt && <SlowMode1CTSetupPrompt />}
          <div className="flex flex-col gap-y-3.5">
            <EnableBorrowsSwitch
              enableBorrows={enableBorrows}
              onEnableBorrowsChange={onEnableBorrowsChange}
            />
            <div className="flex flex-col gap-y-1.5">
              <CollateralSelectInput
                {...form.register('amount', {
                  validate: validateAmount,
                })}
                onFocus={() => form.setValue('amountSource', 'absolute')}
                estimatedValueUsd={amountInputValueUsd}
                selectProps={{
                  selectedProduct,
                  availableProducts,
                  assetAmountTitle: 'Balance',
                  onProductSelected: (productId) => {
                    // Skip validation and other states as you can only select from available options
                    form.setValue('productId', productId);
                  },
                }}
                error={amountErrorTooltipContent}
              />
              <WithdrawInputSummary
                enableBorrows={enableBorrows}
                selectedProductMaxWithdrawable={selectedProductMaxWithdrawable}
                onMaxAmountSelected={onMaxAmountSelected}
              />
            </div>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
          />
          {showGasWarning && <DelayedWithdrawalWarning />}
          <div className="flex flex-col gap-y-3 pt-2">
            <ActionSummary.Container>
              <WithdrawSummaryDisclosure
                estimateStateTxs={estimateStateTxs}
                enableBorrows={enableBorrows}
                feeAmount={selectedProduct?.fee?.amount}
                productId={selectedProduct?.productId}
                symbol={selectedProduct?.symbol}
                isHighlighted={buttonState === 'idle'}
              />
              <WithdrawButton
                state={buttonState}
                enableBorrows={enableBorrows}
              />
            </ActionSummary.Container>
            {buttonState === 'success' && (
              <ButtonHelperInfo.Content>
                Withdrawals will be submitted on-chain once the gas threshold is{' '}
                reached.{' '}
                <LinkButton
                  colorVariant="primary"
                  className="w-max self-start"
                  onClick={() => {
                    pushHistoryPage('withdrawals');
                    // Hide dialog when link is clicked
                    hide();
                  }}
                >
                  Track the status here
                </LinkButton>
              </ButtonHelperInfo.Content>
            )}
          </div>
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
