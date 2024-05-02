import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';

export function PortfolioPageContentWrapper({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <AppPage.Content
      className={joinClassNames(
        'gap-y-6 lg:gap-y-5',
        // Smaller vertical padding for mobile subnav, which has built-in y padding
        // Extra bottom padding to avoid bottom sheet covering page content
        'pb-mobile-bottom-sheet px-4 py-2',
        'sm:px-12 sm:pt-6',
        'lg:px-20 lg:py-12',
        className,
      )}
    >
      {children}
    </AppPage.Content>
  );
}
