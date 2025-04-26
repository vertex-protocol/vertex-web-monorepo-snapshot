import { Icons, LinkButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { MarginManagerMetrics } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerMetrics';
import Link from 'next/link';

export function MarginManagerHeader() {
  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-6">
      <PortfolioHeader>Cross Margin Manager</PortfolioHeader>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-y-2">
          <h4 className="text-text-primary text-base">Totals</h4>
          <MarginManagerMetrics />
        </div>
        <div className="flex flex-col gap-y-2 lg:w-1/4">
          <h4 className="text-text-primary text-base">Isolated Positions</h4>
          <IsolatedInfoMessage />
        </div>
      </div>
    </div>
  );
}

function IsolatedInfoMessage() {
  return (
    <div className="text-text-tertiary flex items-center gap-x-2">
      <Icons.Info size={16} />
      <p className="flex-1 text-xs">
        Margin manager displays your Cross Margin details. Go to{' '}
        <LinkButton
          as={Link}
          href={ROUTES.portfolio.positions}
          colorVariant="primary"
        >
          your positions
        </LinkButton>{' '}
        to manage isolated positions.
      </p>
    </div>
  );
}
