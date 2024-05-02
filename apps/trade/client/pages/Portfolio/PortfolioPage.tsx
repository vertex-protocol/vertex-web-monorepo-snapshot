import { AppPage } from 'client/modules/app/AppPage';
import { PortfolioChartGradientDefinitions } from 'client/pages/Portfolio/charts/components/PortfolioChartGradientDefinitions';
import { DesktopPortfolioSubNavMenu } from 'client/pages/Portfolio/components/navigation/DesktopPortfolioSubNavMenu';
import { MobilePortfolioSubNavMenu } from 'client/pages/Portfolio/components/navigation/MobilePortfolioSubNavMenu';
import { usePortfolioPage } from 'client/pages/Portfolio/hooks/usePortfolioPage';

export function PortfolioPage() {
  const { Component, title } = usePortfolioPage();

  return (
    <AppPage.Root routeName={title} hideHighlights>
      <div className="flex h-full w-full">
        <DesktopPortfolioSubNavMenu />
        {/*Overflow hidden to contain tables, otherwise the tables will force page content to expand beyond 100vw */}
        <div className="flex h-full flex-1 flex-col overflow-x-hidden">
          {/*Mobile subnav*/}
          <MobilePortfolioSubNavMenu />
          {/*Main Page content*/}
          <div className="no-scrollbar w-full flex-1 overflow-y-auto">
            <Component />
          </div>
        </div>
      </div>
      <PortfolioChartGradientDefinitions />
    </AppPage.Root>
  );
}
