import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { DesktopNavBarContent } from 'client/modules/navigation/DesktopNavBarContent';
import { MobileNavBarContent } from './MobileNavBarContent';

export function AppNavBar({ className }: WithClassnames) {
  const isDesktop = useIsDesktop();

  return (
    <div
      className={joinClassNames(
        'bg-background border-stroke border-b',
        className,
      )}
    >
      {isDesktop ? <DesktopNavBarContent /> : <MobileNavBarContent />}
    </div>
  );
}
