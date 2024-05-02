import { VERTEX_COMMON_LINKS } from './vertexLinks';
import { BLITZ_COMMON_LINKS } from './blitzLinks';

const SHARED_LINKS = {
  elixir: 'https://app.elixir.finance/',
  kado: 'https://kado.money',
  transak: 'https://transak.com',
  twitterTweet: 'https://twitter.com/compose/tweet',
  unlimit: 'https://unlimit.com',
  edge: 'https://edge.vertexprotocol.com/',
};

export const VERTEX_LINKS = {
  ...SHARED_LINKS,
  ...VERTEX_COMMON_LINKS,
};

export const BLITZ_LINKS = {
  ...SHARED_LINKS,
  ...BLITZ_COMMON_LINKS,
};
