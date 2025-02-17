import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, WithRef } from '@vertex-protocol/web-common';
import { CompactInput } from '@vertex-protocol/web-ui';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface WithdrawLiquidityInputProps
  extends WithRef<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    WithClassnames {
  error?: ReactNode;
  estimatedValueUsd: BigDecimal | undefined;
}

export function WithdrawLiquidityInput({
  className,
  error,
  estimatedValueUsd,
  ...rest
}: WithdrawLiquidityInputProps) {
  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      inputContainerClassName={className}
      endElement={
        <EstimatedCurrencyValueItem estimatedValueUsd={estimatedValueUsd} />
      }
      {...rest}
    />
  );
}
