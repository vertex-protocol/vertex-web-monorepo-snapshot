import {
  mergeClassNames,
  NextImageSrc,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { SpinnerContainer } from 'client/components/SpinnerContainer';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props extends WithChildren<WithClassnames> {
  title: ReactNode;
  subtitle?: ReactNode;
  bgImage?: NextImageSrc;
  /** This is used to manage the container's layout `title` & `subtitle` */
  titleContentClassName?: string;
  contentClassName?: string;
  isLoading: boolean;
}

export function MarketsCardContent({
  className,
  children,
  title,
  subtitle,
  bgImage,
  titleContentClassName,
  contentClassName,
  isLoading,
}: Props) {
  return (
    <div
      className={mergeClassNames(
        'flex h-full flex-col sm:gap-y-2',
        'p-4 text-sm',
        bgImage && 'relative',
        className,
      )}
    >
      {bgImage && (
        <Image src={bgImage} alt="" fill quality={100} className="-z-10" />
      )}
      <h3
        className={mergeClassNames(
          'text-text-primary flex flex-col gap-x-2 gap-y-px text-base',
          'sm:flex-row sm:items-baseline',
          titleContentClassName,
        )}
      >
        {title}
        <span className="text-text-tertiary text-xs empty:hidden">
          {subtitle}
        </span>
      </h3>
      <div className={mergeClassNames('flex-1 py-4', contentClassName)}>
        {isLoading ? <SpinnerContainer className="py-12" /> : children}
      </div>
    </div>
  );
}
