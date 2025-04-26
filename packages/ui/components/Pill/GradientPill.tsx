import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { IconComponent } from '../Icons';

interface Props extends WithChildren<WithClassnames> {
  colorVariant: 'alt' | 'info' | 'accent' | 'warning';
  icon?: IconComponent;
}

export function GradientPill({
  children,
  className,
  colorVariant,
  icon: Icon,
}: Props) {
  const gradientBorderStopColorClassName = {
    alt: 'to-accent-alt',
    info: 'to-accent-info',
    accent: 'to-accent',
    warning: 'to-accent-warning',
  }[colorVariant];

  const textColorClassName = {
    alt: 'text-accent-alt',
    info: 'text-accent-info',
    accent: 'text-accent',
    warning: 'text-accent-warning',
  }[colorVariant];

  return (
    <div
      className={joinClassNames(
        'rounded-sm p-px',
        'from-overlay-divider bg-linear-to-r',
        gradientBorderStopColorClassName,
      )}
    >
      <div
        className={mergeClassNames(
          'text-3xs h-max px-2 py-0.5',
          'bg-surface-1 flex items-center gap-x-0.5 rounded-[3px]',
          // Using `2px` less padding on the left when an icon is preset to make the icon and text look more centered
          !!Icon && 'pl-1.5',
          textColorClassName,
          className,
        )}
      >
        {!!Icon && <Icon fill="currentColor" />}
        {children}
      </div>
    </div>
  );
}
