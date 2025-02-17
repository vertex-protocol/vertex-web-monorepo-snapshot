import { LINKS } from 'config/links';

type Data = {
  title?: string;
  links: { href: string; text: string }[];
};

/**
 * Data for the footer section of the marketing website.
 * Organizes navigation links into sections for developers and community.
 */
export const FOOTER_DATA: Data[] = [
  {
    title: 'Developers',
    links: [
      { href: LINKS.docs, text: 'Docs' },
      { href: LINKS.apiDocs, text: 'Vertex API' },
      { href: LINKS.sdkDocs, text: 'Vertex SDKs' },
      { href: LINKS.bugBountyProgram, text: 'Bug Bounty program' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: LINKS.liquidityLounge, text: 'Liquidity Lounge' },
      { href: LINKS.mediaKit, text: 'Media Kit' },
      { href: LINKS.linktree, text: 'Linktree' },
      { href: LINKS.discord, text: 'Discord' },
    ],
  },
  {
    links: [
      { href: LINKS.twitter, text: 'X' },
      { href: LINKS.blog, text: 'Blog' },
      { href: LINKS.faq, text: 'FAQ' },
      { href: LINKS.statsDashboard, text: 'Stats Dashboard' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: LINKS.termsOfService, text: 'Terms of Service' },
      { href: LINKS.privacyPolicy, text: 'Privacy Policy' },
    ],
  },
] as const;
