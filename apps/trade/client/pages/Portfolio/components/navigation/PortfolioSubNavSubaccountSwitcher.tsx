import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { SubaccountSwitcherDropdownContent } from 'client/modules/subaccounts/components/SubaccountSwitcherDropdownContent';
import { useState } from 'react';

export function PortfolioSubNavSubaccountSwitcher({
  className,
}: WithClassnames) {
  const [open, setOpen] = useState(false);

  const {
    currentSubaccountProfile: { avatar, username },
  } = useSubaccountContext();

  const stateOverlayClassNames = getStateOverlayClassNames({
    active: open,
    borderRadiusVariant: 'lg',
  });

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          className={joinClassNames(
            'justify-stretch rounded-lg px-3 py-2',
            stateOverlayClassNames,
            className,
          )}
          startIcon={<ProfileAvatarIcon avatar={avatar} size={32} />}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          <div className="flex-1 overflow-hidden text-left">
            <div className="text-text-tertiary text-xs">Account</div>
            <div className="text-text-primary truncate text-sm font-medium">
              {username}
            </div>
          </div>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={8} align="start" asChild>
        <SubaccountSwitcherDropdownContent className="w-48" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
