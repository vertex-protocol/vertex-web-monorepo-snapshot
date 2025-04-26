import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

interface Props extends WithClassnames {
  /** The size of the icon */
  size: number;
  /** If true, removes saturation and lowers opacity */
  grayscale?: boolean;
}

export function BrandIconLoadingIndicator({
  size,
  grayscale,
  className,
}: Props) {
  return (
    <Image
      src={IMAGES.brandIcon}
      alt="loading indicator"
      width={size}
      priority
      className={joinClassNames(
        'h-auto animate-ping',
        grayscale && 'opacity-20 saturate-0',
        className,
      )}
    />
  );
}
