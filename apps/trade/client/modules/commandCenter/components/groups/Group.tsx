import { WithClassnames, mergeClassNames } from '@vertex-protocol/web-common';
import { Command } from 'cmdk';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  heading: string;
  shouldShow: boolean;
  children: ReactNode;
}

export function Group({ heading, shouldShow, className, children }: Props) {
  if (!shouldShow) {
    return null;
  }

  return (
    <Command.Group
      heading={heading}
      className={mergeClassNames(
        'text-text-primary flex flex-col gap-y-2 px-2 py-4 text-xs lg:px-4',
        '[&_[cmdk-group-heading]]:pl-1.5',
        className,
      )}
    >
      {children}
    </Command.Group>
  );
}
