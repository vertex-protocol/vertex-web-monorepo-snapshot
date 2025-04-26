import { Divider } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { LpMarketsTable } from 'client/pages/Pools/components/LpMarketsTable';
import { SubaccountPoolsMetricsCards } from 'client/pages/Pools/components/SubaccountPoolsMetricsCards/SubaccountPoolsMetricsCards';

export function PoolsPage() {
  return (
    <AppPage.Content>
      <AppPage.EarnHeader
        title="Pools"
        description={
          <>
            <span className="text-text-primary">LP Positions as margin: </span>
            Provide liquidity to earn yield from trading fees while utilizing
            your LP position as margin.
          </>
        }
      />
      <SubaccountPoolsMetricsCards />
      <Divider />
      <LpMarketsTable />
    </AppPage.Content>
  );
}
