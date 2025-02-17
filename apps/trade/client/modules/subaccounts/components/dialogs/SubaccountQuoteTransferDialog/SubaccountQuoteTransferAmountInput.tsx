import { Token } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, WithRef } from '@vertex-protocol/web-common';
import { CompactInput, CompactInputProps } from '@vertex-protocol/web-ui';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { ReactNode } from 'react';

interface Props
  extends WithClassnames<WithRef<CompactInputProps, HTMLInputElement>> {
  primaryQuoteToken: Token;
  estimatedValueUsd: BigDecimal | undefined;
  error?: ReactNode;
}

export function SubaccountQuoteTransferAmountInput({
  primaryQuoteToken,
  estimatedValueUsd,
  error,
  ...rest
}: Props) {
  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      startElement={
        <InputProductSymbolWithIcon
          symbol={primaryQuoteToken.symbol}
          productImageSrc={primaryQuoteToken.icon.asset}
        />
      }
      endElement={
        <EstimatedCurrencyValueItem estimatedValueUsd={estimatedValueUsd} />
      }
      {...rest}
    />
  );
}
