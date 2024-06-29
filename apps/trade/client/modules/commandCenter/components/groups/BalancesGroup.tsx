import { BalancesTable } from 'client/modules/commandCenter/components/tables/BalancesTable';
import { Group } from 'client/modules/commandCenter/components/groups/Group';
import { BalanceTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterBalanceItems';

interface Props {
  items: BalanceTableItem[];
  shouldShow: boolean;
}

export function BalancesGroup({ items, shouldShow }: Props) {
  return (
    <Group heading="Balances" shouldShow={shouldShow}>
      <BalancesTable balances={items} />
    </Group>
  );
}
