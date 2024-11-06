import {
  AppNavItemButton,
  AppNavItemButtonProps,
} from 'client/modules/app/navBar/components/AppNavItemButton';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { BLITZ_TRADING_COMPETITION_ROUTES } from 'client/pages/TradingCompetition/configs/blitz/routes';
import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai';
import Link from 'next/link';

const ROUTE = BLITZ_TRADING_COMPETITION_ROUTES.base;

type Props = Pick<AppNavItemButtonProps, 'withMobilePadding'>;

export function BlitzCompetitionNavItemButton({ withMobilePadding }: Props) {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);
  const getIsActiveRoute = useGetIsActiveRoute();

  return (
    <AppNavItemButton
      as={Link}
      href={ROUTE}
      active={getIsActiveRoute(ROUTE)}
      withMobilePadding={withMobilePadding}
      className="text-text-primary"
      onClick={() => setOpenMobileNav(false)}
    >
      🏆 Trading Comp
    </AppNavItemButton>
  );
}
