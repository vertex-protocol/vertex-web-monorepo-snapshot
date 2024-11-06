import { BLITZ_COMMON_LINKS } from 'common/brandMetadata/links/blitzLinks';
import { VERTEX_COMMON_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { clientEnv } from 'common/environment/clientEnv';

const SHARED_LINKS = {
  edge: 'https://edge.vertexprotocol.com/',
  elixir: 'https://app.elixir.finance/',
  ethWallets: 'https://ethereum.org/en/wallets/find-wallet/',
  kado: 'https://kado.money',
  perpsAi: 'https://perps.ai/',
  skateFi: 'https://app.skatefi.org/',
  transak: 'https://transak.com',
  twitterTweet: 'https://twitter.com/compose/tweet',
  unlimit: 'https://unlimit.com',
};

const LINKS_BY_BRAND_NAME = {
  vertex: {
    ...VERTEX_COMMON_LINKS,
    ...SHARED_LINKS,
  },
  blitz: {
    ...BLITZ_COMMON_LINKS,
    ...SHARED_LINKS,
  },
};

export const LINKS = LINKS_BY_BRAND_NAME[clientEnv.base.brandName];
