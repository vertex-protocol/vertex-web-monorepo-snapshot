import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import heroImageDesktop from 'client/pages/TradingCompetition/configs/assets/blitz/hero/hero-desktop.png';
import heroImageMobile from 'client/pages/TradingCompetition/configs/assets/blitz/hero/hero-mobile.png';
import { BLITZ_SPECIFIC_LINKS } from 'common/brandMetadata/links/blitzLinks';

export const commonConfig: Omit<
  TradingCompetitionConfig,
  'chainEnv' | 'contestIds' | 'tierDataByContestId'
> = {
  docsHref: BLITZ_SPECIFIC_LINKS.tradingCompetitionDocs,
  totalPrizePoolHeroImage: {
    mobileSrc: heroImageMobile,
    desktopSrc: heroImageDesktop,
    alt: 'Prize is ~12.6 GOLD',
  },
  totalPrizePool: [{ amount: '~12.6k', symbol: 'GOLD' }],
};
