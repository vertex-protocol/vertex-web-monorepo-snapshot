import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { OPTIONAL_HISTORY_TABS } from 'client/pages/Portfolio/subpages/History/hooks/usePortfolioHistoryTabs';
import { PortfolioHistoryTabID } from 'client/pages/Portfolio/subpages/History/types';

interface Props {
  enabledOptionalTabIds: PortfolioHistoryTabID[];
  toggleOptionalTabId: (tabId: PortfolioHistoryTabID) => void;
  setSelectedTabId: (id: PortfolioHistoryTabID) => void;
}

export function HistoryTabsDropdown({
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <SecondaryButton
          className="text-text-tertiary rounded p-0.5 lg:p-1"
          startIcon={<Icons.DotsThreeVertical className="text-sm lg:text-lg" />}
        />
      </DropdownMenu.Trigger>
      {/* Using `Portal` here so it doesn't conflict with the scroll shadows mask. */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          side="top"
          align="end"
          className="bg-surface-card border-stroke flex flex-col gap-y-1 rounded border p-1"
        >
          {OPTIONAL_HISTORY_TABS.map(({ label, id }) => (
            <DropdownButton
              key={id}
              label={label}
              show={enabledOptionalTabIds.includes(id)}
              onShowChange={() => toggleTabId(id)}
            />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

interface DropdownButtonProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
  label: string;
}

function DropdownButton({ show, onShowChange, label }: DropdownButtonProps) {
  return (
    <DropdownMenu.Item asChild>
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
    </DropdownMenu.Item>
  );
}
