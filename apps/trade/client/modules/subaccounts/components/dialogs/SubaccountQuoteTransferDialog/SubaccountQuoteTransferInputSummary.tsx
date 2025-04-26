import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';

interface Props {
  decimalAdjustedMaxWithdrawableWithFee: BigDecimal | undefined;
  enableBorrows: boolean;
  onFractionSelected: (fraction: number) => void;
  symbol: string;
}

export function SubaccountQuoteTransferInputSummary({
  decimalAdjustedMaxWithdrawableWithFee,
  enableBorrows,
  onFractionSelected,
  symbol,
}: Props) {
  const maxWithdrawableLabel = enableBorrows
    ? 'Max with borrow:'
    : 'Max amount:';

  const maxWithdrawableDefinitionTooltipId = enableBorrows
    ? 'maxWithBorrow'
    : 'maxAmount';

  return (
    <div className="flex flex-col gap-y-0.5">
      <InputSummaryItem
        label={maxWithdrawableLabel}
        currentValue={decimalAdjustedMaxWithdrawableWithFee}
        formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        definitionTooltipId={maxWithdrawableDefinitionTooltipId}
        onValueClick={() => onFractionSelected(1)}
      />
      <InputSummaryItem
        label="Gas Fee:"
        formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        currentValue={SEQUENCER_FEE_AMOUNT_USDC}
        valueEndElement={symbol}
        definitionTooltipId="gasFee"
      />
    </div>
  );
}
