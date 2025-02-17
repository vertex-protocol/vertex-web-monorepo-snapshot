import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownUi, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { SubaccountSwitcherDropdownContent } from 'client/modules/subaccounts/components/SubaccountSwitcherDropdownContent';
import { useState } from 'react';

export function AccountCenterSubaccountSwitcher({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  const { currentSubaccountProfile } = useSubaccountContext();

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <DropdownUi.PillTrigger
          className={triggerClassName}
          endIcon={
            <UpDownChevronIcon open={open} className="size-3 shrink-0" />
          }
        >
          <span className="truncate">{currentSubaccountProfile.username}</span>
        </DropdownUi.PillTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={8} align="start" asChild>
        <SubaccountSwitcherDropdownContent className="w-48" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
