'use client';

import { WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';

// Use this component when Blitz Trading Competition page is not yet available.
export function BlitzTradingCompetitionOpportunityTbaCardContent({
  className,
}: WithClassnames) {
  return (
    <div className={className}>
      <ValueWithLabel.Vertical label="Prize Pool" valueContent="-" />
      <ValueWithLabel.Vertical label="Date" valueContent="TBA" />
    </div>
  );
}
