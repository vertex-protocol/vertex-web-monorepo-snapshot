import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  InputSummaryItem,
  InputSummaryItemProps,
} from 'client/components/InputSummaryItem';
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
      label: enableBorrows ? 'Max with borrow:' : 'Max amount:',
      currentValue: selectedProductMaxWithdrawable,
      formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
      definitionTooltipId: enableBorrows ? 'maxWithBorrow' : 'maxAmount',
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
