import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';

export function MarketInfoCardsContainer({
  className,
  children,
}: WithClassnames<WithChildren>) {
  return (
    <div className={joinClassNames('flex items-center p-2', className)}>
      {children}
    </div>
  );
}
