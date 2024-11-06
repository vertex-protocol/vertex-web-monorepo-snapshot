import { AppPage } from 'client/modules/app/AppPage';
import { MoneyMarketsTable } from 'client/modules/tables/MoneyMarketsTable';
import { TvlStatsLink } from 'client/pages/MoneyMarkets/components/TvlStatsLink';

export function MoneyMarketsPage() {
  return (
    <AppPage.Content>
      <div className="flex flex-col gap-y-2 sm:flex-row sm:justify-between">
        <AppPage.EarnHeader
          title="Lend/Borrow"
          description="Earn on your margin: interest is automatically earned on all deposits."
        />
        <TvlStatsLink />
      </div>
      <MoneyMarketsTable />
    </AppPage.Content>
  );
}
