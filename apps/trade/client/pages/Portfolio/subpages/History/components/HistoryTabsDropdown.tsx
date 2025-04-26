import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownUi, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
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
          className="text-text-tertiary rounded-sm p-0.5 lg:p-1"
          startIcon={<Icons.DotsThreeVertical className="text-sm lg:text-lg" />}
        />
      </DropdownMenu.Trigger>
      {/* Using `Portal` here so it doesn't conflict with the scroll shadows mask. */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={4} side="bottom" align="end" asChild>
          <DropdownUi.Content className="gap-y-px">
            {OPTIONAL_HISTORY_TABS.map(({ label, id }) => (
              <DropdownButton
                key={id}
                label={label}
                show={enabledOptionalTabIds.includes(id)}
                onShowChange={() => toggleTabId(id)}
              />
            ))}
          </DropdownUi.Content>
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
      <DropdownUi.Item
        className="py-1"
        onClick={() => {
          onShowChange(!show);
        }}
      >
        {show ? `Hide ${label}` : `Show ${label}`}
      </DropdownUi.Item>
    </DropdownMenu.Item>
  );
}
