import { LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function WsDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  if (displayedInfoCardType !== 'wrap_ws') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="swap_ws"
      title="Looking to deposit S?"
      description={
        <div className="flex flex-col gap-y-2">
          <p>
            Only wS deposits are supported. Swap S to wS via the link below.
          </p>
          <LinkButton
            colorVariant="primary"
            className="w-fit"
            as={Link}
            href={VERTEX_SPECIFIC_LINKS.wrapSonic}
            external
            withExternalIcon
          >
            Swap S to wS
          </LinkButton>
        </div>
      }
    />
  );
}
