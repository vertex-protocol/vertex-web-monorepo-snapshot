import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownUi, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { NavAccountInfoPinsDropdownContent } from 'client/modules/app/navBar/accountInfo/NavAccountInfoPinsDropdownContent';
import { useNavAccountInfoPins } from 'client/modules/app/navBar/accountInfo/useNavAccountInfoPins';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { useState } from 'react';

export function NavAccountInfoPinsDropdown() {
  const { pinnedItems } = useNavAccountInfoPins();
  const [open, setOpen] = useState(false);

  const [arePinValuesPrivate] = usePrivacySetting('areAccountValuesPrivate');

  const accountButtonContent = pinnedItems.length ? (
    pinnedItems.map(({ localStorageId, ...valueWithLabelProps }) => (
      <ValueWithLabel.Vertical
        {...valueWithLabelProps}
        isValuePrivate={arePinValuesPrivate}
        key={localStorageId}
        className="w-max px-1"
        sizeVariant="xs"
      />
    ))
  ) : (
    <span className="px-0.5 text-xs">Account</span>
  );

  return (
    <DropdownMenu.Root onOpenChange={(open) => setOpen(open)} open={open}>
      <DropdownMenu.Trigger asChild>
        <DropdownUi.Trigger
          endIcon={<UpDownChevronIcon open={open} size={14} />}
          // Static height here to have consistency with/without pinned items
          className="hover:text-text-primary h-desktop-navbar-item gap-x-1"
        >
          {accountButtonContent}
        </DropdownUi.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild align="end" sideOffset={-2} alignOffset={6}>
        <NavPopoverContentContainer className="w-80 px-0">
          <NavAccountInfoPinsDropdownContent />
        </NavPopoverContentContainer>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
