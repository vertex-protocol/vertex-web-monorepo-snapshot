import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Button } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { CollateralSelectInput } from 'client/modules/collateral/components/CollateralSelectInput';
import { DepositSummaryDisclosure } from 'client/modules/collateral/components/DepositSummaryDisclosure';
import { useDepositAmountErrorTooltipContent } from 'client/modules/collateral/deposit/hooks/useDepositAmountErrorTooltipContent';
import { RepayDepositButton } from 'client/modules/collateral/repay/components/RepayDepositButton';
import { useRepayDepositForm } from 'client/modules/collateral/repay/hooks/useRepayDepositForm';

export const RepayDepositTab = ({
  initialProductId,
}: {
  initialProductId: number | undefined;
}) => {
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
    onAmountBorrowingClicked,
    onMaxDepositClicked,
    validateAmount,
    onSubmit,
  } = useRepayDepositForm({ initialProductId });

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
        <div className="flex flex-col gap-y-1.5">
          <CollateralSelectInput
            {...form.register('amount', {
              validate: validateAmount,
            })}
            estimatedValueUsd={amountInputValueUsd}
            selectProps={{
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
          <div className="flex flex-col gap-y-0.5">
            <InputSummaryItem
              label="Borrowing:"
              definitionTooltipId="repayAmountBorrowing"
              currentValue={balances.current?.borrowed}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              onValueClick={onAmountBorrowingClicked}
            />
            <InputSummaryItem
              label="Max deposit:"
              definitionTooltipId="repayDepositMaxDeposit"
              currentValue={balances.current?.wallet}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              onValueClick={onMaxDepositClicked}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2.5 pt-3">
        <ActionSummary.Container>
          <DepositSummaryDisclosure
            estimateStateTxs={estimateStateTxs}
            productId={selectedProduct?.productId}
            isHighlighted={buttonState === 'idle'}
            symbol={selectedProduct?.symbol}
          />
          <RepayDepositButton state={buttonState} />
        </ActionSummary.Container>
      </div>
    </Form>
  );
};
