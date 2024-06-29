import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
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
import { ProvideLiquidityInput } from './ProvideLiquidityInput';
import { ProvideLiquiditySubmitButton } from './ProvideLiquiditySubmitButton';
import { ProvideLiquiditySummary } from './ProvideLiquiditySummary';
import { useProvideLiquidityAmountErrorTooltipContent } from './hooks/useProvideLiquidityAmountErrorTooltipContent';
import { useProvideLiquidityForm } from './hooks/useProvideLiquidityForm';

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
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-0.5">
              <Linker
                // 18px from top to properly align with the 2 input components
                className="relative top-[18px] h-20 w-4"
              />
              <div className="flex flex-1 flex-col gap-y-1.5">
                <div>
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
                <div>
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
              </div>
            </div>
            <FractionAmountButtons
              onFractionSelected={onFractionSelected}
              selectedFraction={validPercentageAmount}
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

function Linker({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'border-overlay-divider/10 rounded-l border border-r-0',
        className,
      )}
    >
      <div className="bg-surface-2 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-0.5">
        <Icons.BiPlus className="text-text-tertiary" size={16} />
      </div>
    </div>
  );
}
