import { WithClassnames } from '@vertex-protocol/web-common';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';
import { useGetIsActiveRoute } from '../hooks/useGetIsActiveRoute';
import { useEarnLinks } from './useEarnLinks';

export function MobileEarnCollapsible({ className }: WithClassnames) {
  const earnLinks = useEarnLinks();
  const getIsActiveRoute = useGetIsActiveRoute();
  const { setCollapsibleIsOpen, collapsibleIsOpen, onCollapsibleLinkClick } =
    useMobileCollapsible();

  const showEcosystemLinks = !!earnLinks.ecosystem.length;

  // Since earnLinks.ecosystem is an external link, it is enough to check earnLinks.products - but if that changes, we need to update this logic too
  const currentlySelected =
    collapsibleIsOpen ||
    getIsActiveRoute(...earnLinks.products.map(({ href }) => href));

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
          Earn
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer className="gap-y-4">
          <div className="flex flex-col gap-y-2">
            <MobileEarnHeader title="Products" />
            <div>
              {earnLinks.products.map(({ label, icon, href, external }) => {
                return (
                  <MobileNavCustomCollapsible.LinkButton
                    key={label}
                    icon={icon}
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
            <div className="flex flex-col gap-y-2">
              <MobileEarnHeader title="Ecosystem" />
              <div>
                {earnLinks.ecosystem.map(({ label, icon, href, external }) => {
                  return (
                    <MobileNavCustomCollapsible.LinkButton
                      key={label}
                      icon={icon}
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

function MobileEarnHeader({ title }: { title: string }) {
  return <div className="text-text-tertiary px-2 text-xs">{title}</div>;
}
