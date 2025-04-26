import { BigDecimal } from '@vertex-protocol/utils';
import {
  joinClassNames,
  WithClassnames,
  WithRef,
} from '@vertex-protocol/web-common';
import { CompactInput, CompactInputProps } from '@vertex-protocol/web-ui';
import {
  AssetSelectProps,
  CollateralAssetSelect,
} from 'client/modules/collateral/components/CollateralAssetSelect';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { ReactNode } from 'react';

interface Props
  extends WithClassnames<WithRef<CompactInputProps, HTMLInputElement>> {
  selectProps: AssetSelectProps;
  estimatedValueUsd: BigDecimal | undefined;
  error?: ReactNode;
}

export function CollateralSelectInput({
  className,
  selectProps,
  estimatedValueUsd,
  error,
  ...rest
}: Props) {
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
          className="border-overlay-divider h-full w-max min-w-24 border-r"
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
      {...rest}
    />
  );
}
