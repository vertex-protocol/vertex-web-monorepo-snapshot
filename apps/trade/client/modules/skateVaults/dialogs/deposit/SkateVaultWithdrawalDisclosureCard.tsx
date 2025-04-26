import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function SkateVaultWithdrawalDisclosureCard() {
  const {
    primaryQuoteToken: { symbol },
  } = useVertexMetadataContext();

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="skate_vault_withdrawal"
      title="Vault Withdrawals"
      description={`
        Skate maintains 10-20% of the vault's TVL in ${symbol} for withdrawals. During periods of high withdrawals, you may not be able to withdraw your full ${symbol} balance immediately.
      `}
    />
  );
}
