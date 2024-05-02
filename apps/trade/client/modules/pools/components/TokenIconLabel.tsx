import {
  NextImageSrc,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import Image from 'next/image';

interface Props extends WithClassnames {
  tokenIconSize?: number;
  iconSrc?: NextImageSrc;
  symbol?: string;
}

export function TokenIconLabel({
  className,
  tokenIconSize = 28,
  iconSrc,
  symbol,
}: Props) {
  return (
    <div
      className={joinClassNames(
        'text-text-primary flex items-center gap-x-2',
        className,
      )}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          width={tokenIconSize}
          height={tokenIconSize}
          alt={symbol ?? ''}
          className="bg-surface-card ring-stroke rounded-full ring-2"
        />
      )}
      <p>{symbol}</p>
    </div>
  );
}
