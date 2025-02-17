import { TokenIconMetadata } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, WithRef } from '@vertex-protocol/web-common';
import { CompactInput } from '@vertex-protocol/web-ui';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface ProvideLiquidityInputProps
  extends WithRef<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    WithClassnames {
  error?: ReactNode;
  icon: TokenIconMetadata | undefined;
  symbol: string | undefined;
  estimatedValueUsd: BigDecimal | undefined;
}

export function ProvideLiquidityInput({
  className,
  symbol,
  icon,
  error,
  estimatedValueUsd,
  ...rest
}: ProvideLiquidityInputProps) {
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
      {...rest}
    />
  );
}
