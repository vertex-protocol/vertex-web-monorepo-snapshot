import { DiscList } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function WithdrawLbaLiquidityDismissible() {
  const description = (
    <DiscList.Container>
      <DiscList.Item>
        Withdrawn LBA liquidity will be automatically deposited into your Vertex
        account
      </DiscList.Item>
      <DiscList.Item>
        You will receive fewer LBA rewards after the withdrawal
      </DiscList.Item>
    </DiscList.Container>
  );
  return (
    <UserDisclosureDismissibleCard
      disclosureKey="withdraw_lba_liquidity"
      title="Withdrawing LBA Liquidity"
      description={description}
    />
  );
}
