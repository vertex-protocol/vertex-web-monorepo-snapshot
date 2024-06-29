// We can't use Image element from nextjs here. It won't generate images properly.
/* eslint-disable @next/next/no-img-element */
import { BigDecimal } from '@vertex-protocol/utils';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { signDependentValue } from 'client/utils/signDependentValue';
import { SocialSharingTheme } from '../hooks/socialSharingConfig';
import { SocialSharingMarketInfo } from './SocialSharingMarketInfo';
import { SocialSharingMetric } from './SocialSharingMetric';
import { SocialSharingPnlInfo } from './SocialSharingPnlInfo';

type Props = {
  isRealized: boolean;
  onBackgroundImageLoad: () => void;
  onTokenIconLoad: () => void;
  priceIncrement: BigDecimal;
  marketName: string;
  iconUrl: string;
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
  iconUrl,
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
            iconUrl={iconUrl}
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
