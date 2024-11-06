import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { SizeVariant } from '@vertex-protocol/web-ui';
import { BrandIconLoadingIndicator } from 'client/components/BrandIconLoadingWrapper/BrandIconLoadingIndicator';
import { ReactNode } from 'react';

interface Props extends WithChildren {
  /** Class names for the container of the loading icon component */
  indicatorContainerClassName?: string;
  /** If true loading icon component is rendered */
  isLoading: boolean;
  /** Size variant of the icon */
  iconSizeVariant?: Extract<SizeVariant, 'sm' | 'base'>;
  /** If true, removes saturation and lowers opacity */
  grayscale?: boolean;
  /** Optional extra content to render (eg. AppVersion) */
  extraContent?: ReactNode;
}

export function BrandLoadingWrapper({
  iconSizeVariant = 'base',
  isLoading,
  grayscale,
  children,
  indicatorContainerClassName,
  extraContent,
}: Props) {
  const iconSize = {
    sm: 40,
    base: 72,
  }[iconSizeVariant];

  if (isLoading) {
    return (
      <div
        className={joinClassNames(
          'flex items-center justify-center',
          indicatorContainerClassName,
        )}
      >
        <BrandIconLoadingIndicator grayscale={grayscale} size={iconSize} />
        {extraContent}
      </div>
    );
  }

  return children;
}
