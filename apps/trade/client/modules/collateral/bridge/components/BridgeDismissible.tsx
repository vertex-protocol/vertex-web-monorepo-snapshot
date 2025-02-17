import { WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { LINKS } from 'common/brandMetadata/links/links';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';

export function BridgeDismissible({ className }: WithClassnames) {
  const isSmartContractWallet = useIsSmartContractWalletConnected();

  return (
    <UserDisclosureDismissibleCard
      className={className}
      disclosureKey="cross_chain_deposit"
      title="Cross-Chain Deposits are here!"
      description={
        <div className="flex flex-col gap-y-1.5">
          <p>
            Deposit into your account from other chains. See the{' '}
            <LinkButton
              as={Link}
              href={LINKS.crossChainDocs}
              external
              colorVariant="primary"
            >
              tutorial
            </LinkButton>{' '}
            to learn more.
          </p>
          {isSmartContractWallet && (
            <p className="text-warning">
              It looks like you are using a smart contract wallet. Please ensure
              that your wallet is compatible with the destination chain.
              {clientEnv.brandMetadata.displayName} is not responsible for loss
              of funds as a result of bridging to an invalid chain.
            </p>
          )}
        </div>
      }
    />
  );
}
