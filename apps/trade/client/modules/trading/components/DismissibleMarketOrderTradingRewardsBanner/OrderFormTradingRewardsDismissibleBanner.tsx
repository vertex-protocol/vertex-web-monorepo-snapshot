import { DisclosureDismissibleCard, LinkButton } from '@vertex-protocol/web-ui';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import vertexRewardsTradingBannerBg from 'client/modules/trading/components/DismissibleMarketOrderTradingRewardsBanner/vertex-rewards-trading-banner-bg.png';

export function OrderFormTradingRewardsDismissibleBanner() {
  const { shouldShow, dismiss } = useShowUserDisclosure(
    'trading_market_order_rewards',
  );

  if (!shouldShow) return null;

  const descriptionContent = (
    <>
      <Image
        src={vertexRewardsTradingBannerBg}
        alt=""
        fill
        sizes="100vw"
        className="-z-[1]"
      />
      <div className="text-text-primary text-2xs isolate">
        Market orders earn rewards.{' '}
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={VERTEX_SPECIFIC_LINKS.rewardsDocs}
          external
          withExternalIcon
        >
          Learn More
        </LinkButton>
      </div>
    </>
  );

  return (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <DisclosureDismissibleCard
        onDismiss={dismiss}
        className="relative z-[1] overflow-hidden"
        title="Trade & Earn"
        description={descriptionContent}
      />
    </BrandSpecificContent>
  );
}
