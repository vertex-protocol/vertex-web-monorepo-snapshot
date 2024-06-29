import { ROUTES } from 'client/modules/app/consts/routes';
import { TradingCompetitionBlitzPrize as BlitzPrize } from 'client/pages/TradingCompetition/components/blitz/TradingCompetitionBlitzPrize';
import heroImageDesktop from 'client/pages/TradingCompetition/configs/blitz/hero-desktop.png';
import heroImageMobile from 'client/pages/TradingCompetition/configs/blitz/hero-mobile.png';
import { TradingCompetitionConfig } from 'client/pages/TradingCompetition/configs/types';
import { BLITZ_SPECIFIC_LINKS } from 'common/brandMetadata/links/blitzLinks';
import { range } from 'lodash';
import blitzLogo from 'public/blitz-icon.svg';
import { blast, blastSepolia } from 'wagmi/chains';

const PRIZE_POOL = [
  { amount: '100k', symbol: 'USDB' },
  { amount: '30k', symbol: 'GOLD' },
];

export const blitzConfig: TradingCompetitionConfig = {
  route: ROUTES.blitzTradingCompetition,
  routeName: 'Trading Competition',
  docsHref: BLITZ_SPECIFIC_LINKS.tradingCompetitionDocs,
  brandLogos: [blitzLogo],
  prizeHeroImage: {
    mobileSrc: heroImageMobile,
    desktopSrc: heroImageDesktop,
    alt: 'Prize is 100k USDB and 30k GOLD. Top 100 traders earn Gold ahead of Blast airdrop.',
  },
  hasPeriods: false,
  contestIdsByChainId: { [blast.id]: [1], [blastSepolia.id]: [2] },
  prizePoolByChainAndContestIds: {
    [blast.id]: { 1: PRIZE_POOL },
    [blastSepolia.id]: { 2: PRIZE_POOL },
  },
  rankType: 'roi',
  participantPrizes: [
    <BlitzPrize key={0} usdbAmount={20000} goldAmount={2000} />,
    <BlitzPrize key={1} usdbAmount={15000} goldAmount={1500} />,
    <BlitzPrize key={2} usdbAmount={12000} goldAmount={1250} />,
    <BlitzPrize key={3} usdbAmount={8000} goldAmount={1000} />,
    <BlitzPrize key={4} usdbAmount={6000} goldAmount={750} />,
    <BlitzPrize key={5} usdbAmount={4500} goldAmount={500} />,
    <BlitzPrize key={6} usdbAmount={3500} goldAmount={500} />,
    <BlitzPrize key={7} usdbAmount={2500} goldAmount={500} />,
    <BlitzPrize key={8} usdbAmount={2000} goldAmount={500} />,
    <BlitzPrize key={9} usdbAmount={1500} goldAmount={500} />,
    ...range(10, 20).map((_, i) => (
      <BlitzPrize key={i} usdbAmount={1000} goldAmount={400} />
    )),
    ...range(20, 30).map((_, i) => (
      <BlitzPrize key={i} usdbAmount={750} goldAmount={350} />
    )),
    ...range(30, 40).map((_, i) => (
      <BlitzPrize key={i} usdbAmount={500} goldAmount={300} />
    )),
    ...range(40, 50).map((_, i) => (
      <BlitzPrize key={i} usdbAmount={250} goldAmount={250} />
    )),
    ...range(50, 60).map((_, i) => <BlitzPrize key={i} goldAmount={200} />),
    ...range(60, 70).map((_, i) => <BlitzPrize key={i} goldAmount={150} />),
    ...range(70, 80).map((_, i) => <BlitzPrize key={i} goldAmount={100} />),
    ...range(80, 100).map((_, i) => <BlitzPrize key={i} goldAmount={50} />),
  ],
};
