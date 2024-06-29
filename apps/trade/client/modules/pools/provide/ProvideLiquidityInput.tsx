import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { CompactInput } from '@vertex-protocol/web-ui';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';
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
    icon,
    error,
    estimatedValueUsd,
    ...rest
  }: ProvideLiquidityInputProps,
  ref,
) {
  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      inputContainerClassName={className}
      startElement={
        <InputProductSymbolWithIcon
          productImageSrc={icon?.asset}
          symbol={symbol}
        />
      }
      endElement={
        <EstimatedCurrencyValueItem estimatedValueUsd={estimatedValueUsd} />
      }
      ref={ref}
      {...rest}
    />
  );
});
