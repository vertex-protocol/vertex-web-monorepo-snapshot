import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import {
  LargeNumberInputSelect,
  SelectComponentOption,
  useSelect,
} from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import Image from 'next/image';
import { useMemo } from 'react';
import { CollateralSpotProduct } from '../types';

export interface CollateralSpotProductSelectProps extends WithClassnames {
  availableProducts: CollateralSpotProduct[];
  selectedProduct: CollateralSpotProduct | undefined;
  disabled?: boolean;
  onProductSelected: (product: CollateralSpotProduct) => void;
}

export function CollateralSpotProductSelect({
  className,
  selectedProduct,
  onProductSelected,
  availableProducts,
  disabled,
}: CollateralSpotProductSelectProps) {
  const disableSelect = !availableProducts.length || disabled;

  const options = useMemo(
    () =>
      availableProducts.map((product) => ({
        label: product.symbol,
        id: product.productId.toString(),
        value: product,
      })),
    [availableProducts],
  );

  const { open, onOpenChange, selectOptions, value, onValueChange } = useSelect(
    {
      defaultOpen: false,
      selectedValue: selectedProduct,
      onSelectedValueChange: onProductSelected,
      options,
    },
  );

  const triggerContent = selectedProduct ? (
    <>
      <Image
        src={selectedProduct.icon.asset}
        alt={selectedProduct.symbol}
        className="aspect-square h-auto w-5"
      />
      <span>{selectedProduct.symbol}</span>
    </>
  ) : (
    <span className={joinClassNames('pl-1.5', !open && 'text-accent')}>
      Select Token
    </span>
  );

  return (
    <LargeNumberInputSelect.Root
      open={open}
      value={value}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
      disabled={disableSelect}
    >
      <LargeNumberInputSelect.Trigger
        className={joinClassNames('flex items-center gap-x-2', className)}
        endIcon={<UpDownChevronIcon open={open} />}
        isOpen={open}
        disabled={disableSelect}
      >
        {triggerContent}
      </LargeNumberInputSelect.Trigger>
      <LargeNumberInputSelect.Options
        header={
          <LargeNumberInputSelect.OptionsHeader className="justify-between">
            <span>Choose Asset</span>
            <span>Available</span>
          </LargeNumberInputSelect.OptionsHeader>
        }
        align="end"
      >
        {selectOptions.map(({ label, original, value: val }) => {
          return (
            <Option
              label={label}
              original={original}
              value={val}
              key={label}
              isSelected={value === val}
            />
          );
        })}
      </LargeNumberInputSelect.Options>
    </LargeNumberInputSelect.Root>
  );
}

interface OptionProps extends SelectComponentOption<CollateralSpotProduct> {
  isSelected: boolean | undefined;
}

function Option({ label, original, isSelected, value }: OptionProps) {
  return (
    <LargeNumberInputSelect.Option value={value} isSelected={isSelected}>
      <div className="flex w-full items-center gap-x-2">
        {original.icon.asset && (
          <Image
            src={original.icon.asset}
            alt={label.toString()}
            className="aspect-square h-auto w-5"
          />
        )}
        <span>{label}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="w-max text-sm font-medium">
          {formatNumber(original.displayedAssetAmount, {
            formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
          })}
        </span>
        <span className="text-text-tertiary text-2xs w-max">
          {formatNumber(original.displayedAssetValueUsd, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
        </span>
      </div>
    </LargeNumberInputSelect.Option>
  );
}
