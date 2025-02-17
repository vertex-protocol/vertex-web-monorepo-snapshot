'use client';

import { FC, SVGProps } from 'react';
import { mergeClassNames } from '@vertex-protocol/web-common';
import { Tooltip } from 'client/components/Tooltip/Tooltip';
import { PlatformChainsCell } from 'client/sections/ComparisonSection/data';

interface Props extends PlatformChainsCell {}

export function ComparisonChainsCell(cell: Props) {
  if (cell.value.length === 0) {
    return <span className="text-body-12">N/A</span>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-y-1">
      {cell.value.map(({ icon: Icon, tooltip }, idx) => (
        <div
          key={idx}
          className={mergeClassNames('relative -ml-1.5 first:ml-0')}
        >
          {tooltip ? (
            <Tooltip trigger={<ChainIcon icon={Icon} />}>{tooltip}</Tooltip>
          ) : (
            <ChainIcon icon={Icon} />
          )}
        </div>
      ))}
    </div>
  );
}

interface ChainIconProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

function ChainIcon({ icon: Icon, className }: ChainIconProps) {
  const cellIconClassName = mergeClassNames(
    'shadow-icon bg-dark h-5 w-5 rounded-full',
    className ?? '',
  );

  return <Icon className={cellIconClassName} />;
}
