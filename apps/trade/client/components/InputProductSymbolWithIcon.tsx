import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS } from '@vertex-protocol/web-ui';
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
        'h-full w-24 min-w-fit border-r',
        COMMON_TRANSPARENCY_COLORS.border,
      )}
    >
      {content}
    </div>
  );
}
