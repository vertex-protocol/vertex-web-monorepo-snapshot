import { Kbd } from 'client/modules/commandCenter/components/Kbd';
import { ActionName } from 'client/modules/commandCenter/components/cells/ActionName';
import { Group } from 'client/modules/commandCenter/components/groups/Group';
import { BaseRow } from 'client/modules/commandCenter/components/tables/BaseTable/BaseRow';
import { NavItem } from 'client/modules/commandCenter/hooks/useCommandCenterNavItems';

interface Props {
  items: NavItem[];
  shouldShow: boolean;
}

export function NavItemsGroup({ items, shouldShow }: Props) {
  return (
    <Group heading="App navigation" shouldShow={shouldShow}>
      <div className="flex flex-col">
        {items.map((item) => (
          <BaseRow
            id={`nav-${item.label}`}
            key={item.label}
            className="justify-between"
            onSelect={() => item.action()}
          >
            <div className="flex items-center gap-x-2">
              <Kbd icon={item.icon} iconClassname="h-3 w-auto" />
              <span className="text-text-primary">{item.label}</span>
            </div>
            <ActionName>{item.actionText}</ActionName>
          </BaseRow>
        ))}
      </div>
    </Group>
  );
}
