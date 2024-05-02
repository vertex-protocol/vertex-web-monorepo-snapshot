import { BigDecimal } from '@vertex-protocol/utils';
import {
  InputSummary,
  InputSummaryItemProps,
} from 'client/components/InputSummary';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';

interface Props {
  enableBorrows: boolean;
  selectedProductMaxWithdrawable?: BigDecimal;
  onMaxAmountSelected: () => void;
}

export function WithdrawInputSummary({
  selectedProductMaxWithdrawable,
  enableBorrows,
  onMaxAmountSelected,
}: Props) {
  const {
    formatSpecifier,
    label,
    currentValue,
    definitionTooltipId,
  }: InputSummaryItemProps = useMemo(() => {
    return {
      label: enableBorrows ? 'Max with borrow:' : 'Max withdrawal:',
      currentValue: selectedProductMaxWithdrawable,
      formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
      definitionTooltipId: enableBorrows
        ? 'withdrawMaxWithBorrow'
        : 'withdrawMaxWithdrawal',
    };
  }, [enableBorrows, selectedProductMaxWithdrawable]);

  return (
    <InputSummary.Container>
      <InputSummary.Item
        formatSpecifier={formatSpecifier}
        label={label}
        currentValue={currentValue}
        definitionTooltipId={definitionTooltipId}
        onValueClick={onMaxAmountSelected}
      />
    </InputSummary.Container>
  );
}
