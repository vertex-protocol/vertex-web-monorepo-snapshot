import Image from 'next/image';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { joinClassNames } from '@vertex-protocol/web-common';

export function TradingCompetitionPrizeHero() {
  const {
    config: { prizeHeroImage },
    currentContestStatus,
  } = useTradingCompetitionContext();
  const isMobile = useIsMobile();

  const { mobileSrc, desktopSrc, alt } = prizeHeroImage;

  return (
    <Image
      className={joinClassNames(
        'h-auto w-full rounded-lg object-cover',
        currentContestStatus === 'done' && 'grayscale',
      )}
      src={isMobile ? mobileSrc : desktopSrc}
      alt={alt}
      quality={100}
      priority
    />
  );
}
