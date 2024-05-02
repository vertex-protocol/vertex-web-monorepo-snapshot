import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

function Container({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames(
        'bg-surface-1 flex flex-col gap-y-5 rounded p-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Description({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div className={joinClassNames('text-text-secondary text-xs', className)}>
      {children}
    </div>
  );
}

interface TitleProps extends WithClassnames {
  title: string;
  icon: ReactNode;
}

function Title({ className, title, icon }: TitleProps) {
  return (
    <div
      className={joinClassNames(
        'text-text-primary flex items-center gap-x-2 text-sm',
        className,
      )}
    >
      <div className="bg-surface-2 flex items-center rounded p-1">{icon}</div>
      {title}
    </div>
  );
}

export const CollateralHelpCard = {
  Container,
  Description,
  Title,
};
