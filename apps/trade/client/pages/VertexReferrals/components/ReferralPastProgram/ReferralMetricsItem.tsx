import { joinClassNames } from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

export interface ReferralsMetricItemProps {
  label: string;
  content: ReactNode;
  definitionTooltipId: DefinitionTooltipID;
}

export function ReferralMetricsItem({
  label,
  content,
  definitionTooltipId,
}: ReferralsMetricItemProps) {
  return (
    <div
      className={joinClassNames(
        'flex justify-between',
        // Mobile specific styles
        'flex-col px-6 py-3.5',
        // Large screen specific styles
        'sm:flex-row sm:items-center sm:p-4 sm:px-6',
      )}
    >
      <DefinitionTooltip
        decoration={{ icon: true }}
        definitionId={definitionTooltipId}
        contentWrapperClassName="text-text-tertiary text-sm"
      >
        {label}
      </DefinitionTooltip>
      <div className="lg:text-md text-text-primary text-xl">{content}</div>
    </div>
  );
}
