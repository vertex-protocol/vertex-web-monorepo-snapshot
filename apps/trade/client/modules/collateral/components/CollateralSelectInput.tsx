import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  COMMON_TRANSPARENCY_COLORS,
  CompactInput,
  CompactInputProps,
} from '@vertex-protocol/web-ui';
import {
  AssetSelectProps,
  CollateralAssetSelect,
} from 'client/modules/collateral/components/CollateralAssetSelect';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import React, { ReactNode } from 'react';

interface Props extends CompactInputProps {
  selectProps: AssetSelectProps;
  estimatedValueUsd: BigDecimal | undefined;
  error?: ReactNode;
}

export const CollateralSelectInput = React.forwardRef<
  HTMLInputElement,
  WithClassnames<Props>
>(function CollateralSelectInputBase(
  { className, selectProps, estimatedValueUsd, error, ...rest },
  ref,
) {
  const {
    availableProducts,
    selectedProduct,
    assetAmountTitle,
    disabled: disableSelect,
    optionsClassName,
    onProductSelected,
  } = selectProps;

  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      inputContainerClassName={joinClassNames('pl-0', className)}
      startElement={
        <CollateralAssetSelect
          className={joinClassNames(
            'h-full w-max min-w-24 border-r',
            COMMON_TRANSPARENCY_COLORS.border,
          )}
          disabled={disableSelect}
          availableProducts={availableProducts}
          selectedProduct={selectedProduct}
          assetAmountTitle={assetAmountTitle}
          optionsClassName={optionsClassName}
          onProductSelected={onProductSelected}
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
