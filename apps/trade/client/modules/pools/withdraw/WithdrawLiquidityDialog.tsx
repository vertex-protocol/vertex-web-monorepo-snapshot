import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { useSubaccountHealthCheckSequencerFee } from 'client/hooks/subaccount/useSubaccountHealthCheckSequencerFee';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpInfoPanel } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanel';
import { useWithdrawLiquidityAmountErrorTooltipContent } from 'client/modules/pools/withdraw/hooks/useWithdrawLiquidityAmountErrorTooltipContent';
import { useWithdrawLiquidityForm } from 'client/modules/pools/withdraw/hooks/useWithdrawLiquidityForm';
import { WithdrawLiquidityInput } from 'client/modules/pools/withdraw/WithdrawLiquidityInput';
import { WithdrawLiquiditySubmitButton } from 'client/modules/pools/withdraw/WithdrawLiquiditySubmitButton';
import { WithdrawLiquiditySummary } from 'client/modules/pools/withdraw/WithdrawLiquiditySummary';

export interface WithdrawLiquidityDialogParams {
  productId: number;
}

export function WithdrawLiquidityDialog({
  productId,
}: WithdrawLiquidityDialogParams) {
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
  } = useWithdrawLiquidityForm({
    productId,
  });
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { hide } = useDialog();
  const sequencerFee = useSubaccountHealthCheckSequencerFee();

  const amountTooltipError = useWithdrawLiquidityAmountErrorTooltipContent({
    formError,
  });

  const hasRequiredData = pairMetadata && currentLpBalance;

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Withdraw Liquidity
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
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
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
