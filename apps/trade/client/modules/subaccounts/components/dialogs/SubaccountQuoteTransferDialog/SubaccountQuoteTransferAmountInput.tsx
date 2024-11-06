import { Token } from '@vertex-protocol/metadata';
import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { CompactInput, CompactInputProps } from '@vertex-protocol/web-ui';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import React, { ReactNode } from 'react';

interface Props extends CompactInputProps {
  primaryQuoteToken: Token;
  estimatedValueUsd: BigDecimal | undefined;
  error?: ReactNode;
}

export const SubaccountQuoteTransferAmountInput = React.forwardRef<
  HTMLInputElement,
  WithClassnames<Props>
>(function SubaccountQuoteAmountInput(
  { primaryQuoteToken, estimatedValueUsd, error, ...rest },
  ref,
) {
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
      ref={ref}
      {...rest}
    />
  );
});
