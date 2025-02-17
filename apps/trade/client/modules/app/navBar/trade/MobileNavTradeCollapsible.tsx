import { WithClassnames } from '@vertex-protocol/web-common';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';
import { useNavTradeMarketCategories } from 'client/modules/app/navBar/trade/useNavTradeMarketCategories';

export function MobileNavTradeCollapsible({ className }: WithClassnames) {
  const getIsActiveRoute = useGetIsActiveRoute();
  const navTradeMarketCategories = useNavTradeMarketCategories();
  const { onCollapsibleLinkClick } = useMobileCollapsible();

  // If the user is on a spot or perp trading page, or the collapsible is open, then we want Trade to be in an active state
  const currentlySelected = getIsActiveRoute(
    ROUTES.spotTrading,
    ROUTES.perpTrading,
  );

  return (
    <MobileNavCustomCollapsible.Root
      className={className}
      triggerContent={
        <AppNavItemButton
          withMobilePadding
          withCaret
          active={currentlySelected}
        >
          Trade
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          {navTradeMarketCategories.map(({ href, title }, index) => (
            <MobileNavCustomCollapsible.LinkButton
              key={index}
              active={getIsActiveRoute(href)}
              href={href}
              onClick={onCollapsibleLinkClick}
            >
              {title}
            </MobileNavCustomCollapsible.LinkButton>
          ))}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
