import { EXTERNAL_LINKS } from 'client/consts';

export interface FooterLinkProps {
  href: string;
  label: string;
}

export const FOOTER_LINKS: FooterLinkProps[] = [
  {
    href: EXTERNAL_LINKS.docs,
    label: 'Docs',
  },
  {
    href: EXTERNAL_LINKS.termsOfUse,
    label: 'Terms of Service',
  },
  {
    href: EXTERNAL_LINKS.privacy,
    label: 'Privacy Policy',
  },
  {
    href: EXTERNAL_LINKS.mediaKit,
    label: 'Media Kit',
  },
  {
    href: EXTERNAL_LINKS.discord,
    label: 'Discord',
  },
  {
    href: EXTERNAL_LINKS.x,
    label: 'X',
  },
  {
    href: EXTERNAL_LINKS.blog,
    label: 'Blog',
  },
  {
    href: EXTERNAL_LINKS.ambassadors,
    label: 'Ambassadors',
  },
];
