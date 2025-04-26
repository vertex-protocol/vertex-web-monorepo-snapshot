import { AppPage } from 'client/modules/app/AppPage';
import { MoneyMarketsTable } from 'client/modules/tables/MoneyMarketsTable';
import { MoneyMarketDetailsPromoBanner } from 'client/pages/MoneyMarkets/components/MoneyMarketDetailsPromoBanner/MoneyMarketDetailsPromoBanner';
import { MoneyMarketsOverview } from 'client/pages/MoneyMarkets/components/MoneyMarketsOverview/MoneyMarketsOverview';
import { SubaccountMoneyMarketsOverview } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountMoneyMarketsOverview';

export function MoneyMarketsPage() {
  return (
    <AppPage.Content>
      <AppPage.EarnHeader
        title="Lend/Borrow"
        description="Earn on your margin: interest is automatically earned on all deposits."
      />
      <SubaccountMoneyMarketsOverview />
      <MoneyMarketsOverview />
      <MoneyMarketDetailsPromoBanner />
      <MoneyMarketsTable />
    </AppPage.Content>
  );
}
