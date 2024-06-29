import { PositionsTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterPositionItems';
import { PositionsTable } from 'client/modules/commandCenter/components/tables/PositionsTable';
import { Group } from 'client/modules/commandCenter/components/groups/Group';

interface Props {
  items: PositionsTableItem[];
  shouldShow: boolean;
}

export function PositionsGroup({ items, shouldShow }: Props) {
  return (
    <Group heading="Your positions" shouldShow={shouldShow}>
      <PositionsTable positions={items} />
    </Group>
  );
}
