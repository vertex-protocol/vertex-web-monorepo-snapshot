import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import Link from 'next/link';

export function DesktopPointsNavItemButton() {
  const getIsActiveRoute = useGetIsActiveRoute();

  return (
    <AppNavItemButton
      as={Link}
      href={ROUTES.points}
      active={getIsActiveRoute(ROUTES.points)}
      className="text-accent gap-x-1.5"
    >
      Points
    </AppNavItemButton>
  );
}
