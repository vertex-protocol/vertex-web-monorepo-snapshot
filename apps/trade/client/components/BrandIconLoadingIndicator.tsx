import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

interface Props extends WithClassnames {
  size: number;
}

export function BrandIconLoadingIndicator({ size, className }: Props) {
  return (
    <Image
      src={IMAGES.brandIcon}
      alt="loading indicator"
      width={size}
      priority
      className={joinClassNames('h-auto animate-ping', className)}
    />
  );
}
