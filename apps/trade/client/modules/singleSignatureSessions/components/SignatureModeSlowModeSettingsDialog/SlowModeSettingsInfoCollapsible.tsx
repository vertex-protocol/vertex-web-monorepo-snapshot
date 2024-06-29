import { DiscList } from '@vertex-protocol/web-ui';
import { DialogInfoCollapsible } from 'client/components/DialogInfoCollapsible';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';

export function SlowModeSettingsInfoCollapsible() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const collapsibleContent = (
    <DiscList.Container>
      <DiscList.Item>
        Smart contract wallets, such as Safe and Argent, do not support EIP712
        signatures.
      </DiscList.Item>
      <DiscList.Item>
        To interact with the app, you must delegate a 1CT private key to sign
        transactions on your behalf. Enabling/disabling must be done on-chain
        and is subject to a fee of{' '}
        <span className="text-text-primary">1 {primaryQuoteToken.symbol}</span>.
      </DiscList.Item>
      <DiscList.Item>
        The key is stored locally and{' '}
        <span className="text-text-primary">never</span> leaves your device. It
        is recommended to use an auto-generated key or a key associated with an
        empty wallet.
      </DiscList.Item>
      <DiscList.Item>
        The key is only used to sign trades and withdrawals to the owner,{' '}
        <span className="text-text-primary">never</span> to a separate wallet.
      </DiscList.Item>
      <DiscList.Item>
        Store the key in a secure place. You will need it to setup 1CT on other
        devices. If 1CT was previously configured with the same private key, no
        transaction needs to occur and the fee of 1 {primaryQuoteToken.symbol}{' '}
        is <span className="text-text-primary">not</span> collected.
      </DiscList.Item>
    </DiscList.Container>
  );

  return (
    <DialogInfoCollapsible
      title="More Info"
      collapsibleContent={collapsibleContent}
    />
  );
}
