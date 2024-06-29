import * as Popover from '@radix-ui/react-popover';
import { Button } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { NavAccountInfoPinsPopoverContent } from 'client/modules/app/navBar/accountInfo/NavAccountInfoPinsPopoverContent';
import { PinnedNavAccountInfoItem } from 'client/modules/app/navBar/accountInfo/PinnedNavAccountInfoItem';
import { useNavAccountInfoPins } from 'client/modules/app/navBar/accountInfo/useNavAccountInfoPins';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { useState } from 'react';

export function NavAccountInfoPinsPopover() {
  const { pinnedItems } = useNavAccountInfoPins();
  const [open, setOpen] = useState(false);

  const accountButtonContent = pinnedItems.length ? (
    pinnedItems.map(
      ({ localStorageId, isPinned, label, value, valueClassName }) => (
        <PinnedNavAccountInfoItem
          key={localStorageId}
          localStorageId={localStorageId}
          isPinned={isPinned}
          label={label}
          value={value}
          valueClassName={valueClassName}
        />
      ),
    )
  ) : (
    <span className="px-0.5 text-xs">Account</span>
  );

  return (
    <Popover.Root onOpenChange={(open) => setOpen(open)} open={open}>
      <Popover.Trigger asChild>
        <Button
          endIcon={<UpDownChevronIcon open={open} size={16} />}
          // Static height here to have consistency with/without pinned items
          className="hover:text-text-primary h-desktop-navbar-item gap-x-1"
        >
          {accountButtonContent}
        </Button>
      </Popover.Trigger>
      <Popover.Content asChild align="end" sideOffset={-2} alignOffset={6}>
        <NavPopoverContentContainer className="w-80 px-0">
          <NavAccountInfoPinsPopoverContent />
        </NavPopoverContentContainer>
      </Popover.Content>
    </Popover.Root>
  );
}
