'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { DesktopNavBarContent } from 'client/modules/app/navBar/DesktopNavBarContent';
import { MobileNavBarContent } from 'client/modules/app/navBar/MobileNavBarContent';

export function AppNavBar({ className }: WithClassnames) {
  const isDesktop = useIsDesktop();

  return (
    <div className={joinClassNames('bg-background', className)}>
      {isDesktop ? <DesktopNavBarContent /> : <MobileNavBarContent />}
    </div>
  );
}
