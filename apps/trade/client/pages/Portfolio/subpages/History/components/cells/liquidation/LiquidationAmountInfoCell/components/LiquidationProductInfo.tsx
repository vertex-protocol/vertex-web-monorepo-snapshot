import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import Image from 'next/image';

interface LiquidationProductInfoProps extends WithClassnames {
  productType: ProductEngineType;
  productLabel: string;
  iconSrc: NextImageSrc;
  isLong: boolean;
}

export function LiquidationProductInfo({
  className,
  productType,
  productLabel,
  iconSrc,
  isLong,
}: LiquidationProductInfoProps) {
  const sideLabel = (() => {
    switch (productType) {
      case ProductEngineType.PERP:
        return (
          <p
            className={joinClassNames(
              'text-3xs rounded uppercase',
              isLong ? 'text-positive' : 'text-negative',
            )}
          >
            {isLong ? 'long' : 'short'}
          </p>
        );
      case ProductEngineType.SPOT:
        return (
          <p className="text-3xs text-text-tertiary uppercase">
            {isLong ? 'Deposit' : 'Borrow'}
          </p>
        );
    }
  })();

  return (
    <div className={joinClassNames('flex items-center gap-x-2', className)}>
      <Image
        width={28}
        height={28}
        alt={productLabel}
        src={iconSrc ?? ''}
        className="px-0.5"
      />
      <div className="flex flex-col">
        <p className="text-text-primary text-xs font-medium">{productLabel}</p>
        {sideLabel}
      </div>
    </div>
  );
}
