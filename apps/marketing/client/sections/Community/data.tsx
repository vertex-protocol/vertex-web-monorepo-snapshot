import { DiscordLogo } from '@phosphor-icons/react/dist/ssr/DiscordLogo';
import { XLogo } from '@phosphor-icons/react/dist/ssr/XLogo';
import { YoutubeLogo } from '@phosphor-icons/react/dist/ssr/YoutubeLogo';
import { EXTERNAL_LINKS } from 'client/consts';

interface SocialLink {
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
    href: EXTERNAL_LINKS.discord,
    startIcon: <DiscordLogo weight="fill" size={24} />,
  },
  {
    href: EXTERNAL_LINKS.youtube,
    startIcon: <YoutubeLogo weight="fill" size={24} />,
  },
  {
    href: EXTERNAL_LINKS.x,
    startIcon: <XLogo weight="fill" size={24} />,
  },
];

export const NEWS_LINKS: NewsLink[] = [
  {
    date: '2024-08-22',
    href: 'https://www.onchaintimes.com/vertex-edge-in-the-market/',
    title: 'OnChain Times Vertex Report',
  },
  {
    date: '2024-07-16',
    href: 'https://revelointel.com/industry-intel/vertex-edge/',
    title: 'Revelo Industry Intel Report -- Vertex Edge',
  },
  {
    date: '2024-06-13',
    href: 'https://forum.arbitrum.foundation/t/stip-analysis-ardc-research-deliverables/23438/5',
    title: 'Blockworks: Arbitrum DAO STIP Retroactive Analysis',
  },
];
