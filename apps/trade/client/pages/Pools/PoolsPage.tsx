'use client';

import { AppPage } from 'client/modules/app/AppPage';
import { LpMarketsTable } from 'client/pages/Pools/components/LpMarketsTable';

export function PoolsPage() {
  return (
    <AppPage.Content>
      <AppPage.EarnHeader
        title="Pools"
        description="LP Positions as margin: Provide liquidity to earn yield from trading fees while utilizing your LP position as margin."
      />
      <LpMarketsTable />
    </AppPage.Content>
  );
}
