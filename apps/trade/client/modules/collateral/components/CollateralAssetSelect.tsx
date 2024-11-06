import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  joinClassNames,
  mergeClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { CollateralSpotProduct } from 'client/modules/collateral/types';
import Image from 'next/image';
import { useMemo } from 'react';

export interface AssetSelectProps extends WithClassnames {
  availableProducts: CollateralSpotProduct[];
  selectedProduct?: CollateralSpotProduct;
  assetAmountTitle?: string;
  disabled?: boolean;
  optionsClassName?: string;
  onProductSelected: (productId: number) => void;
}

export function CollateralAssetSelect({
  className,
  optionsClassName,
  selectedProduct,
  availableProducts,
  assetAmountTitle,
  disabled,
  onProductSelected,
}: AssetSelectProps) {
  const disableSelect = !availableProducts.length || disabled;

  const options = useMemo(
    () =>
      availableProducts.map((product) => ({
        label: product.symbol,
        id: product.symbol,
        value: product,
      })),
    [availableProducts],
  );

  const { selectOptions, open, onValueChange, value, onOpenChange } = useSelect(
    {
      selectedValue: selectedProduct,
      onSelectedValueChange: (product) => onProductSelected(product.productId),
      options,
    },
  );

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
      disabled={disableSelect}
    >
      <Select.Trigger
        className={joinClassNames(
          'flex rounded-r-none bg-transparent',
          className,
        )}
        disabled={disableSelect}
        stateClassNameOverrides="before:rounded-r-none"
        endIcon={
          <UpDownChevronIcon
            open={open}
            className="text-text-tertiary"
            size={14}
          />
        }
      >
        <SelectedAsset selectedProduct={selectedProduct} />
      </Select.Trigger>
      <Select.Options
        className={mergeClassNames(
          // Non-standard width set to match the width of entire input container when possible,
          // custom breakpoint used for smaller mobile devices as sm: is too big
          'w-[350px] [@media(max-width:400px)]:w-[315px]',
          'flex flex-col px-2 pb-0.5',
          optionsClassName,
        )}
        header={<AssetSelectHeader assetAmountTitle={assetAmountTitle} />}
        viewportClassName="flex max-h-44 flex-col gap-y-1 py-1.5"
      >
        {selectOptions.map(({ value: optionValue, original: product }) => {
          return (
            <AssetSelectOption
              key={optionValue}
              value={optionValue}
              product={product}
            />
          );
        })}
      </Select.Options>
    </Select.Root>
  );
}

function AssetSelectHeader({
  assetAmountTitle,
}: {
  assetAmountTitle?: string;
}) {
  return (
    <div className="text-text-tertiary flex w-full items-center justify-between px-2 pb-1 pt-2 text-xs">
      <span>Choose Asset</span>
      <span className="empty:hidden">{assetAmountTitle}</span>
    </div>
  );
}

function AssetSelectOption({
  product,
  value,
}: {
  value: string;
  product: CollateralSpotProduct;
}) {
  return (
    <Select.Option
      value={value}
      className="flex items-center justify-between px-3 py-1"
      withSelectedCheckmark={false}
    >
      <div className="flex w-full items-center gap-x-2">
        <Image
          src={product.icon.asset}
          alt="Asset Icon"
          height={20}
          width={20}
          className="inline"
        />
        <span>{product.symbol}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="w-max">
          {formatNumber(product?.displayedAssetAmount, {
            formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
          })}
        </span>
        <span className="text-text-tertiary text-2xs w-max">
          {formatNumber(product?.displayedAssetValueUsd, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
        </span>
      </div>
    </Select.Option>
  );
}

function SelectedAsset({
  selectedProduct,
}: {
  selectedProduct?: CollateralSpotProduct;
}) {
  if (!selectedProduct) {
    return <p className="text-text-tertiary px-2">Select</p>;
  }

  return (
    <div className="flex items-center gap-x-1.5">
      <Image
        src={selectedProduct?.icon.asset ?? ''}
        alt="Asset Icon"
        height={18}
        width={18}
      />
      <span className="text-text-primary">{selectedProduct?.symbol}</span>
    </div>
  );
}
