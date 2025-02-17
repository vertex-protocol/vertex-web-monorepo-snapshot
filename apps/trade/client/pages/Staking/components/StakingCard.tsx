import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface Props extends WithChildren<WithClassnames> {
  titleContent: ReactNode;
  contentClassName?: string;
}

export function StakingCard({
  titleContent,
  children,
  className,
  contentClassName,
}: Props) {
  return (
    <Card className={joinClassNames('flex flex-col gap-y-4 p-4', className)}>
      <h3 className="text-text-primary">{titleContent}</h3>
      <div
        className={mergeClassNames(
          'flex flex-1 flex-col gap-4',
          contentClassName,
        )}
      >
        {children}
      </div>
    </Card>
  );
}
