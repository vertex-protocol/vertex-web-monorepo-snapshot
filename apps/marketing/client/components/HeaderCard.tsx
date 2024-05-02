import { WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import { ReactNode } from 'react';

export function HeaderCard({
  title,
  heading,
  content,
  className,
  headingClassNames,
  contentClassNames,
}: WithClassnames<{
  title: string;
  heading: ReactNode;
  content?: ReactNode;
  headingClassNames?: string;
  contentClassNames?: string;
}>) {
  return (
    <div
      className={classNames(
        'flex flex-col items-start justify-center gap-y-2 p-0',
        className,
      )}
    >
      <div
        className={classNames(
          'bg-headerTitleGradient font-dmSans gradient-text text-xs font-bold uppercase',
          'sm:text-base',
        )}
      >
        {title}
      </div>
      <div
        className={classNames(
          'text-2xl font-bold leading-tight text-white',
          'sm:text-4xl',
          'lg:text-6xl',
          headingClassNames,
        )}
      >
        {heading}
      </div>
      {content && (
        <div
          className={classNames(
            'font-dmSans text-white-700 text-sm leading-4',
            'sm:text-lg sm:leading-5',
            'md:text-xl md:leading-7',
            contentClassNames,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
