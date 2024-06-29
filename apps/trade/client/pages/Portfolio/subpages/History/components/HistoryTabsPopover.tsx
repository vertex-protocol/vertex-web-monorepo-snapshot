import * as Popover from '@radix-ui/react-popover';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import {
  OPTIONAL_HISTORY_TABS,
  PortfolioHistoryTabID,
} from '../hooks/usePortfolioHistoryTabs';

interface Props {
  enabledOptionalTabIds: PortfolioHistoryTabID[];
  toggleOptionalTabId: (tabId: PortfolioHistoryTabID) => void;
  setSelectedTabId: (id: PortfolioHistoryTabID) => void;
}

export function HistoryTabsPopover({
  setSelectedTabId,
  enabledOptionalTabIds,
  toggleOptionalTabId,
}: Props) {
  const toggleTabId = (id: PortfolioHistoryTabID) => {
    // If tab is already enabled we are hiding set to the first tab if not switch to the table.
    setSelectedTabId(enabledOptionalTabIds.includes(id) ? 'trades' : id);
    toggleOptionalTabId(id);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <SecondaryButton
          className="text-text-tertiary rounded p-0.5 lg:p-1"
          startIcon={<Icons.FiMoreVertical className="text-sm lg:text-lg" />}
        />
      </Popover.Trigger>
      <Popover.Content
        sideOffset={4}
        side="top"
        align="end"
        className="bg-surface-card border-stroke z-10 flex flex-col gap-y-1 rounded border p-1"
      >
        {OPTIONAL_HISTORY_TABS.map(({ label, id }) => (
          <PopoverButton
            key={id}
            label={label}
            show={enabledOptionalTabIds.includes(id)}
            onShowChange={() => toggleTabId(id)}
          />
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}

interface PopoverButtonProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
  label: string;
}

function PopoverButton({ show, onShowChange, label }: PopoverButtonProps) {
  return (
    <Popover.Close asChild>
      <Button
        onClick={() => {
          onShowChange(!show);
        }}
        className={joinClassNames(
          'justify-start rounded px-1.5 py-px',
          'text-text-tertiary hover:bg-surface-2 bg-surface-card',
          'hover:text-text-primary text-xs',
        )}
      >
        {show ? `Hide ${label}` : `Show ${label}`}
      </Button>
    </Popover.Close>
  );
}
