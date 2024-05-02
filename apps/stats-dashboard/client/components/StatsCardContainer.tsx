import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';

export function StatsCardContainer({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div className={joinClassNames('grid grid-cols-1 gap-4', className)}>
      {children}
    </div>
  );
}
