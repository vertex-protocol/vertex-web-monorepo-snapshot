'use client';

import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

interface Props extends WithChildren<WithClassnames> {
  titleContent: ReactNode;
  titleContentClassName?: string;
  titleTooltipId?: DefinitionTooltipID;
  contentClassName?: string;
}

export function SonicPointsCard({
  className,
  children,
  contentClassName,
  titleContent,
  titleContentClassName,
  titleTooltipId,
}: Props) {
  return (
    <Card
      className={joinClassNames(
        'relative flex flex-col gap-y-2.5 overflow-hidden p-4',
        'text-text-tertiary text-xs',
        className,
      )}
    >
      <DefinitionTooltip
        definitionId={titleTooltipId}
        decoration={{ icon: true }}
        asChild
      >
        <h4
          className={mergeClassNames(
            'text-text-primary text-sm',
            titleContentClassName,
          )}
        >
          {titleContent}
        </h4>
      </DefinitionTooltip>
      <div className={joinClassNames('flex flex-1 flex-col', contentClassName)}>
        {children}
      </div>
    </Card>
  );
}
