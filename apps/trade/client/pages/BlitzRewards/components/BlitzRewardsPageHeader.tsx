import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  title: ReactNode;
  description?: ReactNode;
}

export function BlitzRewardsPageHeader({
  title,
  description,
  className,
}: Props) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2.5', className)}>
      <div className="text-text-primary text-xl">{title}</div>
      <p className="text-text-tertiary text-xs empty:hidden sm:text-sm">
        {description}
      </p>
    </div>
  );
}
