import { ButtonHelperInfo, TextButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { Icons } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { usePushHistoryPage } from 'client/hooks/ui/navigation/usePushHistoryPage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CollateralSelectInput } from 'client/modules/collateral/components/CollateralSelectInput';
import { DelayedWithdrawalWarning } from 'client/modules/collateral/components/DelayedWithdrawalWarning';
import { WithdrawSummaryDisclosure } from 'client/modules/collateral/withdraw/components/WithdrawSummaryDisclosure';
import { useWithdrawForm } from 'client/modules/collateral/withdraw/hooks/useWithdrawForm';
import { BorrowingFundsDismissible } from './BorrowingFundsDismissible';
import { EnableBorrowsSwitch } from './EnableBorrowsSwitch';
import { WithdrawButton } from './WithdrawButton';
import { WithdrawInputSummary } from './WithdrawInputSummary';
import { useWithdrawAmountErrorTooltipContent } from '../hooks/useWithdrawAmountErrorTooltipContent';
import { Form } from 'client/components/Form';

interface Props {
  defaultEnableBorrows: boolean;
  onClose: () => void;
  onShowHelpClick: () => void;
}

export function WithdrawFormContent({
  defaultEnableBorrows,
  onClose,
  onShowHelpClick,
}: Props) {
  const { hide } = useDialog();
  const pushHistoryPage = usePushHistoryPage();
  const {
    formError,
    suggestBorrowing,
    showGasWarning,
    selectedProduct,
    selectedProductMaxWithdrawable,
    availableProducts,
    buttonState,
    estimateStateTxs,
    form,
    validPercentageAmount,
    amountInputValueUsd,
    disableAmountInputs,
    enableBorrows,
    onEnableBorrowsChange,
    validateAmount,
    onFractionSelected,
    onMaxAmountSelected,
    onSubmit,
  } = useWithdrawForm({ defaultEnableBorrows });

  const amountErrorTooltipContent = useWithdrawAmountErrorTooltipContent({
    formError,
    suggestBorrowing,
  });

  const dialogTitle = enableBorrows ? 'Borrow & Withdraw' : 'Withdraw';

  return (
    <>
      <BaseDialog.Title
        onClose={onClose}
        endElement={
          <TextButton
            startIcon={<Icons.MdAdsClick size={16} />}
            className="gap-x-1 px-4 text-xs font-medium"
            onClick={onShowHelpClick}
          >
            FAQ
          </TextButton>
        }
      >
        {dialogTitle}
      </BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
          <BorrowingFundsDismissible enableBorrows={enableBorrows} />
          <div className="flex flex-col gap-y-3.5">
            <EnableBorrowsSwitch
              enableBorrows={enableBorrows}
              onEnableBorrowsChange={onEnableBorrowsChange}
              className="px-1"
            />
            <div>
              <CollateralSelectInput
                {...form.register('amount', {
                  validate: validateAmount,
                })}
                onFocus={() => form.setValue('amountSource', 'absolute')}
                estimatedValueUsd={amountInputValueUsd}
                disabled={disableAmountInputs}
                dropdownProps={{
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
            disabled={disableAmountInputs}
          />
          {showGasWarning && <DelayedWithdrawalWarning />}
          <div className="flex flex-col gap-y-3 pt-2">
            <ActionSummary.Container>
              <WithdrawSummaryDisclosure
                estimateStateTxs={estimateStateTxs}
                enableBorrows={enableBorrows}
                feeAmount={selectedProduct?.fee?.amount}
                productId={selectedProduct?.productId}
                triggerOpen={buttonState === 'idle'}
                symbol={selectedProduct?.symbol}
              />
              <WithdrawButton
                state={buttonState}
                enableBorrows={enableBorrows}
              />
            </ActionSummary.Container>
            {buttonState === 'success' && (
              <ButtonHelperInfo.Content className="flex flex-col gap-y-3">
                Withdrawals will be submitted on-chain once the gas threshold is{' '}
                reached.
                <LinkButton
                  color="white"
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
      </BaseDialog.Body>
    </>
  );
}
