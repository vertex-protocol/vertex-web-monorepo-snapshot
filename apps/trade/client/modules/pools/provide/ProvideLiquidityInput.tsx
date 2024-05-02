import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ErrorTooltip } from '@vertex-protocol/web-ui';
import { Input } from 'client/components/Input/Input';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';
import Image from 'next/image';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface ProvideLiquidityInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    WithClassnames {
  error?: ReactNode;
  icon: TokenIconMetadata | undefined;
  symbol: string | undefined;
  estimatedValueUsd: BigDecimal | undefined;
}

export const ProvideLiquidityInput = forwardRef<
  HTMLInputElement,
  ProvideLiquidityInputProps
>(function ProvideLiquidityInput(
  {
    className,
    symbol,
    disabled,
    icon,
    error,
    estimatedValueUsd,
    ...rest
  }: ProvideLiquidityInputProps,
  ref,
) {
  return (
    <ErrorTooltip
      errorContent={error}
      contentWrapperClassName={joinClassNames(
        'bg-surface-2 relative h-10',
        'rounded border border-stroke focus-within:border-accent',
        'divide-overlay-divider/10',
        'flex items-center',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <div
        className={joinClassNames(
          'relative h-full w-24 min-w-fit',
          'pl-2',
          'flex items-center gap-x-2',
        )}
      >
        {icon && (
          <Image src={icon.asset} alt="Asset Icon" height={20} width={20} />
        )}
        <span className="text-text-secondary text-sm">{symbol}</span>
      </div>
      <Input
        ref={ref}
        className={joinClassNames(
          'h-full flex-1 cursor-default border-l bg-transparent px-2 text-sm font-medium transition',
          disabled && 'pointer-events-none',
          error ? 'text-negative' : 'text-text-primary',
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
