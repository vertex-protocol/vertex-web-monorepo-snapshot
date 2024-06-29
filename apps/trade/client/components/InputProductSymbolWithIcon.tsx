import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import Image from 'next/image';

interface Props {
  productImageSrc: NextImageSrc | string | undefined;
  symbol: string | undefined;
}

export function InputProductSymbolWithIcon({ productImageSrc, symbol }: Props) {
  const content = (() => {
    if (!productImageSrc || !symbol) return null;
    return (
      <>
        <Image src={productImageSrc} alt={symbol} className="size-5" />
        <span className="text-text-primary text-sm">{symbol}</span>
      </>
    );
  })();

  return (
    <div
      className={joinClassNames(
        'flex items-center gap-x-2',
        'border-overlay-divider/10 border-r',
        'h-full w-24 min-w-fit',
      )}
    >
      {content}
    </div>
  );
}
