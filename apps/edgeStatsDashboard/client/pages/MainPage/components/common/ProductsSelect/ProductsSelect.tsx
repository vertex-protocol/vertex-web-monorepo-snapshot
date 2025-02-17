import { joinClassNames } from '@vertex-protocol/web-common';
import { Select, UpDownChevronIcon, UseSelect } from '@vertex-protocol/web-ui';
import { ProductSelectValue } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import Image from 'next/image';

interface ProductsSelectProps
  extends Omit<UseSelect<ProductSelectValue>, 'selectedOption'> {
  selectedProduct: ProductSelectValue | undefined;
}

export function ProductsSelect({
  selectOptions,
  selectedProduct,
  open,
  onValueChange,
  value,
  onOpenChange,
}: ProductsSelectProps) {
  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        // min-w is used to prevent layout shifts.
        className={joinClassNames(
          'min-w-32',
          'border-stroke border',
          'text-text-primary gap-x-1 font-medium',
        )}
        borderRadiusVariant="lg"
        endIcon={<UpDownChevronIcon open={open} />}
      >
        {selectedProduct && (
          <>
            <Image
              src={selectedProduct.icon.asset}
              alt={selectedProduct.symbol}
              className="size-4"
            />
            {selectedProduct.displayName}
          </>
        )}
      </Select.Trigger>
      <Select.Options
        // max-h to make it scrollable and prevent going off screen
        className="max-h-80 rounded-lg"
      >
        {selectOptions.map(({ value, original }) => {
          return (
            <Select.Option
              className="justify-start gap-x-1.5 font-semibold"
              key={value}
              value={value}
            >
              <Image
                src={original.icon.asset}
                alt={original.symbol}
                className="size-4"
              />

              {original.displayName}
            </Select.Option>
          );
        })}
      </Select.Options>
    </Select.Root>
  );
}
