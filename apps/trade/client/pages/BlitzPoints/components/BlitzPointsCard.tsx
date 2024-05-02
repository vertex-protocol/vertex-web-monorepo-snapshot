import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { BLITZ_SPECIFIC_IMAGES, IMAGES } from 'client/modules/brand/images';

import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { PointsPageCard } from 'client/pages/BlitzPoints/components/PointsPageCard';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import Image from 'next/image';

interface Props extends WithClassnames {
  totalPoints: BigDecimal | undefined;
  tradingPoints: BigDecimal | undefined;
  referralPoints: BigDecimal | undefined;
  initialPoints: BigDecimal | undefined;
  hasClaimedInitialPoints: boolean;
  hasInitialPoints: boolean;
}

export function BlitzPointsCard({
  totalPoints,
  tradingPoints,
  referralPoints,
  initialPoints,
  hasClaimedInitialPoints,
  hasInitialPoints,
  className,
}: Props) {
  const showInitialPoints = hasClaimedInitialPoints || !hasInitialPoints;

  return (
    <PointsPageCard
      bgImage={BLITZ_SPECIFIC_IMAGES.blitzBrandBg}
      className={joinClassNames('ring-accent flex flex-col gap-y-5', className)}
    >
      <RewardsCard.MetricStackedItem
        value={totalPoints}
        formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        label={
          <div className="flex items-center gap-x-1">
            <Image src={IMAGES.brandLogo} alt="blitz" className="h-3 w-auto" />
            Points
          </div>
        }
        valueClassName="text-2xl sm:text-5xl"
      />
      <Divider />
      <div className="flex flex-col gap-y-4">
        <h4 className="text-text-secondary text-sm">Breakdown</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <RewardsCard.MetricStackedItem
            value={tradingPoints}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            label="Trading Points"
            labelClassName="text-text-tertiary"
            definitionId="pointsTradingPoints"
          />
          <RewardsCard.MetricStackedItem
            value={referralPoints}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            label="Referral Points"
            labelClassName="text-text-tertiary"
            definitionId="pointsReferralPoints"
          />
          <RewardsCard.StackedItem
            value={
              showInitialPoints ? (
                formatNumber(initialPoints, {
                  formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
                })
              ) : (
                <div>
                  <PrivateContent isPrivate className="inline">
                    dontpeek
                  </PrivateContent>{' '}
                  <span className="text-text-tertiary text-xs">Unclaimed</span>
                </div>
              )
            }
            label="Initial Points"
            labelClassName="text-text-tertiary"
            definitionId="pointsInitialPoints"
          />
        </div>
      </div>
    </PointsPageCard>
  );
}
