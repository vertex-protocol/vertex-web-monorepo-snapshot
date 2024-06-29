import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { BlitzPointsMetrics } from 'client/modules/rewards/components/BlitzPointsMetrics/BlitzPointsMetrics';
import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai/index';
import Link from 'next/link';
import { useGetIsActiveRoute } from '../hooks/useGetIsActiveRoute';

export function MobilePointsNavItemButton() {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);
  const getIsActiveRoute = useGetIsActiveRoute();

  return (
    <AppNavItemButton
      withMobilePadding
      as={Link}
      href={ROUTES.points}
      active={getIsActiveRoute(ROUTES.points)}
      onClick={() => setOpenMobileNav(false)}
      className="text-accent gap-x-2"
    >
      Points
      <BlitzPointsMetrics
        metricContainerClassName="gap-x-1"
        imgClassName="h-3 w-auto"
      />
    </AppNavItemButton>
  );
}
