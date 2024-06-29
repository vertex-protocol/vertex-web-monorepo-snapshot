import { joinClassNames } from '@vertex-protocol/web-common';
import { LinkButton } from 'client/components/LinkButton';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import {
  ARB_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { ArbRewardsPageContent } from 'client/pages/VertexRewards/components/ArbRewardsPageContent';
import { MantleRewardsPageContent } from 'client/pages/VertexRewards/components/MantleRewardsPageContent';
import Link from 'next/link';

export function VertexRewardsPage() {
  // Rewards are chain specific
  const showArbContent = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showMantleContent = useIsEnabledForChainIds(MANTLE_CHAIN_IDS);

  const pageContent = (() => {
    if (showArbContent) {
      return <ArbRewardsPageContent />;
    }
    if (showMantleContent) {
      return <MantleRewardsPageContent />;
    }
    return null;
  })();

  return (
    <AppPage.Root
      routeName="Rewards"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content className="max-w-[1100px]">
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
        {pageContent}
      </AppPage.Content>
    </AppPage.Root>
  );
}
