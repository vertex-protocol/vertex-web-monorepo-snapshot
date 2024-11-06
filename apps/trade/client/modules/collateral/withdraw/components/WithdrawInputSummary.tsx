import { BigDecimal } from '@vertex-protocol/utils';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { useMemo } from 'react';
import {
  InputSummaryItem,
  InputSummaryItemProps,
} from 'client/components/InputSummaryItem';

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
    <InputSummaryItem
      formatSpecifier={formatSpecifier}
      label={label}
      currentValue={currentValue}
      definitionTooltipId={definitionTooltipId}
      onValueClick={onMaxAmountSelected}
    />
  );
}
