'use client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Icons, LinkButton } from '@vertex-protocol/web-ui';
import { AppPromoBanner } from 'client/modules/app/components/AppPromoBanner';
import seiIcon from 'client/modules/app/components/SeiRewardsBanner/sei-monochrome.svg';

import bannerBg from 'client/modules/app/components/SeiRewardsBanner/sei-rewards-banner-bg.png';
import { ROUTES } from 'client/modules/app/consts/routes';
import { SEI_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import Image from 'next/image';
import Link from 'next/link';

export function SeiRewardsBanner({ className }: WithClassnames) {
  const isSei = useIsEnabledForChainIds(SEI_CHAIN_IDS);

  if (!isSei) {
    return null;
  }

  return (
    <AppPromoBanner
      className={className}
      disclosureKey="sei_season_3_rewards_banner"
      bgImageSrc={bannerBg}
      bgImageClassName="saturate-50"
    >
      <h2 className="text-text-primary">
        <Image src={seiIcon} alt="sei logo" className="inline size-4" />
        &nbsp;&nbsp;SEI Rewards Season 3 | Trade &amp; Earn SEI
      </h2>
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
