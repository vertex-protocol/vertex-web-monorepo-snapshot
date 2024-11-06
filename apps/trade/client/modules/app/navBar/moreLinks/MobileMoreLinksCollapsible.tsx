import { WithClassnames } from '@vertex-protocol/web-common';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';
import { useMoreLinks } from 'client/modules/app/navBar/moreLinks/useMoreLinks';

export function MobileMoreLinksCollapsible({ className }: WithClassnames) {
  const moreLinks = useMoreLinks();
  const { onCollapsibleLinkClick } = useMobileCollapsible();

  return (
    <MobileNavCustomCollapsible.Root
      className={className}
      triggerContent={
        <AppNavItemButton withMobilePadding withCaret>
          More
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          {moreLinks.map(({ label, href, external }) => {
            return (
              <MobileNavCustomCollapsible.LinkButton
                key={label}
                href={href}
                external={external}
                onClick={onCollapsibleLinkClick}
              >
                {label}
              </MobileNavCustomCollapsible.LinkButton>
            );
          })}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
