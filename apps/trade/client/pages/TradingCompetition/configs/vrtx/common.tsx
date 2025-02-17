import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import heroImageDesktop from 'client/pages/TradingCompetition/configs/assets/vertex/hero/hero-desktop.png';
import heroImageMobile from 'client/pages/TradingCompetition/configs/assets/vertex/hero/hero-mobile.png';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';

export const commonConfig: Omit<
  TradingCompetitionConfig,
  'chainEnv' | 'contestIds' | 'tierDataByContestId'
> = {
  docsHref: VERTEX_SPECIFIC_LINKS.vrtxTradingCompetitionDocs,
  totalPrizePoolHeroImage: {
    mobileSrc: heroImageMobile,
    desktopSrc: heroImageDesktop,
    alt: 'Total prize pool is 20k USDC',
  },
  totalPrizePool: [{ amount: '20k', symbol: 'USDC' }],
  eligibilityRequirement: { eligibilityType: 'account_value' },
};
