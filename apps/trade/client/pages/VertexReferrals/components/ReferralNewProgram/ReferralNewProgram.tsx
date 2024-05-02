import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, Pill } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import Image from 'next/image';
import tiers from './assets/tiers.svg';

export function ReferralNewProgram() {
  const { primaryQuoteToken } = useVertexMetadataContext();

  const bgHighlightClassNames =
    'before:bg-overlay-accent/40 before:absolute before:-bottom-1/4 before:h-12 before:w-full before:rounded-full before:blur-3xl';

  return (
    <Card
      className={joinClassNames(
        'relative overflow-hidden',
        'flex flex-col items-center gap-y-6 sm:gap-y-8',
        'text-text-tertiary p-6 text-center',
        bgHighlightClassNames,
      )}
    >
      <div className="flex flex-col items-center gap-y-3">
        <Pill color="accent">Coming soon</Pill>
        <div className="text-text-primary text-xl sm:text-2xl">
          New Referral Program
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <p className="text-sm sm:text-base">
          Hang tight as we launch the new referrals program which will include
        </p>
        <div className="text-text-primary flex gap-x-8 text-base sm:text-xl">
          <div className="flex items-center gap-x-2">
            <Image src={tiers} className="h-6 w-auto" alt="Tiers" />
            Tiers
          </div>
          <div className="flex items-center gap-x-2">
            <Image
              className="h-6 w-auto"
              src={primaryQuoteToken.icon.asset}
              alt={primaryQuoteToken.symbol}
            />
            {PRIMARY_QUOTE_SYMBOL} Rewards
          </div>
        </div>
      </div>
      <p className="text-xs lg:text-sm">Come back to this page soon</p>
    </Card>
  );
}
