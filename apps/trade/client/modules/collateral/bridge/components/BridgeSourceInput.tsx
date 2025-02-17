import { BigDecimal } from '@vertex-protocol/client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { CompactInput } from '@vertex-protocol/web-ui';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { SourceChainSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/SourceChainSelect';
import { SourceTokenSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/SourceTokenSelect';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import {
  BridgeChainSelectValue,
  BridgeTokenSelectValue,
} from 'client/modules/collateral/bridge/types';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  selectedSourceChain: BridgeChainSelectValue | undefined;
  allSourceChains: BridgeChainSelectValue[];
  selectedSourceToken: BridgeTokenSelectValue | undefined;
  allSourceTokens: BridgeTokenSelectValue[];
  sourceTokenBalance: BigDecimal | undefined;
  estimatedSourceValueUsd: BigDecimal | undefined;
  amountErrorTooltipContent: string | null;
  validPercentageAmount: number | undefined;
  validateAmount: (value: string) => string | undefined;
  onFractionSelected: (fraction: number) => void;
  onMaxAmountSelected: () => void;
}

export function BridgeSourceInput({
  allSourceChains,
  allSourceTokens,
  estimatedSourceValueUsd,
  form,
  amountErrorTooltipContent,
  onFractionSelected,
  validPercentageAmount,
  validateAmount,
  sourceTokenBalance,
  selectedSourceChain,
  selectedSourceToken,
  onMaxAmountSelected,
}: Props) {
  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-text-primary text-base">From</span>
      <div
        // Using grid here to align the select viewport for both source select components
        className="grid grid-cols-2 gap-x-2"
      >
        <SourceChainSelect
          allSourceChains={allSourceChains}
          form={form}
          selectedSourceChain={selectedSourceChain}
        />
        <SourceTokenSelect
          form={form}
          selectedToken={selectedSourceToken}
          allTokens={allSourceTokens}
          disabled={allSourceTokens.length === 0 || !selectedSourceChain}
        />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <CompactInput
          errorTooltipContent={amountErrorTooltipContent}
          {...form.register('amount', {
            validate: validateAmount,
          })}
          endElement={
            <EstimatedCurrencyValueItem
              estimatedValueUsd={estimatedSourceValueUsd}
            />
          }
          disabled={!selectedSourceToken}
        />
        <InputSummaryItem
          label="Available:"
          currentValue={sourceTokenBalance}
          formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
          onValueClick={onMaxAmountSelected}
        />
        <FractionAmountButtons
          onFractionSelected={onFractionSelected}
          selectedFraction={validPercentageAmount}
          disabled={!selectedSourceToken}
        />
      </div>
    </div>
  );
}
