import { Icons } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummary } from 'client/components/InputSummary';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useSubaccountHealthCheckSequencerFee } from 'client/hooks/subaccount/useSubaccountHealthCheckSequencerFee';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpInfoPanel } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanel';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useProvideLiquidityAmountErrorTooltipContent } from './hooks/useProvideLiquidityAmountErrorTooltipContent';
import { useProvideLiquidityForm } from './hooks/useProvideLiquidityForm';
import { ProvideLiquidityInput } from './ProvideLiquidityInput';
import { ProvideLiquiditySubmitButton } from './ProvideLiquiditySubmitButton';
import { ProvideLiquiditySummary } from './ProvideLiquiditySummary';

export function ProvideLiquidityDialog() {
  const {
    form,
    formError,
    metadata: pairMetadata,
    estimatedChangeAmounts,
    currentLpBalance,
    validPercentageAmount,
    currentYield,
    underlyingBaseBalance,
    underlyingQuoteBalance,
    buttonState,
    onSubmit,
    onFractionSelected,
    onMaxSelected,
    validateBaseAmount,
    validateQuoteAmount,
  } = useProvideLiquidityForm();
  const sequencerFee = useSubaccountHealthCheckSequencerFee();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const amountErrorTooltipContent =
    useProvideLiquidityAmountErrorTooltipContent({
      formError,
    });

  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Provide Liquidity</BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
          <LpInfoPanel
            metadata={pairMetadata}
            currentLpBalance={currentLpBalance}
            currentYield={currentYield}
          />
          <div className="flex flex-col items-center gap-y-1.5">
            <div className="flex w-full flex-col">
              <ProvideLiquidityInput
                {...form.register('baseAmount', {
                  validate: validateBaseAmount,
                })}
                icon={pairMetadata?.base?.icon}
                symbol={pairMetadata?.base?.symbol}
                estimatedValueUsd={estimatedChangeAmounts?.baseValueUsd}
                error={amountErrorTooltipContent}
                onFocus={() => {
                  form.setValue('amountSource', 'base');
                }}
              />
              <InputSummary.Container>
                <InputSummary.Item
                  label="Balance:"
                  definitionTooltipId="lpUnderlyingBalance"
                  currentValue={underlyingBaseBalance}
                  onValueClick={onMaxSelected}
                  formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                />
              </InputSummary.Container>
            </div>
            <div className="bg-surface-2 self-center rounded-md p-0.5">
              <Icons.BiPlus className="text-text-tertiary" size={16} />
            </div>
            <div className="flex w-full flex-col">
              <ProvideLiquidityInput
                {...form.register('quoteAmount', {
                  validate: validateQuoteAmount,
                })}
                icon={pairMetadata?.quote?.icon}
                symbol={pairMetadata?.quote?.symbol}
                estimatedValueUsd={estimatedChangeAmounts?.quoteValueUsd}
                error={amountErrorTooltipContent}
                onFocus={() => {
                  form.setValue('amountSource', 'quote');
                }}
              />
              <InputSummary.Container>
                <InputSummary.Item
                  label="Balance:"
                  definitionTooltipId="lpUnderlyingBalance"
                  currentValue={underlyingQuoteBalance}
                  onValueClick={onMaxSelected}
                  formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                />
              </InputSummary.Container>
            </div>
            <FractionAmountButtons
              onFractionSelected={onFractionSelected}
              selectedFraction={validPercentageAmount}
              className="pt-0.5"
            />
          </div>
          <ProvideLiquiditySummary
            lpValueUsd={estimatedChangeAmounts?.lpValueUsd}
            lpAmount={estimatedChangeAmounts?.lpTokens}
            feeAmount={sequencerFee}
            quoteSymbol={primaryQuoteToken.symbol}
          />
          <ProvideLiquiditySubmitButton state={buttonState} />
        </Form>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
