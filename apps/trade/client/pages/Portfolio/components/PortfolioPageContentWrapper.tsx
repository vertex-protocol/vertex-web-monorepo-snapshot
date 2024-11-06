import {
  mergeClassNames,
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
      className={mergeClassNames(
        // Smaller horizontal padding to compensate for the side sub nav.
        'sm:px-8',
        // Smaller top padding for mobile subnav, which has built-in y padding, desktop case is handled by APP_PAGE_PADDING.vertical
        'pt-2',
        className,
      )}
    >
      {children}
    </AppPage.Content>
  );
}
