import { Card, Icons, TextButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import Image from 'next/image';
import Link from 'next/link';

import vertexRewardsBannerBg from 'client/modules/accountCenter/components/AccountCenterRewardsBanner/vertex-rewards-banner-bg.png';

export function AccountCenterRewardsBanner({
  onCloseDialog,
}: {
  onCloseDialog: () => void;
}) {
  return (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <Card className="relative overflow-hidden bg-transparent px-4 py-3">
        <Image
          className="-z-[1]"
          src={vertexRewardsBannerBg}
          alt=""
          fill
          sizes="100vw"
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-primary">💫 Trade &amp; Earn</span>
          <TextButton
            colorVariant="secondary"
            as={Link}
            onClick={onCloseDialog}
            href={ROUTES.rewards}
            className="flex items-center gap-x-1"
          >
            View Rewards
            <Icons.ArrowRight />
          </TextButton>
        </div>
      </Card>
    </BrandSpecificContent>
  );
}
