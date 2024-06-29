import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { CompactInput } from '@vertex-protocol/web-ui';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface WithdrawLiquidityInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    WithClassnames {
  error?: ReactNode;
  estimatedValueUsd: BigDecimal | undefined;
}

export const WithdrawLiquidityInput = forwardRef<
  HTMLInputElement,
  WithdrawLiquidityInputProps
>(function WithdrawLiquidityInput(
  { className, error, estimatedValueUsd, ...rest }: WithdrawLiquidityInputProps,
  ref,
) {
  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      inputContainerClassName={className}
      endElement={
        <EstimatedCurrencyValueItem estimatedValueUsd={estimatedValueUsd} />
      }
      ref={ref}
      {...rest}
    />
  );
});
