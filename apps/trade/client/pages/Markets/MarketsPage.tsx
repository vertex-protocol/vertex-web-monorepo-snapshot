import { AppPage } from 'client/modules/app/AppPage';
import { BlitzMarketBoostsDisclosure } from 'client/pages/Markets/components/BlitzMarketBoostsDisclosure';
import { MarketsOverviewCards } from 'client/pages/Markets/components/MarketOverviewCards/MarketsOverviewCards';
import { MarketsPageHeader } from 'client/pages/Markets/components/MarketsPageHeader';
import { MarketsTableTabs } from 'client/pages/Markets/components/MarketsTableTabs';

export function MarketsPage() {
  return (
    <AppPage.Content>
      <MarketsPageHeader />
      <BlitzMarketBoostsDisclosure />
      <MarketsOverviewCards />
      <MarketsTableTabs />
    </AppPage.Content>
  );
}
