import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { CompactInput, CompactInputProps } from '@vertex-protocol/web-ui';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import React, { ReactNode } from 'react';
import {
  AssetSelectProps,
  CollateralAssetSelect,
} from './CollateralAssetSelect';

interface Props extends CompactInputProps {
  inputClassName?: string;
  dropdownProps: AssetSelectProps;
  estimatedValueUsd: BigDecimal | undefined;
  error?: ReactNode;
}

export const CollateralSelectInput = React.forwardRef<
  HTMLInputElement,
  WithClassnames<Props>
>(function CollateralSelectInputBase(
  {
    className,
    inputClassName,
    dropdownProps,
    estimatedValueUsd,
    error,
    ...rest
  },
  ref,
) {
  const {
    availableProducts,
    selectedProduct,
    assetAmountTitle,
    disabled,
    optionsClassName,
    onProductSelected,
  } = dropdownProps;

  return (
    <CompactInput
      type="number"
      min={0}
      errorTooltipContent={error}
      disabled={disabled}
      inputContainerClassName={joinClassNames('pl-0', className)}
      startElement={
        <CollateralAssetSelect
          className="border-overlay-divider/10 h-full w-24 min-w-24 border-r"
          disabled={disabled}
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
