import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS, Icons } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { useSubaccountHealthCheckSequencerFee } from 'client/hooks/subaccount/useSubaccountHealthCheckSequencerFee';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpInfoPanel } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanel';
import { ProvideLiquidityInput } from 'client/modules/pools/provide/ProvideLiquidityInput';
import { ProvideLiquiditySubmitButton } from 'client/modules/pools/provide/ProvideLiquiditySubmitButton';
import { ProvideLiquiditySummary } from 'client/modules/pools/provide/ProvideLiquiditySummary';
import { useProvideLiquidityAmountErrorTooltipContent } from 'client/modules/pools/provide/hooks/useProvideLiquidityAmountErrorTooltipContent';
import { useProvideLiquidityForm } from 'client/modules/pools/provide/hooks/useProvideLiquidityForm';

export interface ProvideLiquidityDialogParams {
  productId: number;
}

export function ProvideLiquidityDialog({
  productId,
}: ProvideLiquidityDialogParams) {
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
  } = useProvideLiquidityForm({
    productId,
  });
  const sequencerFee = useSubaccountHealthCheckSequencerFee();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const amountErrorTooltipContent =
    useProvideLiquidityAmountErrorTooltipContent({
      formError,
    });

  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Provide Liquidity
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
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
                <div className="flex flex-col gap-y-1">
                  <ProvideLiquidityInput
                    {...form.register('baseAmount', {
                      validate: validateBaseAmount,
                    })}
                    icon={pairMetadata?.base.icon}
                    symbol={pairMetadata?.base.symbol}
                    estimatedValueUsd={estimatedChangeAmounts?.baseValueUsd}
                    error={amountErrorTooltipContent}
                    onFocus={() => {
                      form.setValue('amountSource', 'base');
                    }}
                  />
                  <InputSummaryItem
                    label="Balance:"
                    definitionTooltipId="lpUnderlyingBalance"
                    currentValue={underlyingBaseBalance}
                    onValueClick={onMaxSelected}
                    formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <ProvideLiquidityInput
                    {...form.register('quoteAmount', {
                      validate: validateQuoteAmount,
                    })}
                    icon={pairMetadata?.quote.icon}
                    symbol={pairMetadata?.quote.symbol}
                    estimatedValueUsd={estimatedChangeAmounts?.quoteValueUsd}
                    error={amountErrorTooltipContent}
                    onFocus={() => {
                      form.setValue('amountSource', 'quote');
                    }}
                  />
                  <InputSummaryItem
                    label="Balance:"
                    definitionTooltipId="lpUnderlyingBalance"
                    currentValue={underlyingQuoteBalance}
                    onValueClick={onMaxSelected}
                    formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                  />
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
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function Linker({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'rounded-l border border-r-0',
        COMMON_TRANSPARENCY_COLORS.border,
        className,
      )}
    >
      <div className="bg-surface-2 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-0.5">
        <Icons.Plus className="text-text-tertiary" size={16} />
      </div>
    </div>
  );
}
