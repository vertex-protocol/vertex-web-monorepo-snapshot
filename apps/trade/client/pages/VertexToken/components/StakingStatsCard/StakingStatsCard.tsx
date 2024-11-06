import { VOVRTX_INFO } from '@vertex-protocol/metadata';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { StakingStatsCardContent } from 'client/pages/VertexToken/components/StakingStatsCard/StakingStatsCardContent';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

export function StakingStatsCard() {
  return (
    <RewardsCard.Container>
      <RewardsCard.Header
        contentWrapperClassName="flex items-center gap-x-2"
        endElement={
          <RewardsCard.HeaderLinkButton
            colorVariant="primary"
            as={Link}
            href={VERTEX_SPECIFIC_LINKS.stakeVrtxDocs}
            external
            withExternalIcon
          >
            Staking Guide
          </RewardsCard.HeaderLinkButton>
        }
      >
        <Image
          src={VOVRTX_INFO.icon.asset}
          alt={VOVRTX_INFO.symbol}
          className="h-10 w-auto"
        />
        Staking
      </RewardsCard.Header>
      <StakingStatsCardContent />
    </RewardsCard.Container>
  );
}
