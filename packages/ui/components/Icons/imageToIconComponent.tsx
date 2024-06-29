import { mergeClassNames } from '@vertex-protocol/web-common';
import Image from 'next/image';
import { ComponentProps } from 'react';
import { IconType } from 'react-icons';
import { IconBaseProps } from './types';

/**
 * A utility function to convert an image to an icon component. This is useful for having custom icons.
 * If used within a react component, the result of this should be wrapped in a `useMemo`
 *
 * @param className
 * @param imgProps
 */
export function imageToIconComponent({
  className,
  height,
  width,
  alt,
  ...imgProps
}: ComponentProps<typeof Image>): IconType {
  return function ImageIcon({
    className: classnameOverrides,
    size,
  }: IconBaseProps) {
    const safeSize = isFinite(Number(size)) ? Number(size) : undefined;

    return (
      <Image
        className={mergeClassNames(className, classnameOverrides)}
        width={safeSize ?? width}
        height={safeSize ?? height}
        alt={alt}
        {...imgProps}
      />
    );
  };
}
