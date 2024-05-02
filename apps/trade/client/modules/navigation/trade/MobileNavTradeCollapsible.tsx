import { WithClassnames } from '@vertex-protocol/web-common';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/navigation/components/MobileNavCustomCollapsible';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/navigation/hooks/useMobileCollapsible';
import { TRADE_NAV_ITEMS } from 'client/modules/navigation/trade/tradeNavItems';

export function MobileNavTradeCollapsible({ className }: WithClassnames) {
  const getIsActiveRoute = useGetIsActiveRoute();
  const { setCollapsibleIsOpen, collapsibleIsOpen, onCollapsibleLinkClick } =
    useMobileCollapsible();

  // If the user is on a spot or perp trading page, or the collapsible is open, then we want Trade to be in an active state
  const currentlySelected =
    getIsActiveRoute(ROUTES.spotTrading) ||
    getIsActiveRoute(ROUTES.perpTrading) ||
    collapsibleIsOpen;

  return (
    <MobileNavCustomCollapsible.Root
      className={className}
      open={collapsibleIsOpen}
      setOpen={setCollapsibleIsOpen}
      triggerContent={
        <AppNavItemButton
          withMobilePadding
          active={currentlySelected}
          endIcon={<UpDownChevronIcon open={collapsibleIsOpen} />}
        >
          Trade
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          {TRADE_NAV_ITEMS.map((tradeNavItem) => (
            <MobileNavCustomCollapsible.LinkButton
              key={tradeNavItem.title}
              active={getIsActiveRoute(tradeNavItem.href)}
              href={tradeNavItem.href}
              onClick={onCollapsibleLinkClick}
            >
              {tradeNavItem.title}
            </MobileNavCustomCollapsible.LinkButton>
          ))}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
