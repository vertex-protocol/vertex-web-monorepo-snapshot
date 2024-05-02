import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import Image, { ImageProps } from 'next/image';

interface Props extends WithChildren, WithClassnames, Omit<ImageProps, 'alt'> {
  alt?: string;
  imgClassName?: string;
}

export function BgWrapper({
  children,
  imgClassName,
  className,
  fill,
  alt = '',
  ...rest
}: Props) {
  return (
    <div
      className={classNames(
        'relative isolate flex h-max w-full flex-col items-center',
        className,
      )}
    >
      <Image
        className={classNames(
          'absolute inset-0 -z-10 h-auto w-full',
          imgClassName,
        )}
        alt={alt}
        fill={fill}
        sizes="(max-width: 875px) 100vw, (max-width: 1200px) 50vw"
        quality={100}
        {...rest}
      />
      {children}
    </div>
  );
}
