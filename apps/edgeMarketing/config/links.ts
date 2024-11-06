interface DescriptionLinkItem {
  label: string;
  url: string;
}

export const LINKS = {
  x: 'https://twitter.com/EdgeLayer',
  blog: 'https://medium.com/@vertex_edge',
  cookiePolicy: '/docs/CookiePolicy.pdf',
  docs: 'https://docs.vertexprotocol.com/getting-started/vertex-edge',
  dashboard:
    'https://flipsidecrypto.xyz/the_watchmen/vertex-edge---cross-chain-liquidity-HDYU-y?tabIndex=1',
  vertex: 'https://vertexprotocol.com',
  blitz: 'https://blitz.exchange',
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
