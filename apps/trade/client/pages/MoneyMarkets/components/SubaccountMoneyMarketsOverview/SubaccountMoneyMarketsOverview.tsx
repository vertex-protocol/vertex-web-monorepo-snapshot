import { joinClassNames } from '@vertex-protocol/web-common';
import { MoneyMarketsSectionTitle } from 'client/pages/MoneyMarkets/components/MoneyMarketsSectionTitle';
import { SubaccountInterestChart } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/SubaccountInterestChart';
import { SubaccountMoneyMarketsOverviewItems } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountMoneyMarketsOverviewItems';

export function SubaccountMoneyMarketsOverview() {
  return (
    <div className="flex flex-col gap-y-4">
      <MoneyMarketsSectionTitle>Your Stats</MoneyMarketsSectionTitle>
      <div
        className={joinClassNames(
          'grid gap-y-6',
          // Large screen styles
          'lg:h-80 lg:grid-cols-4 lg:gap-x-4',
        )}
      >
        <SubaccountMoneyMarketsOverviewItems />
        <SubaccountInterestChart className="lg:col-span-3" />
      </div>
    </div>
  );
}
