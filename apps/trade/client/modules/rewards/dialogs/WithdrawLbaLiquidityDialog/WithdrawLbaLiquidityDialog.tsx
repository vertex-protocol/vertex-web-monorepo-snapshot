import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { WithdrawLiquidityInput } from 'client/modules/pools/withdraw/WithdrawLiquidityInput';
import { WithdrawLiquiditySummary } from 'client/modules/pools/withdraw/WithdrawLiquiditySummary';
import { WithdrawLbaLiquidityDismissible } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/components/WithdrawLbaLiquidityDismissible';
import { WithdrawLbaLiquidityInfoPanel } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/components/WithdrawLbaLiquidityInfoPanel';
import { WithdrawLbaLiquiditySubmitButton } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/components/WithdrawLbaLiquiditySubmitButton';
import { useWithdrawLbaLiquidityAmountErrorTooltipContent } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/hooks/useWithdrawLbaLiquidityAmountErrorTooltipContent';
import { useWithdrawLbaLiquidityForm } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/hooks/useWithdrawLbaLiquidityForm';

export function WithdrawLbaLiquidityDialog() {
  const {
    form,
    formError,
    validPercentageAmount,
    buttonState,
    onSubmit,
    validateAmount,
    onFractionSelected,
    accountState,
    estimatedReceiveAmounts,
    pairMetadata,
    priceIncrement,
  } = useWithdrawLbaLiquidityForm();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { hide } = useDialog();
  const amountErrorTooltipContent =
    useWithdrawLbaLiquidityAmountErrorTooltipContent({ formError });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Withdraw Liquidity
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <WithdrawLbaLiquidityDismissible />
          <WithdrawLbaLiquidityInfoPanel
            metadata={pairMetadata}
            totalLiquidityUsd={accountState?.totalLiquidityUsd}
            unlockedLiquidityUsd={accountState?.unlockedLiquidityUsd}
            unlockedLpTokens={accountState?.unlockedLpTokens}
          />
          <div className="flex flex-col gap-y-2.5">
            <div className="text-text-primary text-xs">Withdraw LP Tokens</div>
            <WithdrawLiquidityInput
              {...form.register('amount', {
                validate: validateAmount,
              })}
              error={amountErrorTooltipContent}
              estimatedValueUsd={estimatedReceiveAmounts?.valueUsd}
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
          <div className="flex flex-col gap-y-4">
            {estimatedReceiveAmounts && (
              <WithdrawLiquiditySummary
                metadata={pairMetadata}
                priceIncrement={priceIncrement}
                estimatedBaseAmount={estimatedReceiveAmounts?.vrtx}
                estimatedQuoteAmount={estimatedReceiveAmounts?.usdc}
                // These aren't shown in the UI
                estimatedBaseValueUsd={undefined}
                estimatedQuoteValueUsd={undefined}
                baseOraclePrice={estimatedReceiveAmounts.conversionRate}
                feeAmount={null}
                quoteSymbol={primaryQuoteToken.symbol}
              />
            )}
            <WithdrawLbaLiquiditySubmitButton state={buttonState} />
          </div>
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
