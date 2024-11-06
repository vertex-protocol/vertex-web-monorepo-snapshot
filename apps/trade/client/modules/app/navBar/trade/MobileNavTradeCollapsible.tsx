import { WithClassnames } from '@vertex-protocol/web-common';
import { NewPill } from 'client/components/NewPill';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';
import { useNavTradeMarketCategories } from 'client/modules/app/navBar/trade/useNavTradeMarketCategories';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';

export function MobileNavTradeCollapsible({ className }: WithClassnames) {
  const marketCategories = useNavTradeMarketCategories();
  const { isElectionMarketsEnabled } = useEnabledFeatures();
  const getIsActiveRoute = useGetIsActiveRoute();
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
          {isElectionMarketsEnabled && <NewPill />}
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          {marketCategories.map((tradeNavItem, index) => (
            <MobileNavCustomCollapsible.LinkButton
              key={index}
              active={getIsActiveRoute(...tradeNavItem.activeRouteHrefs)}
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
