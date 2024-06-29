import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { DesktopNavBarContent } from 'client/modules/app/navBar/DesktopNavBarContent';
import { MobileNavBarContent } from './MobileNavBarContent';

export function AppNavBar({
  className,
  hasNavBorder,
}: WithClassnames<{ hasNavBorder?: boolean }>) {
  const isDesktop = useIsDesktop();

  return (
    <div
      className={joinClassNames(
        'bg-background',
        hasNavBorder && 'border-stroke border-b',
        className,
      )}
    >
      {isDesktop ? <DesktopNavBarContent /> : <MobileNavBarContent />}
    </div>
  );
}
