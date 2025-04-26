// We can't use Image element from nextjs here. It won't generate images properly.
/* eslint-disable @next/next/no-img-element */
import {
  getMarketPriceFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { SocialSharingMarketInfo } from 'client/modules/socialSharing/components/SocialSharingMarketInfo';
import { SocialSharingMetric } from 'client/modules/socialSharing/components/SocialSharingMetric';
import { SocialSharingPnlInfo } from 'client/modules/socialSharing/components/SocialSharingPnlInfo';
import { SocialSharingTheme } from 'client/modules/socialSharing/hooks/socialSharingConfig';

type Props = {
  isRealized: boolean;
  onBackgroundImageLoad: () => void;
  onTokenIconLoad: () => void;
  priceIncrement: BigDecimal;
  marketName: string;
  iconSrc: NextImageSrc;
  amountForSide: BigDecimal;
  pnlFrac: BigDecimal;
  entryPrice: BigDecimal;
  referencePrice: BigDecimal;
  theme: SocialSharingTheme;
};

export function SocialSharingPreview({
  isRealized,
  onBackgroundImageLoad,
  onTokenIconLoad,
  priceIncrement,
  marketName,
  iconSrc,
  amountForSide,
  pnlFrac,
  entryPrice,
  referencePrice,
  theme,
}: Props) {
  const priceFormatSpecifier = getMarketPriceFormatSpecifier(priceIncrement);

  return (
    <>
      <img
        className="absolute inset-0 h-full w-full"
        onLoad={onBackgroundImageLoad}
        src={signDependentValue(pnlFrac, theme.backgroundImageSrc)}
        alt="Social Sharing Image"
      />

      {/* Content section */}
      <div className="text-text-primary absolute inset-0 flex flex-col justify-end gap-y-5 p-5 text-sm lg:gap-y-8">
        <div className="flex flex-col gap-y-3">
          <SocialSharingMarketInfo
            onLoad={onTokenIconLoad}
            marketName={marketName}
            iconSrc={iconSrc}
            amount={amountForSide}
          />
          <SocialSharingPnlInfo estimatedPnlFrac={pnlFrac} />
        </div>
        <div className="flex gap-x-3">
          <SocialSharingMetric
            label="Entry price"
            value={entryPrice}
            formatSpecifier={priceFormatSpecifier}
          />
          <SocialSharingMetric
            label={isRealized ? 'Exit price' : 'Oracle price'}
            value={referencePrice}
            formatSpecifier={priceFormatSpecifier}
          />
        </div>
      </div>
    </>
  );
}
