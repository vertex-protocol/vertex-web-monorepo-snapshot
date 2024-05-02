import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

interface Props {
  favoriteComponent: ReactNode;
  marketComponent: ReactNode;
  priceComponent: ReactNode;
  volumeComponent: ReactNode;
}

export function NavTradeRowLayout({
  className,
  favoriteComponent,
  marketComponent,
  priceComponent,
  volumeComponent,
}: WithClassnames<Props>) {
  return (
    <div className={joinClassNames('grid grid-cols-3 text-xs', className)}>
      <div className="flex items-center">
        {favoriteComponent}
        {marketComponent}
      </div>
      <div className="flex items-center justify-end">{priceComponent}</div>
      <div className="flex items-center justify-end">{volumeComponent}</div>
    </div>
  );
}
