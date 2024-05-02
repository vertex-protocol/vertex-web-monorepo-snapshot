import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { PortfolioChart } from 'client/pages/Portfolio/charts/components/PortfolioChart';

function Container({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames(
        'grid gap-y-6',
        // Large screen styles
        'lg:h-96 lg:grid-cols-4 lg:gap-x-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

function MetricsPane({ children, className }: WithClassnames<WithChildren>) {
  return (
    <Card
      className={joinClassNames(
        'flex flex-col gap-y-6',
        // Small screen styles
        'p-4',
        // Large screen styles
        'sm:justify-between sm:px-4 sm:py-5',
        className,
      )}
    >
      {children}
    </Card>
  );
}

export const PortfolioHeroSection = {
  Container,
  MetricsPane,
  Chart: PortfolioChart,
};
