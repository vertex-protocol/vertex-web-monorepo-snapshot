import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { ErrorTooltip } from '@vertex-protocol/web-ui';
import { Input, InputProps } from 'client/components/Input/Input';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import React, { ReactNode } from 'react';
import {
  AssetSelectProps,
  CollateralAssetSelect,
} from './CollateralAssetSelect';

interface Props extends InputProps {
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
    ...inputProps
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
    <ErrorTooltip
      errorContent={error}
      contentWrapperClassName={joinClassNames(
        'bg-surface-2 relative h-10',
        'rounded border',
        'divide-overlay-divider/10',
        'flex items-center',
        !!error
          ? 'border-negative'
          : 'focus-within:border-accent border-stroke',
        className,
      )}
    >
      <CollateralAssetSelect
        className="h-full w-24 min-w-fit"
        disabled={disabled}
        availableProducts={availableProducts}
        selectedProduct={selectedProduct}
        assetAmountTitle={assetAmountTitle}
        optionsClassName={optionsClassName}
        onProductSelected={onProductSelected}
      />
      <Input
        placeholder="0.00"
        type="number"
        min={0}
        {...inputProps}
        className={joinClassNames(
          'text-text-primary h-full flex-1',
          'bg-transparent px-2 text-sm font-medium',
          'border-y-none border-l transition',
          'placeholder:text-disabled placeholder:font-medium',
          !!error ? 'text-negative' : 'text-text-primary',
          inputClassName,
        )}
        ref={ref}
      />
      <EstimatedCurrencyValueItem
        className="mr-2 text-xs"
        estimatedValueUsd={estimatedValueUsd}
      />
    </ErrorTooltip>
  );
});
