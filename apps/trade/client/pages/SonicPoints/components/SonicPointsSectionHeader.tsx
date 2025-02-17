import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  title: ReactNode;
  description?: ReactNode;
}

export function SonicPointsSectionHeader({
  title,
  description,
  className,
}: Props) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-1.5', className)}>
      <h3 className="text-text-primary text-xl">{title}</h3>
      <p className="text-text-tertiary text-xs empty:hidden sm:text-sm">
        {description}
      </p>
    </div>
  );
}
