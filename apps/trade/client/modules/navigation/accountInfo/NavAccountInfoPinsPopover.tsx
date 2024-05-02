import * as Popover from '@radix-ui/react-popover';
import { NavBarCardButton } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { NavAccountInfoPinsPopoverContent } from 'client/modules/navigation/accountInfo/NavAccountInfoPinsPopoverContent';
import { PinnedNavAccountInfoItem } from 'client/modules/navigation/accountInfo/PinnedNavAccountInfoItem';
import { useNavAccountInfoPins } from 'client/modules/navigation/accountInfo/useNavAccountInfoPins';
import { NavPopoverContentContainer } from 'client/modules/navigation/components/NavPopoverContentContainer';
import { useState } from 'react';

export function NavAccountInfoPinsPopover() {
  const { pinnedItems } = useNavAccountInfoPins();
  const [open, setOpen] = useState(false);
  const { trackEvent } = useAnalyticsContext();

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
    <span className="px-1 text-xs">Account</span>
  );

  return (
    <Popover.Root onOpenChange={(open) => setOpen(open)} open={open}>
      <Popover.Trigger asChild>
        <NavBarCardButton
          endIcon={
            // Remove the chevron when there are pinned items to prevent overflow
            pinnedItems.length === 0 && (
              <UpDownChevronIcon
                className="text-text-tertiary"
                open={open}
                size={20}
              />
            )
          }
          // Static height here to have consistency with/without pinned items
          className="h-desktop-navbar-item"
          onClick={() =>
            trackEvent({ type: 'nav_account_info_viewed', data: {} })
          }
        >
          {accountButtonContent}
        </NavBarCardButton>
      </Popover.Trigger>
      <Popover.Content asChild align="end" sideOffset={-2} alignOffset={6}>
        <NavPopoverContentContainer className="w-80 px-0">
          <NavAccountInfoPinsPopoverContent />
        </NavPopoverContentContainer>
      </Popover.Content>
    </Popover.Root>
  );
}
