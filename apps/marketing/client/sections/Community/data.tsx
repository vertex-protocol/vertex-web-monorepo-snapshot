import { EXTERNAL_LINKS } from 'client/consts';
import { IoLogoTwitter } from 'react-icons/io';
import { SiDiscord, SiYoutube } from 'react-icons/si';

interface SocialLink {
  label: string;
  href: string;
  startIcon: React.ReactNode;
}

interface NewsLink {
  date: string;
  href: string;
  title: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Discord',
    href: EXTERNAL_LINKS.discord,
    startIcon: <SiDiscord size={16} />,
  },
  {
    label: 'YouTube',
    href: EXTERNAL_LINKS.youtube,
    startIcon: <SiYoutube size={16} />,
  },
  {
    label: 'Twitter',
    href: EXTERNAL_LINKS.twitter,
    startIcon: <IoLogoTwitter size={16} />,
  },
];

export const NEWS_LINKS: NewsLink[] = [
  {
    date: '2023-06-22',
    href: 'https://www.coindesk.com/business/2023/06/22/wintermute-backs-dex-vertex-protocol-in-strategic-investment/',
    title: 'Wintermute backs DEX Vertex Protocol in Strategic Investment',
  },
  {
    date: '2023-04-26',
    href: 'https://fortune.com/crypto/2023/04/26/decentralized-exchange-vertex-launches-arbitrum-jane-street/',
    title:
      'Decentralized exchange Vertex launches on Arbitrum with backing from Jane Street and Hudson...',
  },
  {
    date: '2023-05-09',
    href: 'https://www.coindesk.com/business/2023/03/08/crypto-trading-protocol-vertex-eyes-institutional-traders-on-arbitrum/',
    title:
      'Crypto Trading Protocol Vertex Eyes Institutional Traders on Arbitrum',
  },
];
