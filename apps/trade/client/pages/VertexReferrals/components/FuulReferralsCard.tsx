import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface ReferralsCardProps extends WithChildren, WithClassnames {
  title: string;
  titleEndElement?: ReactNode;
}

export function FuulReferralsCard({
  children,
  title,
  titleEndElement,
  className,
}: ReferralsCardProps) {
  return (
    <Card className={joinClassNames('flex flex-col gap-y-4 p-4', className)}>
      <div className="flex justify-between text-sm">
        <h2 className="text-text-primary text-base">{title}</h2>
        {titleEndElement}
      </div>
      {children}
    </Card>
  );
}
