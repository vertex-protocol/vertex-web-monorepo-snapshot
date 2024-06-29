import { BLITZ_COMMON_LINKS } from 'common/brandMetadata/links/blitzLinks';
import { VERTEX_COMMON_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { clientEnv } from 'common/environment/clientEnv';

const SHARED_LINKS = {
  elixir: 'https://app.elixir.finance/',
  kado: 'https://kado.money',
  transak: 'https://transak.com',
  twitterTweet: 'https://twitter.com/compose/tweet',
  unlimit: 'https://unlimit.com',
  edge: 'https://edge.vertexprotocol.com/',
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
