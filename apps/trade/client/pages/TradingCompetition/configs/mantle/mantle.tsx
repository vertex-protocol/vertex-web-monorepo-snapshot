import mantleLogo from 'client/assets/chains/mantle.svg';
import { ROUTES } from 'client/modules/app/consts/routes';
import vertexLogo from 'client/modules/app/navBar/earn/assets/stake-logo.svg';
import { TradingCompetitionMantlePageBgImage } from 'client/pages/TradingCompetition/components/mantle/TradingCompetitionMantlePageBgImage/TradingCompetitionMantlePageBgImage';
import heroImageDesktop from 'client/pages/TradingCompetition/configs/mantle/hero-desktop.png';
import heroImageMobile from 'client/pages/TradingCompetition/configs/mantle/hero-mobile.png';
import { TradingCompetitionConfig } from 'client/pages/TradingCompetition/configs/types';
import { getParticipantPrizeTableElement } from 'client/pages/TradingCompetition/configs/utils';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { range } from 'lodash';
import { mantle, mantleSepoliaTestnet } from 'viem/chains';

const PRIZE_POOL = [{ amount: '20,000', symbol: 'MNT' }];

export const mantleConfig: TradingCompetitionConfig = {
  route: ROUTES.mantleTradingCompetition,
  routeName: 'Trading Competition Series',
  docsHref: VERTEX_SPECIFIC_LINKS.tradingCompetitionDocs,
  brandLogos: [vertexLogo, mantleLogo],
  pageBgImage: <TradingCompetitionMantlePageBgImage />,
  prizeHeroImage: {
    mobileSrc: heroImageMobile,
    desktopSrc: heroImageDesktop,
    alt: 'Round 1 prize is 75K MNT',
  },
  hasPeriods: true,
  periodLabel: 'Round',
  contestIdsByChainId: {
    [mantle.id]: [1, 2, 3, 4, 5],
    [mantleSepoliaTestnet.id]: [7, 8, 9, 10, 11],
  },
  prizePoolByChainAndContestIds: {
    [mantle.id]: {
      1: PRIZE_POOL,
      2: PRIZE_POOL,
      3: PRIZE_POOL,
      4: PRIZE_POOL,
      5: PRIZE_POOL,
    },
    [mantleSepoliaTestnet.id]: {
      7: PRIZE_POOL,
      8: PRIZE_POOL,
      9: PRIZE_POOL,
      10: PRIZE_POOL,
      11: PRIZE_POOL,
    },
  },
  rankType: 'roi',
  participantPrizes: [
    // Top 10
    ...[4000, 3000, 2400, 1600, 1200, 900, 700, 500, 400, 300].map((amount) =>
      getParticipantPrizeTableElement(amount, 'MNT'),
    ),
    ...range(10, 20).map(() => getParticipantPrizeTableElement(200, 'MNT')),
    ...range(20, 30).map(() => getParticipantPrizeTableElement(150, 'MNT')),
    ...range(30, 40).map(() => getParticipantPrizeTableElement(100, 'MNT')),
    ...range(40, 50).map(() => getParticipantPrizeTableElement(50, 'MNT')),
  ],
};
