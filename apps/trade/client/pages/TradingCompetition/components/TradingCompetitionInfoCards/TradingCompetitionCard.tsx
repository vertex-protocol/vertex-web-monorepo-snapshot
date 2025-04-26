import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';

function Container({ children, className }: WithChildren<WithClassnames>) {
  return (
    <Card
      className={joinClassNames(
        // The details card bg image has a decreased `z-index` to prevent interference with hover overlay.
        // Without `isolate` here, its `z-index` will push it underneath this component entirely.
        'relative isolate overflow-hidden border-2',
        className,
      )}
    >
      {children}
    </Card>
  );
}

function Body({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-1 flex-wrap items-center p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Footer({ children }: WithChildren) {
  return (
    <div
      className={joinClassNames(
        'border-stroke bg-overlay-hover border-t backdrop-blur-md',
        'text-text-tertiary flex justify-between px-6 py-3 text-xs sm:text-sm',
      )}
    >
      {children}
    </div>
  );
}

export const TradingCompetitionCard = {
  Container,
  Body,
  Footer,
};
