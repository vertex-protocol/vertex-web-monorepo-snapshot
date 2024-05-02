import { WithClassnames } from '@vertex-protocol/web-common';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'client/modules/brand/links';
import Link from 'next/link';

export function BridgeDismissible({ className }: WithClassnames) {
  return (
    <UserDisclosureDismissibleCard
      className={className}
      disclosureKey="cross_chain_deposit"
      title="Cross-Chain Deposits are here!"
      description={
        <div className="flex flex-col gap-y-1.5">
          <span>Deposit into your account from other chains.</span>
          <span>
            See{' '}
            <LinkButton
              as={Link}
              href={LINKS.crossChainDocs}
              external
              color="white"
            >
              here
            </LinkButton>{' '}
            to learn more.
          </span>
        </div>
      }
    />
  );
}
