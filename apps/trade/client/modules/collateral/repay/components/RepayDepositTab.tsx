import { Button } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { InputSummary } from 'client/components/InputSummary';
import { CollateralSelectInput } from 'client/modules/collateral/components/CollateralSelectInput';
import { useRepayDepositForm } from 'client/modules/collateral/repay/hooks/useRepayDepositForm';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { DepositSummaryDisclosure } from '../../components/DepositSummaryDisclosure';
import { useDepositAmountErrorTooltipContent } from '../../deposit/hooks/useDepositAmountErrorTooltipContent';
import { RepayDepositButton } from './RepayDepositButton';

export const RepayDepositTab = () => {
  const {
    form,
    formError,
    selectedProduct,
    availableProducts,
    balances,
    estimateStateTxs,
    buttonState,
    amountInputValueUsd,
    onMaxRepayClicked,
    validateAmount,
    onSubmit,
  } = useRepayDepositForm();

  const amountErrorTooltipContent = useDepositAmountErrorTooltipContent({
    formError,
  });

  return (
    <Form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
      {/*Amount input*/}
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-text-secondary text-sm">Repay</h2>
          <Button
            as="div"
            className="text-accent text-xs"
            onClick={onMaxRepayClicked}
          >
            Max Repay
          </Button>
        </div>
        <div>
          <CollateralSelectInput
            {...form.register('amount', {
              validate: validateAmount,
            })}
            estimatedValueUsd={amountInputValueUsd}
            dropdownProps={{
              selectedProduct,
              availableProducts,
              assetAmountTitle: 'Borrowing',
              onProductSelected: (productId) => {
                // Skip validation and other states as you can only select from available options
                form.setValue('productId', productId);
              },
            }}
            error={amountErrorTooltipContent}
            onFocus={() => {
              form.setValue('amountSource', 'absolute');
            }}
          />
          <InputSummary.Container>
            <InputSummary.Item
              label="Borrowing:"
              definitionTooltipId="repayAmountBorrowing"
              currentValue={balances.current?.borrowed}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
            <InputSummary.Item
              label="Max deposit:"
              definitionTooltipId="repayDepositMaxDeposit"
              currentValue={balances.current?.wallet}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          </InputSummary.Container>
        </div>
      </div>
      <div className="flex flex-col gap-y-2.5 pt-3">
        <ActionSummary.Container>
          <DepositSummaryDisclosure
            estimateStateTxs={estimateStateTxs}
            productId={selectedProduct?.productId}
            triggerOpen={buttonState === 'idle'}
            symbol={selectedProduct?.symbol}
          />
          <RepayDepositButton state={buttonState} />
        </ActionSummary.Container>
      </div>
    </Form>
  );
};
