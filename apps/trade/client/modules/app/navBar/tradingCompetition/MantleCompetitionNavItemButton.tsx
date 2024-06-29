import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { StatusIndicator } from 'client/components/StatusIndicator';
import {
  AppNavItemButton,
  AppNavItemButtonProps,
} from 'client/modules/app/navBar/components/AppNavItemButton';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { TRADING_COMPETITION_CONFIGS_BY_KEY } from 'client/pages/TradingCompetition/configs/configs';
import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai';
import Link from 'next/link';

const ROUTE = TRADING_COMPETITION_CONFIGS_BY_KEY['mantle'].route;

type Props = Pick<AppNavItemButtonProps, 'withMobilePadding'> & WithClassnames;

export function MantleCompetitionNavItemButton({
  withMobilePadding,
  className,
}: Props) {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);
  const getIsActiveRoute = useGetIsActiveRoute();

  return (
    <AppNavItemButton
      as={Link}
      href={ROUTE}
      active={getIsActiveRoute(ROUTE)}
      className={joinClassNames('bg-overlay-accent/10 gap-x-2 px-2', className)}
      withMobilePadding={withMobilePadding}
      onClick={() => setOpenMobileNav(false)}
    >
      <StatusIndicator colorVariant="positive" />
      <div>
        <div className="text-text-tertiary text-3xs uppercase">
          Mantle Launch
        </div>
        <div className="text-text-primary text-xs">Trading Competition</div>
      </div>
    </AppNavItemButton>
  );
}
