import { BigDecimal } from '@vertex-protocol/client';
import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { useShouldFlash } from 'client/hooks/ui/useShouldFlash';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { range } from 'lodash';
import React from 'react';

interface ContainerProps extends WithClassnames, WithChildren {
  onClick: () => void;
  highlightWidthFraction: BigDecimal;
  isSell: boolean;
  flashKey?: string;
  flashOnMount?: boolean;
  definitionId?: DefinitionTooltipID;
}

function Container({
  children,
  className,
  onClick,
  highlightWidthFraction,
  isSell,
  flashKey,
  flashOnMount,
  definitionId,
}: WithChildren<ContainerProps>) {
  const shouldFlash = useShouldFlash({ flashKey, flashOnMount });

  const flashClassName = (() => {
    if (!shouldFlash) {
      return;
    }

    return isSell ? 'bg-negative/20' : 'bg-positive/20';
  })();

  return (
    <DefinitionTooltip
      definitionId={definitionId}
      decoration="none"
      noHelpCursor
      asChild
    >
      <Button
        onClick={onClick}
        className={mergeClassNames(
          'group relative flex gap-x-1',
          'px-4 py-0.5 lg:py-0',
          'text-2xs text-text-secondary',
          isSell ? 'hover:bg-negative/5' : 'hover:bg-positive/5',
          flashClassName,
          className,
        )}
      >
        <div
          className={joinClassNames(
            'absolute inset-0',
            isSell ? 'bg-negative/10' : 'bg-positive/10',
          )}
          style={{
            width: `${highlightWidthFraction.times(100).toFixed()}%`,
          }}
        />
        {children}
      </Button>
    </DefinitionTooltip>
  );
}

function Item({
  children,
  className,
  isSell,
}: WithChildren<
  WithClassnames<{
    // If provided, will render green/red based on the side
    isSell?: boolean;
  }>
>) {
  const textColorClassName = (() => {
    if (isSell == null) {
      return;
    }
    return isSell ? 'text-negative' : 'text-positive';
  })();

  return (
    <div
      className={joinClassNames(
        'flex flex-1 justify-start',
        textColorClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}

const Skeleton = ({
  className,
  numCols,
}: WithClassnames<{ numCols: number }>) => (
  <div className={mergeClassNames('flex flex-1 px-4 py-0.5', className)}>
    {range(numCols).map((_, index) => (
      <Item key={index} className="text-text-primary animate-pulse text-xs">
        <Icons.Minus />
      </Item>
    ))}
  </div>
);

export const MarketOrderRow = {
  Container,
  Item,
  Skeleton: React.memo(Skeleton),
};
