import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { OverviewCollateralButtons } from 'client/pages/Portfolio/subpages/Overview/components/OverviewWelcomeHeader/OverviewCollateralButtons';

export function OverviewWelcomeHeader() {
  const isConnected = useIsConnected();

  return (
    <div className="flex flex-col gap-y-5 sm:flex-row sm:items-end sm:justify-between">
      <PortfolioHeader>Welcome</PortfolioHeader>
      {isConnected && <OverviewCollateralButtons />}
    </div>
  );
}
