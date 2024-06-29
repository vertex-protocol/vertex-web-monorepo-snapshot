import {
  AppNavItemButton,
  AppNavItemButtonProps,
} from 'client/modules/app/navBar/components/AppNavItemButton';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { TRADING_COMPETITION_CONFIGS_BY_KEY } from 'client/pages/TradingCompetition/configs/configs';
import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai';
import Link from 'next/link';

const ROUTE = TRADING_COMPETITION_CONFIGS_BY_KEY['blitz'].route;

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
      📈 Trading Comp
    </AppNavItemButton>
  );
}
