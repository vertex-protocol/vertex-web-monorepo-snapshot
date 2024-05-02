import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export function PortfolioHeader({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'text-text-primary title-text text-2xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
