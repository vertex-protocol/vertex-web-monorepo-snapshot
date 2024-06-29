import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { IMAGES } from 'common/brandMetadata/images';

import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { PointsPageCard } from 'client/pages/BlitzPoints/components/PointsPageCard';
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
      bgImage={IMAGES.brandBg}
      className={joinClassNames('ring-accent flex flex-col gap-y-5', className)}
    >
      <ValueWithLabel.Vertical
        sizeVariant="lg"
        label={
          <>
            <Image src={IMAGES.brandLogo} alt="blitz" className="h-3 w-auto" />
            Points
          </>
        }
        labelClassName="flex items-center gap-x-1"
        value={totalPoints}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        valueClassName="sm:text-5xl"
      />
      <Divider />
      <div className="flex flex-col gap-y-4">
        <h4 className="text-text-secondary text-sm">Breakdown</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <ValueWithLabel.Vertical
            label="Trading Points"
            value={tradingPoints}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            tooltip={{ id: 'pointsTradingPoints' }}
          />
          <ValueWithLabel.Vertical
            label="Referral Points"
            value={referralPoints}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            tooltip={{ id: 'pointsReferralPoints' }}
          />
          <ValueWithLabel.Vertical
            label="Initial Points"
            valueContent={
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
            tooltip={{ id: 'pointsInitialPoints' }}
          />
        </div>
      </div>
    </PointsPageCard>
  );
}
