import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import heroImageDesktop from 'client/pages/TradingCompetition/configs/assets/sei/hero/hero-desktop.png';
import heroImageMobile from 'client/pages/TradingCompetition/configs/assets/sei/hero/hero-mobile.png';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';

export const commonConfig: Omit<
  TradingCompetitionConfig,
  'chainEnv' | 'contestIds' | 'tierDataByContestId'
> = {
  docsHref: VERTEX_SPECIFIC_LINKS.seiTradingCompetitionDocs,
  totalPrizePoolHeroImage: {
    mobileSrc: heroImageMobile,
    desktopSrc: heroImageDesktop,
    alt: 'Prize is 50k SEI',
  },
  totalPrizePool: [{ amount: '50k', symbol: 'SEI' }],
};
