import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';

interface Props {
  maxWithdrawable: BigDecimal | undefined;
  isAddMargin: boolean;
  enableBorrows: boolean;
  primaryQuoteSymbol: string;

  onMaxAmountClicked(): void;
}

export function IsolatedAdjustMarginInputsSummary({
  isAddMargin,
  maxWithdrawable,
  onMaxAmountClicked,
  enableBorrows,
  primaryQuoteSymbol,
}: Props) {
  const isAddWithBorrows = enableBorrows && isAddMargin;

  const maxWithdrawableLabel = isAddWithBorrows
    ? 'Max with borrow:'
    : 'Max amount:';

  const maxWithdrawableDefinitionTooltipId = isAddWithBorrows
    ? 'maxWithBorrow'
    : 'maxAmount';

  return (
    <div className="flex flex-col gap-y-0.5">
      <InputSummaryItem
        label={maxWithdrawableLabel}
        currentValue={maxWithdrawable}
        formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        definitionTooltipId={maxWithdrawableDefinitionTooltipId}
        onValueClick={onMaxAmountClicked}
      />
      <InputSummaryItem
        label="Gas Fee:"
        formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        currentValue={SEQUENCER_FEE_AMOUNT_USDC}
        valueEndElement={primaryQuoteSymbol}
        definitionTooltipId="gasFee"
      />
    </div>
  );
}
