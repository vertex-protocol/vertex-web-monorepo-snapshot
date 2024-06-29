import { joinClassNames } from '@vertex-protocol/web-common';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithRef, ReactNode } from 'react';
import { RxArrowRight, RxExternalLink } from 'react-icons/rx';

interface EdgeTileLinkProps
  extends Omit<ComponentPropsWithRef<typeof Link>, 'as' | 'children'> {
  external?: boolean;
  content: ReactNode;
  contentOnHover?: ReactNode;
  bgImageOnHover?: ImageProps['src'];
  linkIconClassName?: string;
}

const transClassName = 'transition-all duration-300';

const innerBoxClassName = joinClassNames(
  'flex w-full min-w-[86px] h-[86px] items-center justify-center',
  'bg-tile-link rounded-lg',
  transClassName,
);

const btnHoverClassName = joinClassNames(
  'absolute inset-0 w-full h-full',
  'group-hover:opacity-100 group-active:opacity-100 opacity-0',
  transClassName,
);

const contentClassName = joinClassNames(
  'group-hover:opacity-0 group-active:opacity-0',
  transClassName,
);

const contentOnHoverClassName = joinClassNames(
  'absolute inset-0',
  'opacity-0 group-hover:opacity-100 group-active:opacity-100',
  transClassName,
);

const contentWrapperClassName = joinClassNames(
  'relative group-hover:pr-4 group-active:pr-4',
  transClassName,
);

export function EdgeTileLink({
  className,
  content,
  contentOnHover,
  bgImageOnHover,
  external,
  linkIconClassName,
  ...restProps
}: EdgeTileLinkProps) {
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  const linkClassName = joinClassNames(
    'flex relative bg-tile-link-border p-2 rounded-2xl',
    'group shadow-tile-link hover:shadow-tile-link-hover',
    transClassName,
    className,
  );

  const iconClassName = joinClassNames(
    'absolute top-1/2 right-2 opacity-0 -translate-y-1/2',
    'group-hover:right-0 group-hover:opacity-100 group-active:right-0 group-active:opacity-100',
    transClassName,
    linkIconClassName,
  );

  return (
    <Link {...restProps} className={linkClassName} target={target} rel={rel}>
      {bgImageOnHover && (
        <Image
          src={bgImageOnHover}
          alt="preview"
          className={btnHoverClassName}
        />
      )}
      <span className={innerBoxClassName}>
        <span className="z-1 relative">
          <div className={contentWrapperClassName}>
            <span className={contentClassName}>{content}</span>
            <span className={contentOnHoverClassName}>
              {contentOnHover ?? content}
            </span>
          </div>
          {external ? (
            <RxExternalLink className={iconClassName} size={13} />
          ) : (
            <RxArrowRight className={iconClassName} size={13} />
          )}
        </span>
      </span>
    </Link>
  );
}
