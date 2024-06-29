import { mergeClassNames } from '@vertex-protocol/web-common';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Button } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { InputSummary } from 'client/components/InputSummary';
import { RepayConvertButton } from 'client/modules/collateral/repay/components/RepayConvertButton';
import { useRepayConvertForm } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertForm';
import { CollateralSelectInput } from '../../components/CollateralSelectInput';
import { DepositSummaryDisclosure } from '../../components/DepositSummaryDisclosure';
import { useRepayConvertReplayAmountErrorTooltipContent } from '../hooks/useRepayConvertForm/useRepayConvertReplayAmountErrorTooltipContent';
import { MaxRepayDismissible } from './MaxRepayDismissible';
import { RepayConversionRateDisplay } from './RepayConversionRateDisplay';
import { RepayConvertDismissible } from './RepayConvertDismissible';
import { RepayConvertInputWrapper } from './RepayConvertInputWrapper';

export function RepayConvertTab() {
  const {
    form,
    formError,
    availableRepayProducts,
    availableSourceProducts,
    isMaxRepayDismissibleOpen,
    disableRepayAmountInput,
    disableMaxRepayButton,
    selectedRepayProduct,
    selectedSourceProduct,
    oracleConversionPrice,
    market,
    estimateStateTxs,
    buttonState,
    repayAmountValueUsd,
    maxRepaySize,
    onMaxRepayClicked,
    onSubmit,
    validateRepayAmount,
    sourceAmount,
    sourceAmountValueUsd,
  } = useRepayConvertForm();

  const repayAmountErrorTooltipContent =
    useRepayConvertReplayAmountErrorTooltipContent({
      formError,
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
              <Button
                className={mergeClassNames(
                  'text-accent text-xs',
                  disableRepayAmountInput ? 'opacity-50' : 'cursor-pointer',
                )}
                onClick={onMaxRepayClicked}
                disabled={disableMaxRepayButton}
              >
                Max Repay
              </Button>
            </div>
          }
        >
          <CollateralSelectInput
            {...form.register('repayAmount', {
              validate: validateRepayAmount,
            })}
            estimatedValueUsd={repayAmountValueUsd}
            disabled={disableRepayAmountInput}
            dropdownProps={{
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
          <InputSummary.Container>
            <InputSummary.Item
              label="Borrowing:"
              definitionTooltipId="repayAmountBorrowing"
              currentValue={selectedRepayProduct?.amountBorrowed}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
            <InputSummary.Item
              label="Max Repay:"
              definitionTooltipId="repayConvertMaxRepay"
              currentValue={maxRepaySize}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          </InputSummary.Container>
        </RepayConvertInputWrapper>
        {/* Sell Input */}
        <RepayConvertInputWrapper labelContent="Sell">
          <CollateralSelectInput
            readOnly
            disabled={!availableSourceProducts.length}
            estimatedValueUsd={sourceAmountValueUsd}
            value={sourceAmount?.toString() ?? ''}
            inputClassName="cursor-default"
            dropdownProps={{
              availableProducts: availableSourceProducts,
              selectedProduct: selectedSourceProduct,
              assetAmountTitle: 'Balance',
              onProductSelected: (productId) => {
                // Skip validation and other states as you can only select from available options
                form.setValue('sourceProductId', productId);
              },
            }}
          />
          <InputSummary.Container>
            <InputSummary.Item
              label="Balance:"
              currentValue={selectedSourceProduct?.decimalAdjustedVertexBalance}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          </InputSummary.Container>
        </RepayConvertInputWrapper>
      </div>
      <div className="flex flex-col gap-y-3">
        <RepayConversionRateDisplay
          className="px-1"
          market={market}
          repayConversionPrice={oracleConversionPrice}
        />
        <ActionSummary.Container>
          <DepositSummaryDisclosure
            estimateStateTxs={estimateStateTxs}
            triggerOpen={buttonState === 'idle'}
            productId={selectedRepayProduct?.productId}
            symbol={selectedRepayProduct?.symbol}
          />
          <RepayConvertButton state={buttonState} />
        </ActionSummary.Container>
      </div>
    </Form>
  );
}
