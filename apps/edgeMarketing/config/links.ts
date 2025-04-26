interface DescriptionLinkItem {
  label: string;
  url: string;
}

export const LINKS = {
  x: 'https://twitter.com/EdgeLayer',
  blog: 'https://medium.com/@vertex_edge',
  cookiePolicy: '/docs/CookiePolicy.pdf',
  docs: 'https://docs.vertexprotocol.com/getting-started/vertex-edge',
  dashboard: 'https://stats.vertexprotocol.com/',
  vertex: 'https://vertexprotocol.com',
  blitz: 'https://blitz.exchange',
  broTrade: 'https://bro.trade',
  termsOfUse: '/docs/TermsOfUse.pdf',
};

/** @todo need to update a docs link when it will be available */
export const DESCRIPTION_LINKS: DescriptionLinkItem[] = [
  {
    label: 'X',
    url: LINKS.x,
  },
  {
    label: 'Blog',
    url: LINKS.blog,
  },
  {
    label: 'Docs',
    url: LINKS.docs,
  },
];
