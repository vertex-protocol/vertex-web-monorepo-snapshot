import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { DiscList } from '@vertex-protocol/web-ui';
import { CollapsibleInfoCard } from 'client/components/CollapsibleInfoCard';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { clientEnv } from 'common/environment/clientEnv';

export function SlowModeSettingsInfoCollapsible() {
  const { primaryQuoteToken } = useVertexMetadataContext();

  const collapsibleContent = (
    <div className="flex flex-col gap-y-2">
      <p>
        Smart contract wallets, such as Coinbase Wallet, Abstract Global Wallet,
        and Safe, require 1-Click Trading to interact with the app.
      </p>
      <DiscList.Container>
        <DiscList.Item>
          Generate a private key, or paste one that you have generated
          previously.{' '}
          <span className="text-text-primary font-bold">
            Save the key in a secure place
          </span>
          .
        </DiscList.Item>
        <DiscList.Item>
          Enabling 1CT with a new key requires a 1-time fee of{' '}
          <span className="text-text-primary font-bold">
            {SEQUENCER_FEE_AMOUNT_USDC} {primaryQuoteToken.symbol}
          </span>
          . The fee is deducted from your wallet, not{' '}
          {clientEnv.brandMetadata.displayName} account.
        </DiscList.Item>
      </DiscList.Container>
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
