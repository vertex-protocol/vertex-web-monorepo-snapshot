import { VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { CompactInput, CompactInputProps } from '@vertex-protocol/web-ui';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import React, { ReactNode } from 'react';

interface Props extends CompactInputProps {
  estimatedStakeValueUsd: BigDecimal | undefined;
  error: ReactNode;
}

export const StakingDialogInput = React.forwardRef<
  HTMLInputElement,
  WithClassnames<Props>
>(function StakingDialogInput({ error, estimatedStakeValueUsd, ...rest }, ref) {
  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      startElement={
        <InputProductSymbolWithIcon
          productImageSrc={VRTX_TOKEN_INFO.icon.asset}
          symbol={VRTX_TOKEN_INFO.symbol}
        />
      }
      endElement={
        <EstimatedCurrencyValueItem
          estimatedValueUsd={estimatedStakeValueUsd}
        />
      }
      ref={ref}
      {...rest}
    />
  );
});
