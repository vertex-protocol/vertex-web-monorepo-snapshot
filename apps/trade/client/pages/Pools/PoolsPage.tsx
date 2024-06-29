import { joinClassNames } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { LpMarketsTable } from 'client/pages/Pools/components/LpMarketsTable';

export function PoolsPage() {
  return (
    <AppPage.Root
      routeName="Pools"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content>
        <AppPage.EarnHeader
          title="Pools"
          description="LP Positions as margin: Provide liquidity to earn yield from trading fees while utilizing your LP position as margin."
        />
        <LpMarketsTable />
      </AppPage.Content>
    </AppPage.Root>
  );
}
