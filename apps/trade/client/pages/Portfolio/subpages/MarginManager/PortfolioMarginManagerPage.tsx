import { Divider } from '@vertex-protocol/web-ui';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { MarginManagerDefinitionsCollapsible } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinitionsCollapsible';
import { MarginManagerHeader } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader';
import { MarginManagerPerpPositionsTable } from 'client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerPerpPositionsTable';
import { MarginManagerPoolsTable } from 'client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerPoolsTable';
import { MarginManagerQuoteBalanceTable } from 'client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerQuoteBalanceTable';
import { MarginManagerSpotBalancesTable } from 'client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerSpotBalancesTable';
import { MarginManagerSpreadsTable } from 'client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerSpreadsTable';

export function PortfolioMarginManagerPage() {
  return (
    <PortfolioPageContentWrapper className="flex flex-col lg:gap-y-6">
      <MarginManagerHeader />
      <Divider />
      <MarginManagerDefinitionsCollapsible />
      <MarginManagerQuoteBalanceTable />
      <MarginManagerSpotBalancesTable />
      <MarginManagerPerpPositionsTable />
      <MarginManagerPoolsTable />
      <MarginManagerSpreadsTable />
    </PortfolioPageContentWrapper>
  );
}
