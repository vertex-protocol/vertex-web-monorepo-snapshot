'use client';
import { KNOWN_PRODUCT_IDS } from '@vertex-protocol/metadata';
import { WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { get } from 'lodash';
import Link from 'next/link';
import bannerBg from 'client/modules/app/components/BaseTradeDegenRewardsBanner/base-trade-degen-rewards-banner-bg.png';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { BASE_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { AppPromoBanner } from 'client/modules/app/components/AppPromoBanner';

export function BaseTradeDegenRewardsBanner({ className }: WithClassnames) {
  const isBase = useIsEnabledForChainIds(BASE_CHAIN_IDS);

  const productTradingLinks = useProductTradingLinks();

  if (!isBase) {
    return null;
  }

  return (
    <AppPromoBanner
      className={className}
      disclosureKey="base_trade_degen_rewards"
      bgImageSrc={bannerBg}
      bgImageClassName="saturate-50"
    >
      <h2 className="text-text-primary">
        Trade{' '}
        <LinkButton
          as={Link}
          colorVariant="primary"
          href={
            get(productTradingLinks, KNOWN_PRODUCT_IDS.degenPerp, undefined)
              ?.link ?? ''
          }
        >
          DEGEN-PERP
        </LinkButton>{' '}
        to earn DEGEN.
      </h2>
      <LinkButton
        colorVariant="primary"
        as={Link}
        href={VERTEX_SPECIFIC_LINKS.degenRewardsDetails}
        external
        withExternalIcon
      >
        Details
      </LinkButton>
    </AppPromoBanner>
  );
}
