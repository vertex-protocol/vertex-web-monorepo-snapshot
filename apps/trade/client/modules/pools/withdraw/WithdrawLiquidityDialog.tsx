import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useSubaccountHealthCheckSequencerFee } from 'client/hooks/subaccount/useSubaccountHealthCheckSequencerFee';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpInfoPanel } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanel';
import { useWithdrawLiquidityAmountErrorTooltipContent } from './hooks/useWithdrawLiquidityAmountErrorTooltipContent';
import { useWithdrawLiquidityForm } from './hooks/useWithdrawLiquidityForm';
import { WithdrawLiquidityInput } from './WithdrawLiquidityInput';
import { WithdrawLiquiditySubmitButton } from './WithdrawLiquiditySubmitButton';
import { WithdrawLiquiditySummary } from './WithdrawLiquiditySummary';

export function WithdrawLiquidityDialog() {
  const {
    form,
    formError,
    metadata: pairMetadata,
    priceIncrement,
    currentYield,
    currentLpBalance,
    estimatedChangeAmounts,
    validPercentageAmount,
    buttonState,
    onSubmit,
    validateLpAmount,
    onFractionSelected,
  } = useWithdrawLiquidityForm();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { hide } = useDialog();
  const sequencerFee = useSubaccountHealthCheckSequencerFee();

  const amountTooltipError = useWithdrawLiquidityAmountErrorTooltipContent({
    formError,
  });

  const hasRequiredData = pairMetadata && currentLpBalance;

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Withdraw Liquidity</BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
          <LpInfoPanel
            metadata={pairMetadata}
            currentLpBalance={currentLpBalance}
            currentYield={currentYield}
          />
          <div className="flex flex-col gap-y-2.5">
            <div className="text-text-primary text-xs">Withdraw LP Tokens</div>
            <WithdrawLiquidityInput
              {...form.register('amount', {
                validate: validateLpAmount,
              })}
              error={amountTooltipError}
              estimatedValueUsd={estimatedChangeAmounts?.lpValueUsd}
              onFocus={() => {
                form.setValue('amountSource', 'absolute');
              }}
            />
            <FractionAmountButtons
              onFractionSelected={onFractionSelected}
              selectedFraction={validPercentageAmount}
              className="pt-0.5"
            />
          </div>
          {hasRequiredData && (
            <WithdrawLiquiditySummary
              metadata={pairMetadata}
              priceIncrement={priceIncrement}
              estimatedBaseAmount={estimatedChangeAmounts?.base}
              estimatedQuoteAmount={estimatedChangeAmounts?.quote}
              estimatedBaseValueUsd={estimatedChangeAmounts?.baseValueUsd}
              estimatedQuoteValueUsd={estimatedChangeAmounts?.quoteValueUsd}
              baseOraclePrice={currentLpBalance.oraclePrice}
              feeAmount={sequencerFee}
              quoteSymbol={primaryQuoteToken.symbol}
            />
          )}
          <WithdrawLiquiditySubmitButton state={buttonState} />
        </Form>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
