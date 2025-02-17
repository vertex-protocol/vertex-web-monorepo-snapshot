'use client';

import Image from 'next/image';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { joinClassNames } from '@vertex-protocol/web-common';

export function TradingCompetitionPrizeHero() {
  const {
    config: { totalPrizePoolHeroImage },
    currentContestStatus,
  } = useTradingCompetitionContext();
  const isMobile = useIsMobile();

  const { mobileSrc, desktopSrc, alt } = totalPrizePoolHeroImage;

  return (
    <Image
      className={joinClassNames(
        'h-auto w-full',
        currentContestStatus === 'done' && 'grayscale',
      )}
      src={isMobile ? mobileSrc : desktopSrc}
      alt={alt}
      quality={100}
      priority
    />
  );
}
