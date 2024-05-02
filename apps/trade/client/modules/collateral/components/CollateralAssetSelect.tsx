import {
  joinClassNames,
  mergeClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import Image from 'next/image';
import { useMemo } from 'react';
import { CollateralSpotProduct } from '../types';

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

  const {
    selectOptions,
    open,
    onValueChange,
    value,
    defaultOpen,
    onOpenChange,
  } = useSelect({
    defaultOpen: false,
    selectedValue: selectedProduct,
    onSelectedValueChange: (product) => onProductSelected(product.productId),
    options,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disabled={disableSelect}
    >
      <Select.Trigger
        className={joinClassNames(
          'flex justify-between bg-transparent font-medium hover:bg-transparent',
          className,
        )}
        disabled={disableSelect}
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
          'bg-surface-1 flex flex-col px-2 pb-0.5',
          optionsClassName,
        )}
        header={<AssetSelectHeader assetAmountTitle={assetAmountTitle} />}
        viewportClassName="flex max-h-44 flex-col gap-y-1 py-1.5"
      >
        {selectOptions.map(({ value: optionValue, original: product }) => {
          const isSelected = value === optionValue;

          return (
            <AssetSelectOption
              key={optionValue}
              value={optionValue}
              product={product}
              isSelected={isSelected}
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
  isSelected,
}: {
  value: string;
  product?: CollateralSpotProduct;
  isSelected: boolean;
}) {
  return (
    <Select.Option
      value={value}
      className={joinClassNames(
        'flex w-full items-center justify-between px-3 py-1',
        isSelected && 'bg-surface-3 hover:bg-surface-3',
      )}
    >
      <div className="flex w-full items-center gap-x-2">
        <Image
          src={product?.icon.asset ?? ''}
          alt="Asset Icon"
          height={20}
          width={20}
          className="inline"
        />
        <p>{product?.symbol}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="w-max font-medium">
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
      <p className="text-text-primary">{selectedProduct?.symbol}</p>
    </div>
  );
}
