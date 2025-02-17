import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { TextButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { CollateralSelectInput } from 'client/modules/collateral/components/CollateralSelectInput';
import { DepositSummaryDisclosure } from 'client/modules/collateral/components/DepositSummaryDisclosure';
import { MaxRepayDismissible } from 'client/modules/collateral/repay/components/MaxRepayDismissible';
import { RepayConversionRateDisplay } from 'client/modules/collateral/repay/components/RepayConversionRateDisplay';
import { RepayConvertButton } from 'client/modules/collateral/repay/components/RepayConvertButton';
import { RepayConvertDismissible } from 'client/modules/collateral/repay/components/RepayConvertDismissible';
import { RepayConvertFormErrorPanel } from 'client/modules/collateral/repay/components/RepayConvertFormErrorPanel';
import { RepayConvertInputWrapper } from 'client/modules/collateral/repay/components/RepayConvertInputWrapper';
import { useRepayConvertForm } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertForm';
import { useRepayConvertReplayAmountErrorTooltipContent } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertReplayAmountErrorTooltipContent';

export function RepayConvertTab({
  initialProductId,
}: {
  initialProductId: number | undefined;
}) {
  const {
    form,
    amountInputError,
    formError,
    availableRepayProducts,
    availableSourceProducts,
    isMaxRepayDismissibleOpen,
    disableMaxRepayButton,
    selectedRepayProduct,
    selectedSourceProduct,
    oracleConversionPrice,
    market,
    estimateStateTxs,
    buttonState,
    repayAmountValueUsd,
    maxRepaySize,
    sizeIncrement,
    onMaxRepayClicked,
    onAmountBorrowingClicked,
    onSubmit,
    validateRepayAmount,
    sourceAmount,
    sourceAmountValueUsd,
  } = useRepayConvertForm({
    initialProductId,
  });

  const repayAmountErrorTooltipContent =
    useRepayConvertReplayAmountErrorTooltipContent({
      amountInputError,
      sizeIncrement,
    });

  return (
    <Form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
      <div className="flex flex-col gap-y-2.5">
        <RepayConvertDismissible />
        {isMaxRepayDismissibleOpen && <MaxRepayDismissible />}
        {/*Amount input*/}
        <RepayConvertInputWrapper
          labelContent={
            <div className="flex items-center justify-between">
              <p>Repay</p>
              <TextButton
                colorVariant="accent"
                className="text-xs"
                onClick={onMaxRepayClicked}
                disabled={disableMaxRepayButton}
              >
                Max Repay
              </TextButton>
            </div>
          }
        >
          <CollateralSelectInput
            {...form.register('repayAmount', {
              validate: validateRepayAmount,
            })}
            estimatedValueUsd={repayAmountValueUsd}
            selectProps={{
              selectedProduct: selectedRepayProduct,
              availableProducts: availableRepayProducts,
              assetAmountTitle: 'Borrowing',
              onProductSelected: (productId) => {
                // Skip validation and other states as you can only select from available options
                form.setValue('repayProductId', productId);
                form.resetField('repayAmount');
              },
            }}
            error={repayAmountErrorTooltipContent}
          />
          <div className="flex flex-col gap-y-0.5">
            <InputSummaryItem
              label="Borrowing:"
              definitionTooltipId="repayAmountBorrowing"
              currentValue={selectedRepayProduct?.amountBorrowed}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              onValueClick={onAmountBorrowingClicked}
            />
            <InputSummaryItem
              label="Max Repay:"
              definitionTooltipId="repayConvertMaxRepay"
              currentValue={maxRepaySize}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              onValueClick={onMaxRepayClicked}
            />
          </div>
        </RepayConvertInputWrapper>
        {/* Sell Input */}
        <RepayConvertInputWrapper labelContent="Sell">
          <CollateralSelectInput
            readOnly
            estimatedValueUsd={sourceAmountValueUsd}
            value={sourceAmount?.toString() ?? ''}
            selectProps={{
              availableProducts: availableSourceProducts,
              disabled: !availableSourceProducts.length,
              selectedProduct: selectedSourceProduct,
              assetAmountTitle: 'Balance',
              onProductSelected: (productId) => {
                // Skip validation and other states as you can only select from available options
                form.setValue('sourceProductId', productId);
              },
            }}
          />
          <InputSummaryItem
            label="Balance:"
            currentValue={selectedSourceProduct?.decimalAdjustedVertexBalance}
            formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          />
        </RepayConvertInputWrapper>
      </div>
      <RepayConvertFormErrorPanel formError={formError} />
      <div className="flex flex-col gap-y-3">
        <RepayConversionRateDisplay
          className="px-1"
          market={market}
          repayConversionPrice={oracleConversionPrice}
        />
        <ActionSummary.Container>
          <DepositSummaryDisclosure
            estimateStateTxs={estimateStateTxs}
            isHighlighted={buttonState === 'idle'}
            productId={selectedRepayProduct?.productId}
            symbol={selectedRepayProduct?.symbol}
          />
          <RepayConvertButton state={buttonState} />
        </ActionSummary.Container>
      </div>
    </Form>
  );
}
