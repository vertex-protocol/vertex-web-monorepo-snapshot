import { WithChildren } from '@vertex-protocol/web-common';
import { PortfolioChartGradientDefinitions } from 'client/pages/Portfolio/charts/components/PortfolioChartGradientDefinitions';
import { DesktopPortfolioSubNavMenu } from 'client/pages/Portfolio/components/navigation/DesktopPortfolioSubNavMenu';
import { MobilePortfolioSubNavMenu } from 'client/pages/Portfolio/components/navigation/MobilePortfolioSubNavMenu';

export default function PortfolioLayout({ children }: WithChildren) {
  return (
    <div className="flex h-full w-full">
      <DesktopPortfolioSubNavMenu className="my-3 ml-2" />
      {/*Overflow hidden to contain tables, otherwise the tables will force page content to expand beyond 100vw */}
      <div className="flex h-full flex-1 flex-col overflow-x-hidden">
        {/*Mobile subnav*/}
        <MobilePortfolioSubNavMenu />
        {/*Main Page content*/}
        <div className="no-scrollbar w-full flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
      <PortfolioChartGradientDefinitions />
    </div>
  );
}
