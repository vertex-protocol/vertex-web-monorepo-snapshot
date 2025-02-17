import { LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function WseiDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  if (displayedInfoCardType !== 'wrap_wsei') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="swap_wsei"
      title="Looking to deposit SEI?"
      description={
        <div className="flex flex-col gap-y-2">
          <p>
            Only wSEI deposits are supported. Swap SEI to wSEI via the link
            below.
          </p>
          <LinkButton
            colorVariant="primary"
            className="w-fit"
            as={Link}
            href={VERTEX_SPECIFIC_LINKS.wrapSei}
            external
          >
            Swap SEI to wSEI
          </LinkButton>
        </div>
      }
    />
  );
}
