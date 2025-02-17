import { BLITZ_COMMON_LINKS } from 'common/brandMetadata/links/blitzLinks';
import { VERTEX_COMMON_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { clientEnv } from 'common/environment/clientEnv';

const SHARED_LINKS = {
  edge: 'https://edge.vertexprotocol.com/',
  elixir: 'https://app.elixir.finance/',
  zenDesk: 'https://vertexprotocol.zendesk.com/hc/en-us/requests/new',
  ethWallets: 'https://ethereum.org/en/wallets/find-wallet/',
  feb13DelistInfo:
    'https://discord.com/channels/944256846628266024/1108325256327868446/1338686338312044605',
  kado: 'https://kado.money',
  skateFi: 'https://app.skatefi.org/',
  transak: 'https://transak.com',
  twitterTweet: 'https://twitter.com/compose/tweet',
  unlimit: 'https://unlimit.com',
  stats: 'https://stats.vertexprotocol.com',
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
