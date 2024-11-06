import { WithClassnames } from '@vertex-protocol/web-common';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { useEarnLinks } from 'client/modules/app/navBar/earn/useEarnLinks';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';

export function MobileEarnCollapsible({ className }: WithClassnames) {
  const earnLinks = useEarnLinks();
  const getIsActiveRoute = useGetIsActiveRoute();
  const { onCollapsibleLinkClick } = useMobileCollapsible();

  const showEcosystemLinks = !!earnLinks.ecosystem.length;

  // Since earnLinks.ecosystem is an external link, it is enough to check earnLinks.products - but if that changes, we need to update this logic too
  const currentlySelected = getIsActiveRoute(
    ...earnLinks.products.map(({ href }) => href),
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
        <MobileNavCustomCollapsible.LinksContainer className="gap-y-4">
          <div className="flex flex-col gap-y-1">
            <NavPopoverHeader title="Products" />
            <div>
              {earnLinks.products.map(({ label, href, external }, index) => {
                return (
                  <MobileNavCustomCollapsible.LinkButton
                    key={index}
                    href={href}
                    external={external}
                    active={getIsActiveRoute(href)}
                    onClick={onCollapsibleLinkClick}
                  >
                    {label}
                  </MobileNavCustomCollapsible.LinkButton>
                );
              })}
            </div>
          </div>
          {showEcosystemLinks && (
            <div className="flex flex-col gap-y-1">
              <NavPopoverHeader title="Ecosystem" />
              <div>
                {earnLinks.ecosystem.map(({ label, href, external }, index) => {
                  return (
                    <MobileNavCustomCollapsible.LinkButton
                      key={index}
                      href={href}
                      external={external}
                      active={getIsActiveRoute(href)}
                      onClick={onCollapsibleLinkClick}
                    >
                      {label}
                    </MobileNavCustomCollapsible.LinkButton>
                  );
                })}
              </div>
            </div>
          )}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
