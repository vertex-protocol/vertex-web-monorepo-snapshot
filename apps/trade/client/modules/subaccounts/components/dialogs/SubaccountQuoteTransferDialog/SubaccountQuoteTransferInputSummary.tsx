import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';

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
      <ValueWithLabel.Horizontal
        label="Gas Fee:"
        tooltip={{ id: 'gasFee' }}
        value={SUBACCOUNT_QUOTE_TRANSFER_FEE}
        valueEndElement={symbol}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        valueClassName="text-text-secondary"
        sizeVariant="xs"
        fitWidth
      />
    </div>
  );
}
