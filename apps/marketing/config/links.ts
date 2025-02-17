import { mapValues } from 'lodash';

export const SECTION_IDS = {
  hero: 'hero',
  whyVertex: 'why-vertex',
  multiChain: 'multi-chain',
  compare: 'compare',
  vrtx: 'vrtx',
  tools: 'tools',
};

const SECTION_TAGS = mapValues(SECTION_IDS, (id) => `/#${id}`);

const INTERNAL_LINKS = {
  termsOfService: 'https://vertexprotocol.com/docs/TermsOfUse.pdf',
  privacyPolicy: 'https://vertexprotocol.com/docs/PrivacyPolicy.pdf',
};

const EXTERNAL_LINKS = {
  app: 'https://app.vertexprotocol.com/markets',
  statsDashboard: 'https://stats.vertexprotocol.com/',
  edgeMarketing: 'https://edge.vertexprotocol.com/',
  edgeDocs: 'https://docs.vertexprotocol.com/getting-started/vertex-edge',
  apiDocs: 'https://docs.vertexprotocol.com/developer-resources/api',
  staking: 'https://app.vertexprotocol.com/staking',
  buyVRTX:
    'https://app.vertexprotocol.com/spot?market=VRTX-USDC&chain=arbitrum',
  docs: 'https://docs.vertexprotocol.com/',
  sdkDocs:
    'https://docs.vertexprotocol.com/developer-resources/vertex-typescript-sdk',
  bugBountyProgram: 'https://docs.vertexprotocol.com/more/bug-bounties',
  faq: 'https://docs.vertexprotocol.com/basics/faqs',
  blog: 'https://blog.vertexprotocol.com/',

  //Socials
  discord: 'https://discord.com/invite/vertexprotocol',
  twitter: 'https://x.com/vertex_protocol',

  // Exchanges
  bybit: 'https://www.bybit.com/en/trade/spot/VRTX/USDT',
  traderJoe:
    'https://lfj.gg/arbitrum/trade?outputCurrency=0x95146881b86b3ee99e63705ec87afe29fcc044d9',
  kucoin: 'https://www.kucoin.com/trade/VRTX-USDT',
  camelot:
    'https://info.camelot.exchange/pair/arbitrum-one/v3/0x3cf4cb6ce8cf3b147e6c444cf66526f5f0c16b92',
  htx: 'https://www.htx.com/trade/vrtx_usdt',
  gateIo: 'https://www.gate.io/trade/VRTX_USDT',
  mexc: 'https://www.mexc.com/exchange/VRTX_USDT',

  // Block explorers
  arbiscan:
    'https://arbiscan.io/token/0x95146881b86b3ee99e63705ec87afe29fcc044d9',
  etherscan:
    'https://etherscan.io/token/0xbbEE07B3e8121227AfCFe1E2B82772246226128e',
  baseScan:
    'https://basescan.org/address/0xFB0c734Fc3008683c5efF45bcf8128836C4D97D0',
  blast:
    'https://blastscan.io/address/0x6CD20f11470e9C9d1458a69c8f7B330B99577EF9',
  coinmarketcap: 'https://coinmarketcap.com/currencies/vertex-protocol/',
  coingecko: 'https://www.coingecko.com/en/coins/vertex-2',

  // Partners
  wintermute: 'https://wintermute.com/',
  selini: 'https://www.selinicapital.com/',
  hackVC: 'https://www.hack.vc/',
  gsr: 'https://www.gsr.io/',
  janeStreet: 'https://www.janestreet.com/',
  dexterity: 'https://dexterity.capital/',
  collabCurrency: 'https://www.collabcurrency.com/',
  hrt: 'https://www.hudsonrivertrading.com/',

  // Integrations
  elixir: 'https://www.elixir.xyz/',
  pear: 'https://www.pear.garden/',
  skatefi: 'https://www.skatefi.org/',
  axelar: 'https://www.axelar.network/',
  funXyz: 'https://fun.xyz/',
  notifi: 'https://notifi.network/',
  transak: 'https://transak.com/',
  chainlink: 'https://chain.link/',
  stork: 'https://stork.network/',

  // Misc
  liquidityLounge: 'https://t.me/LiquidityLounge',
  mediaKit:
    'https://drive.google.com/drive/folders/1F5Al-H2rQ5fnfrTeJK9NMqET_7_AuHSu',
  linktree: 'https://linktr.ee/vertex_protocol',
  design: 'https://altalogy.com',
  institutionalTg: 'https://t.me/Vertex_Institutional',
};

export const LINKS = {
  ...SECTION_TAGS,
  ...INTERNAL_LINKS,
  ...EXTERNAL_LINKS,
};
