import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  title: ReactNode;
  description: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function NavCardButtonContent({
  title,
  description,
  titleClassName,
  descriptionClassName,
  className,
}: Props) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col gap-y-1.5 text-left',
        className,
      )}
    >
      <div
        className={mergeClassNames(
          'text-text-primary text-sm font-medium',
          titleClassName,
        )}
      >
        {title}
      </div>
      <div
        className={mergeClassNames(
          'text-text-tertiary whitespace-normal text-xs leading-snug',
          descriptionClassName,
        )}
      >
        {description}
      </div>
    </div>
  );
}
