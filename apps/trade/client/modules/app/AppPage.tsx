import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { SizeVariant } from '@vertex-protocol/web-ui';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  description?: ReactNode;
}

function Header({
  title,
  description,
  className,
}: WithClassnames<HeaderProps>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-1', className)}>
      <h1 className="text-text-primary title-text text-xl lg:text-3xl">
        {title}
      </h1>
      {description && (
        <div className="text-text-tertiary text-xs lg:text-sm">
          {description}
        </div>
      )}
    </div>
  );
}

function EarnHeader({ title, description }: HeaderProps) {
  return (
    <div className="flex flex-col gap-y-1 lg:gap-y-2">
      <div className="flex items-center gap-x-2">
        <div className="bg-surface-1 rounded p-1 lg:p-1.5">
          <Image
            src={IMAGES.brandMonochromeIcon}
            className="h-3 w-auto lg:h-4"
            alt=""
            quality={100}
            priority
          />
        </div>
        <span className="text-text-primary text-sm lg:text-base">Earn</span>
      </div>
      <AppPage.Header
        title={title}
        description={description}
        className="max-w-[525px]"
      />
    </div>
  );
}

interface ContentProps extends WithChildren, WithClassnames {
  layoutWidth?: Extract<SizeVariant, 'sm' | 'base'>;
}

function Content({ layoutWidth = 'base', className, children }: ContentProps) {
  const maxWidthClassName = {
    sm: 'max-w-[1100px]',
    base: 'max-w-[1770px]',
  }[layoutWidth];

  return (
    <div
      className={mergeClassNames(
        // `box-content` so we can add padding while keeping our widths aligned with Figma.
        'mx-auto box-content flex flex-col gap-y-4 lg:gap-y-6',
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
        maxWidthClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}

export const AppPage = {
  Header,
  EarnHeader,
  Content,
};
