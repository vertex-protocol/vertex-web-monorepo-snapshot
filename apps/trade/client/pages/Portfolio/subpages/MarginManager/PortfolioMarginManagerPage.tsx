import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { Divider } from '@vertex-protocol/web-ui';
import { MarginManagerDefinitionsCollapsible } from './components/MarginManagerDefinitionsCollapsible/MarginManagerDefinitionsCollapsible';
import { MarginManagerHeader } from './components/MarginManagerHeader/MarginManagerHeader';
import { MarginManagerPerpPositionsTable } from './tables/MarginManagerPerpPositionsTable';
import { MarginManagerPoolsTable } from './tables/MarginManagerPoolsTable';
import { MarginManagerQuoteBalanceTable } from './tables/MarginManagerQuoteBalanceTable';
import { MarginManagerSpotBalancesTable } from './tables/MarginManagerSpotBalancesTable';
import { MarginManagerSpreadsTable } from './tables/MarginManagerSpreadsTable';

export const PortfolioMarginManagerPage = () => {
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
};
