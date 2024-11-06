import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { IconComponent } from '../../Icons';

interface Props extends WithClassnames {
  title: ReactNode;
  description?: ReactNode;
  icon?: IconComponent;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function NavCardButtonContent({
  icon: Icon,
  title,
  description,
  titleClassName,
  descriptionClassName,
  iconClassName,
  className,
}: Props) {
  return (
    <div className={mergeClassNames('flex flex-col text-left', className)}>
      <div
        className={mergeClassNames(
          'text-text-primary flex items-center gap-x-1.5 text-sm',
          titleClassName,
        )}
      >
        {Icon && (
          <Icon className={mergeClassNames('h-4 w-auto', iconClassName)} />
        )}
        {title}
      </div>
      {description && (
        <div
          className={mergeClassNames(
            'text-text-tertiary text-2xs whitespace-normal leading-snug',
            descriptionClassName,
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
