import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { BlitzPointsMetrics } from 'client/modules/rewards/components/BlitzPointsMetrics/BlitzPointsMetrics';
import Link from 'next/link';

export function DesktopPointsNavItemButton() {
  const getIsActiveRoute = useGetIsActiveRoute();

  return (
    <AppNavItemButton
      as={Link}
      href={ROUTES.points}
      active={getIsActiveRoute(ROUTES.points)}
      className="gap-x-1.5"
    >
      Points
      <BlitzPointsMetrics
        metricContainerClassName="gap-x-1"
        imgClassName="h-3 w-auto"
      />
    </AppNavItemButton>
  );
}
