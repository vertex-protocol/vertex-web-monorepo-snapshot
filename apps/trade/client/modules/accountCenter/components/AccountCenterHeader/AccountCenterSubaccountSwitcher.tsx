import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { SubaccountSwitcherDropdownContent } from 'client/modules/subaccounts/components/SubaccountSwitcherDropdownContent';
import { useState } from 'react';

export function AccountCenterSubaccountSwitcher({ className }: WithClassnames) {
  const [open, setOpen] = useState(false);

  const { currentSubaccountProfile } = useSubaccountContext();
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'full',
  });

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          className={joinClassNames(
            'bg-surface-2 justify-between overflow-hidden rounded-full',
            'text-text-primary px-2.5 py-1 text-xs',
            className,
            hoverStateOverlayClassNames,
          )}
        >
          <span className="truncate">{currentSubaccountProfile.username}</span>
          <UpDownChevronIcon open={open} className="size-3 shrink-0" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={8} align="start" asChild>
        <SubaccountSwitcherDropdownContent className="w-48" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
