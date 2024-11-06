import { DiscList } from '@vertex-protocol/web-ui';
import { CollapsibleInfoCard } from 'client/components/CollapsibleInfoCard';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';

export function SlowModeSettingsInfoCollapsible() {
  const { primaryQuoteToken } = useVertexMetadataContext();

  const collapsibleContent = (
    <div className="flex flex-col gap-y-2">
      <p>
        Smart contract wallets, such as Coinbase Smart Wallet, Safe, and Argent,
        do not support EIP712 signatures. You must delegate a 1-Click Trading
        key to sign transactions on your behalf.
      </p>
      <DiscList.Container>
        <DiscList.Item>
          Ensure that you have{' '}
          <span className="text-text-primary">
            1 {primaryQuoteToken.symbol}
          </span>{' '}
          in your wallet to pay the fee for enabling 1CT.
        </DiscList.Item>
        <DiscList.Item>
          Generate a private key, or paste one that you have generated
          previously.{' '}
          <span className="text-text-primary">
            Save the key in a secure place
          </span>
          .
        </DiscList.Item>
        <DiscList.Item>
          After sending the transaction, you can proceed to use the app within a
          few minutes.
        </DiscList.Item>
      </DiscList.Container>
      <p>To disable 1CT, turn off the switch below and send the transaction.</p>
    </div>
  );

  return (
    <CollapsibleInfoCard
      title="Instructions"
      collapsibleContent={collapsibleContent}
      isInitialOpen
    />
  );
}
