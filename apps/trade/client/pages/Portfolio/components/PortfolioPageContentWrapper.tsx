import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';

export function PortfolioPageContentWrapper({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <AppPage.Content
      className={mergeClassNames(
        APP_PAGE_PADDING.vertical,
        APP_PAGE_PADDING.horizontal,
        // Smaller top padding for mobile subnav, which has built-in y padding, desktop case is handled by APP_PAGE_PADDING.vertical
        'pt-2',
        className,
      )}
    >
      {children}
    </AppPage.Content>
  );
}
