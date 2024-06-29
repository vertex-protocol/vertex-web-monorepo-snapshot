import { MarketTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterMarketItems';
import { MarketsTable } from 'client/modules/commandCenter/components/tables/MarketsTable';
import { Group } from 'client/modules/commandCenter/components/groups/Group';

interface Props {
  items: MarketTableItem[];
  shouldShow: boolean;
}

export function MarketsGroup({ items, shouldShow }: Props) {
  return (
    <Group heading="Markets" shouldShow={shouldShow}>
      <MarketsTable markets={items} />
    </Group>
  );
}
