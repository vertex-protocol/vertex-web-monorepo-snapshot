import { WithClassnames } from '@vertex-protocol/web-common';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { useEarnLinks } from 'client/modules/app/navBar/earn/useEarnLinks';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';

export function MobileEarnCollapsible({ className }: WithClassnames) {
  const earnLinks = useEarnLinks();
  const getIsActiveRoute = useGetIsActiveRoute();
  const { onCollapsibleLinkClick } = useMobileCollapsible();

  const currentlySelected = getIsActiveRoute(
    ...earnLinks.map(({ href }) => href),
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
          Earn
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          {earnLinks.map(({ href, pageLabel }, index) => {
            return (
              <MobileNavCustomCollapsible.LinkButton
                key={index}
                href={href}
                active={getIsActiveRoute(href)}
                onClick={onCollapsibleLinkClick}
              >
                {pageLabel}
              </MobileNavCustomCollapsible.LinkButton>
            );
          })}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
