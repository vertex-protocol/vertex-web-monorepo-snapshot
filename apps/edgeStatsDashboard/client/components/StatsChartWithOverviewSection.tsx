import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { StatsSection } from 'client/components/StatsSection';
import { ReactNode } from 'react';

interface Props extends WithClassnames<WithChildren> {
  overviewContent: ReactNode;
}

export function StatsChartWithOverviewSection({
  overviewContent,
  children,
  className,
}: Props) {
  return (
    <StatsSection className={joinClassNames('gap-4 sm:gap-6', className)}>
      <div className="flex flex-wrap gap-x-12 gap-y-6">{overviewContent}</div>
      {children}
    </StatsSection>
  );
}
