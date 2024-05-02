import { EXTERNAL_LINKS, SECTION_IDS } from 'client/consts';

export const NAV_LINKS: {
  title: string;
  href: string;
  external?: boolean;
}[] = [
  {
    title: 'Products',
    href: SECTION_IDS.products,
  },
  {
    title: 'Community',
    href: SECTION_IDS.community,
  },
  {
    title: 'Developers',
    href: SECTION_IDS.developers,
  },
  {
    title: 'Docs',
    href: EXTERNAL_LINKS.docs,
    external: true,
  },
];
