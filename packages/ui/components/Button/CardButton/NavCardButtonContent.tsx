import { mergeClassNames } from '@vertex-protocol/web-common';
import { NavCardBaseProps } from './types';

type Props = Pick<
  NavCardBaseProps,
  'className' | 'description' | 'title' | 'icon' | 'iconClassName'
> & {
  descriptionClassName?: string;
  titleClassName?: string;
};

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
            'text-text-tertiary text-2xs leading-snug whitespace-normal',
            descriptionClassName,
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
