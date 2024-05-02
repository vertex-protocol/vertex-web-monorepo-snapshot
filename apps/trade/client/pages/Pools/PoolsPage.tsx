import { joinClassNames } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { LpMarketsTable } from 'client/pages/Pools/components/LpMarketsTable';
import { PoolsTabs } from './components/PoolsTabs';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';

export function PoolsPage() {
  const showPoolsTabs = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  return (
    <AppPage.Root
      routeName="Pools"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content className="gap-y-3 lg:gap-y-4">
        <AppPage.Header title="Pools" />
        {showPoolsTabs ? <PoolsTabs /> : <LpMarketsTable />}
      </AppPage.Content>
    </AppPage.Root>
  );
}
