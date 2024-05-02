import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ErrorTooltip } from '@vertex-protocol/web-ui';
import { Input } from 'client/components/Input/Input';
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
  {
    className,
    error,
    disabled,
    estimatedValueUsd,
    ...rest
  }: WithdrawLiquidityInputProps,
  ref,
) {
  return (
    <ErrorTooltip
      errorContent={error}
      contentWrapperClassName={joinClassNames(
        'bg-surface-2 relative h-10 transition',
        'border-stroke focus-within:border-accent rounded border',
        'flex items-center',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <Input
        ref={ref}
        disabled={disabled}
        className={joinClassNames(
          'h-full flex-1 cursor-default border-none bg-transparent px-2 text-sm font-medium transition',
          !!error ? 'text-negative' : 'text-text-primary',
        )}
        placeholder="0.00"
        type="number"
        min={0}
        {...rest}
      />
      <EstimatedCurrencyValueItem
        className="mr-2 text-xs"
        estimatedValueUsd={estimatedValueUsd}
      />
    </ErrorTooltip>
  );
});
