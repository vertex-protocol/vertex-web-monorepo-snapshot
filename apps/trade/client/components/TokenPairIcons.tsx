import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import Image, { ImageProps } from 'next/image';

type IconConfig = Omit<ImageProps, 'width' | 'height' | 'className'>;

interface Props extends WithClassnames {
  first: IconConfig;
  second: IconConfig;
  // Size can either be configured via the iconClassName or via the size prop
  size?: number;
  iconClassName?: string;
}

export function TokenPairIcons({
  className,
  first,
  second,
  size,
  iconClassName,
}: Props) {
  return (
    // Negative right margin to counteract the relative positioning of the second icon
    <div className={joinClassNames('z-0 -mr-2 flex', className)}>
      <TokenIcon
        alt={first.alt}
        size={size}
        src={first.src}
        className={joinClassNames('z-10', iconClassName)}
      />
      <TokenIcon
        alt={second.alt}
        size={size}
        src={second.src}
        className={joinClassNames('relative -left-1/5', iconClassName)}
      />
    </div>
  );
}

interface TokenIconProps extends WithClassnames<IconConfig> {
  size?: number;
}

function TokenIcon({ className, alt, size, src, ...rest }: TokenIconProps) {
  return (
    <Image
      className={joinClassNames(
        'shadow-elevation-card rounded-full',
        className,
      )}
      alt={alt}
      height={size}
      width={size}
      src={src}
      {...rest}
    />
  );
}
