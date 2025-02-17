import { BigDecimal } from '@vertex-protocol/client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';

interface Props {
  onMaxAmountClicked(): void;
  maxWithdrawable: BigDecimal | undefined;
  isAddMargin: boolean;
  enableBorrows: boolean;
  primaryQuoteSymbol: string;
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
      <ValueWithLabel.Horizontal
        label="Gas Fee:"
        tooltip={{ id: 'gasFee' }}
        value={SUBACCOUNT_QUOTE_TRANSFER_FEE}
        valueEndElement={primaryQuoteSymbol}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        valueClassName="text-text-secondary"
        sizeVariant="xs"
        fitWidth
      />
    </div>
  );
}
