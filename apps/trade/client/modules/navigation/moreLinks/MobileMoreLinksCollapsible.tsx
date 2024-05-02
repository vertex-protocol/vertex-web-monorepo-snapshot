import { WithClassnames } from '@vertex-protocol/web-common';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/navigation/components/MobileNavCustomCollapsible';
import { useMobileCollapsible } from 'client/modules/navigation/hooks/useMobileCollapsible';
import { useMoreLinks } from 'client/modules/navigation/moreLinks/useMoreLinks';

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
          {moreLinks.map((moreLink) => {
            const StartIcon = moreLink.icon;
            return (
              <MobileNavCustomCollapsible.LinkButton
                key={moreLink.label}
                href={moreLink.href}
                startIcon={<StartIcon />}
                external={moreLink.external}
                onClick={onCollapsibleLinkClick}
              >
                {moreLink.label}
              </MobileNavCustomCollapsible.LinkButton>
            );
          })}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
