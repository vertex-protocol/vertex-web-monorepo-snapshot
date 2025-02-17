'use client';

import { Tooltip } from 'client/components/Tooltip/Tooltip';
import { ExternalLink } from 'client/components/Link/Link';
import { ComparisonChainsCell } from 'client/components/ComparisonCell/ComparisonChainsCell';
import CheckIcon from 'client/icons/CheckIcon';
import CloseIcon from 'client/icons/CloseIcon';
import {
  PlatformBooleanCell,
  PlatformChainsCell,
  PlatformLogoCell,
  PlatformStringCell,
} from 'client/sections/ComparisonSection/data';

export function ComparisonCell(
  cell:
    | PlatformStringCell
    | PlatformBooleanCell
    | PlatformChainsCell
    | PlatformLogoCell,
) {
  if (cell.type === 'logo') {
    return <ComparisonLogoCell {...cell} />;
  }

  if (cell.type === 'boolean') {
    return <ComparisonBooleanCell {...cell} />;
  }

  if (cell.type === 'chains') {
    return <ComparisonChainsCell {...cell} />;
  }

  if (cell.type === 'string' && cell.tooltip && !cell.href) {
    return (
      <Tooltip trigger={<ComparisonStringCell {...cell} />}>
        <p className="text-body-12 max-w-[24ch] py-1">{cell.tooltip}</p>
      </Tooltip>
    );
  }

  if (cell.type === 'string' && cell.tooltip && cell.href) {
    return (
      <Tooltip
        trigger={
          <ExternalLink withHoverEffect={false} href={cell.href}>
            <ComparisonStringCell {...cell} />
          </ExternalLink>
        }
      >
        <p className="text-body-12 max-w-[24ch] py-1">{cell.tooltip}</p>
      </Tooltip>
    );
  }

  if (cell.type === 'string' && !cell.tooltip && cell.href) {
    return (
      <ExternalLink withHoverEffect={false} href={cell.href}>
        <ComparisonStringCell {...cell} />
      </ExternalLink>
    );
  }

  return <ComparisonStringCell {...cell} />;
}

function ComparisonStringCell(cell: PlatformStringCell) {
  return <p className="text-body-12 max-w-[13ch] text-center">{cell.value}</p>;
}

function ComparisonLogoCell(cell: PlatformLogoCell) {
  const Logo = cell.value;
  return (
    <div className="flex h-32 flex-col items-center justify-center p-4">
      <Logo />
    </div>
  );
}

function ComparisonBooleanCell(cell: PlatformBooleanCell) {
  return (
    <p className="text-body-12">
      {cell.value ? <CheckIcon /> : <CloseIcon size={16} />}
    </p>
  );
}
