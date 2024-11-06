import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavCardButton } from '@vertex-protocol/web-ui';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import { useMoreLinks } from 'client/modules/app/navBar/moreLinks/useMoreLinks';
import Link from 'next/link';

export function DesktopMoreLinksPopover() {
  const moreLinks = useMoreLinks();

  return (
    <DesktopNavCustomPopover
      triggerContent={<AppNavItemButton withCaret>More</AppNavItemButton>}
      popoverClassName="grid grid-cols-2 w-[510px]"
      popoverContent={moreLinks.map(
        ({ label, href, external, description }) => {
          return (
            <NavigationMenu.Link key={label} asChild>
              <NavCardButton
                as={Link}
                href={href}
                title={label}
                external={external}
                description={description}
              />
            </NavigationMenu.Link>
          );
        },
      )}
    />
  );
}
