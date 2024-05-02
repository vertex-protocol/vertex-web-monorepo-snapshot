import { NavCardButton } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/navigation/components/DesktopNavCustomPopover';
import { useMoreLinks } from 'client/modules/navigation/moreLinks/useMoreLinks';
import Link from 'next/link';
import { useState } from 'react';

export function DesktopMoreLinksPopover() {
  const moreLinks = useMoreLinks();
  const [open, setOpen] = useState(false);

  return (
    <DesktopNavCustomPopover
      open={open}
      setOpen={setOpen}
      triggerContent={
        <AppNavItemButton
          active={open}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          More
        </AppNavItemButton>
      }
      popoverClassName="grid grid-cols-2 gap-2 w-[510px]"
      popoverContent={moreLinks.map((moreLink) => (
        <NavCardButton
          as={Link}
          key={moreLink.label}
          icon={moreLink.icon}
          href={moreLink.href}
          title={moreLink.label}
          external={moreLink.external}
          description={moreLink.description}
        />
      ))}
    />
  );
}
