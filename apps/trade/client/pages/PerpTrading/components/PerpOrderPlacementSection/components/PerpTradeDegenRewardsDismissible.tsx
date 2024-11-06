import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { LinkButton } from '@vertex-protocol/web-ui';
import Link from 'next/link';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { BASE_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { KNOWN_PRODUCT_IDS } from '@vertex-protocol/metadata';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';

interface Props {
  productId: number | undefined;
}

export function PerpTradeDegenRewardsDismissible({ productId }: Props) {
  const isBase = useIsEnabledForChainIds(BASE_CHAIN_IDS);

  if (!isBase || productId !== KNOWN_PRODUCT_IDS.degenPerp) {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="base_trade_degen_rewards"
      title="DEGEN Rewards"
      description={
        <div className="text-text-secondary text-2xs flex flex-col items-start gap-y-2">
          <p>Trade DEGEN-PERP and earn DEGEN incentives.</p>
          <LinkButton
            as={Link}
            colorVariant="primary"
            external
            withExternalIcon
            href={VERTEX_SPECIFIC_LINKS.degenRewardsDetails}
          >
            Details
          </LinkButton>
        </div>
      }
    />
  );
}
