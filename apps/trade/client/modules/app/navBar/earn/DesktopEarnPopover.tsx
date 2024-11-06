import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Divider, NavCardButton } from '@vertex-protocol/web-ui';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { useEarnLinks } from 'client/modules/app/navBar/earn/useEarnLinks';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import Link from 'next/link';

export function DesktopEarnPopover() {
  const earnLinks = useEarnLinks();
  const getIsActiveRoute = useGetIsActiveRoute();

  // Since earnLinks.ecosystem is an external link, it is enough to check earnLinks.products - but if that changes, we need to update this logic too
  const popoverTriggerIsActive = getIsActiveRoute(
    ...earnLinks.products.map(({ href }) => href),
  );

  const showEcosystemLinks = !!earnLinks.ecosystem.length;

  return (
    <DesktopNavCustomPopover
      triggerContent={
        <AppNavItemButton active={popoverTriggerIsActive} withCaret>
          Earn
        </AppNavItemButton>
      }
      popoverClassName="flex flex-col gap-y-4 w-[510px]"
      popoverContent={
        <>
          <div className="flex flex-col gap-y-2">
            <NavPopoverHeader title="Products" />
            <div className="grid grid-cols-2">
              {earnLinks.products.map(
                ({ label, description, href, external }, index) => {
                  return (
                    <NavigationMenu.Link key={index} asChild>
                      <NavCardButton
                        as={Link}
                        title={label}
                        description={description}
                        href={href}
                        external={external}
                      />
                    </NavigationMenu.Link>
                  );
                },
              )}
            </div>
          </div>
          {showEcosystemLinks && (
            <>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <NavPopoverHeader title="Ecosystem" />
                <div className="grid grid-cols-2">
                  {earnLinks.ecosystem.map(
                    ({ label, description, href, external }, index) => (
                      <NavigationMenu.Link key={index} asChild>
                        <NavCardButton
                          as={Link}
                          title={label}
                          description={description}
                          external={external}
                          href={href}
                        />
                      </NavigationMenu.Link>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </>
      }
    />
  );
}
