'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { useIsEngineHealthy } from 'client/modules/app/hooks/useIsEngineHealthy';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function StatusButton() {
  const isEngineHealthy = useIsEngineHealthy();
  const statusButtonClasses = isEngineHealthy
    ? 'border-stroke bg-positive-muted text-positive hover:border-positive'
    : 'border-stroke bg-warning-muted text-warning hover:border-warning';

  return (
    <Button
      external
      as={Link}
      href={LINKS.appStatus}
      className={joinClassNames(
        'rounded border px-2 py-px text-xs no-underline',
        statusButtonClasses,
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icons.CircleFill size={6} />
        {isEngineHealthy ? 'Operational' : 'Maintenance'}
      </div>
    </Button>
  );
}
