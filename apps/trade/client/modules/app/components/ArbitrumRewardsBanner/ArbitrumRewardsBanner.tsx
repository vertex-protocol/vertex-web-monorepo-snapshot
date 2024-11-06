'use client';

import { WithClassnames } from '@vertex-protocol/web-common';
import { Icons, LinkButton } from '@vertex-protocol/web-ui';
import { AppPromoBanner } from 'client/modules/app/components/AppPromoBanner';

import bannerBg from 'client/modules/app/components/ArbitrumRewardsBanner/arbitrum-rewards-banner-bg.png';
import { ROUTES } from 'client/modules/app/consts/routes';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import Link from 'next/link';

export function ArbitrumRewardsBanner({ className }: WithClassnames) {
  const isArb = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  if (!isArb) {
    return null;
  }

  return (
    <AppPromoBanner
      className={className}
      disclosureKey="arbitrum_rewards_banner"
      bgImageSrc={bannerBg}
    >
      <h2 className="text-text-primary">Trade to Earn VRTX Rewards 🤑</h2>
      <LinkButton
        colorVariant="primary"
        as={Link}
        href={ROUTES.rewards}
        endIcon={<Icons.ArrowRight className="size-4" />}
      >
        Go to Rewards
      </LinkButton>
    </AppPromoBanner>
  );
}
