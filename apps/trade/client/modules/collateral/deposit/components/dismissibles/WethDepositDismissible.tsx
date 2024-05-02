import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'client/modules/brand/links';
import Link from 'next/link';
import { DepositInfoCardType } from '../../types';

export function WethDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  if (displayedInfoCardType !== 'weth') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="swap_weth"
      title="Looking to deposit ETH?"
      description={
        <div className="flex flex-col gap-y-2">
          <p>Only wETH deposits are supported, swap using the link below.</p>
          <LinkButton
            as={Link}
            href={LINKS.wrapEth}
            color="white"
            external
            className="w-fit"
          >
            Swap ETH for wETH
          </LinkButton>
        </div>
      }
    />
  );
}
