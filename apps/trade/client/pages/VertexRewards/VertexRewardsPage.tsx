import { LinkButton } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { VrtxCollapsibleSummaryCard } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/VrtxCollapsibleSummaryCard';
import { ChainDependentRewardsCards } from 'client/pages/VertexRewards/components/ChainDependentRewardsCards';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export default function VertexRewardsPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <AppPage.EarnHeader
        title="Rewards"
        description={
          <>
            Learn more about Vertex Rewards Program in{' '}
            <LinkButton
              as={Link}
              colorVariant="primary"
              href={VERTEX_SPECIFIC_LINKS.rewardsDocs}
              external
              withExternalIcon
            >
              Rewards Docs
            </LinkButton>
          </>
        }
      />
      <VrtxCollapsibleSummaryCard />
      <ChainDependentRewardsCards />
    </AppPage.Content>
  );
}
