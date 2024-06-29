import { WithClassnames } from '@vertex-protocol/web-common';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';
import { useMoreLinks } from 'client/modules/app/navBar/moreLinks/useMoreLinks';

export function MobileMoreLinksCollapsible({ className }: WithClassnames) {
  const moreLinks = useMoreLinks();
  const { setCollapsibleIsOpen, collapsibleIsOpen, onCollapsibleLinkClick } =
    useMobileCollapsible();

  return (
    <MobileNavCustomCollapsible.Root
      className={className}
      open={collapsibleIsOpen}
      setOpen={setCollapsibleIsOpen}
      triggerContent={
        <AppNavItemButton
          withMobilePadding
          active={collapsibleIsOpen}
          endIcon={<UpDownChevronIcon open={collapsibleIsOpen} />}
        >
          More
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          {moreLinks.map(({ label, href, external, icon }) => {
            return (
              <MobileNavCustomCollapsible.LinkButton
                key={label}
                href={href}
                icon={icon}
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
