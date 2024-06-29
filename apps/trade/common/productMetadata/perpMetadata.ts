import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  ADA_PERP_MARKET_DETAILS,
  APE_PERP_MARKET_DETAILS,
  APT_PERP_MARKET_DETAILS,
  ARB_PERP_MARKET_DETAILS,
  ATOM_PERP_MARKET_DETAILS,
  AVAX_PERP_MARKET_DETAILS,
  BCH_PERP_MARKET_DETAILS,
  BLUR_PERP_MARKET_DETAILS,
  BNB_PERP_MARKET_DETAILS,
  BTC_PERP_MARKET_DETAILS,
  COMP_PERP_MARKET_DETAILS,
  CRV_PERP_MARKET_DETAILS,
  DOGE_PERP_MARKET_DETAILS,
  DOT_PERP_MARKET_DETAILS,
  DYDX_PERP_MARKET_DETAILS,
  ENA_PERP_MARKET_DETAILS,
  ETH_PERP_MARKET_DETAILS,
  FIL_PERP_MARKET_DETAILS,
  FTM_PERP_MARKET_DETAILS,
  GALA_PERP_MARKET_DETAILS,
  GM30_PERP_MARKET_DETAILS,
  GMMEME_PERP_MARKET_DETAILS,
  ICP_PERP_MARKET_DETAILS,
  IMX_PERP_MARKET_DETAILS,
  INJ_PERP_MARKET_DETAILS,
  JTO_PERP_MARKET_DETAILS,
  JUP_PERP_MARKET_DETAILS,
  LDO_PERP_MARKET_DETAILS,
  LINK_PERP_MARKET_DETAILS,
  LTC_PERP_MARKET_DETAILS,
  MATIC_PERP_MARKET_DETAILS,
  MEME_PERP_MARKET_DETAILS,
  MKR_PERP_MARKET_DETAILS,
  MNT_PERP_MARKET_DETAILS,
  MPEPE_PERP_MARKET_DETAILS,
  NEAR_PERP_MARKET_DETAILS,
  ONDO_PERP_MARKET_DETAILS,
  OP_PERP_MARKET_DETAILS,
  PYTH_PERP_MARKET_DETAILS,
  SEI_PERP_MARKET_DETAILS,
  SNX_PERP_MARKET_DETAILS,
  SOL_PERP_MARKET_DETAILS,
  STX_PERP_MARKET_DETAILS,
  SUI_PERP_MARKET_DETAILS,
  TIA_PERP_MARKET_DETAILS,
  TON_PERP_MARKET_DETAILS,
  TRX_PERP_MARKET_DETAILS,
  WIF_PERP_MARKET_DETAILS,
  WLD_PERP_MARKET_DETAILS,
  XRP_PERP_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { PerpProductMetadata } from 'common/productMetadata/types';

export const BTC_PERP_METADATA: PerpProductMetadata = {
  name: 'BTC-PERP',
  symbol: 'BTC',
  icon: TOKEN_ICONS.btc,
  marketName: 'BTC-PERP',
  marketDetails: BTC_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ETH_PERP_METADATA: PerpProductMetadata = {
  name: 'ETH-PERP',
  symbol: 'ETH',
  icon: TOKEN_ICONS.eth,
  marketName: 'ETH-PERP',
  marketDetails: ETH_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ARB_PERP_METADATA: PerpProductMetadata = {
  name: 'ARB-PERP',
  symbol: 'ARB',
  icon: TOKEN_ICONS.arb,
  marketName: 'ARB-PERP',
  marketDetails: ARB_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const BNB_PERP_METADATA: PerpProductMetadata = {
  name: 'BNB-PERP',
  symbol: 'BNB',
  icon: TOKEN_ICONS.bnb,
  marketName: 'BNB-PERP',
  marketDetails: BNB_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const MATIC_PERP_METADATA: PerpProductMetadata = {
  name: 'MATIC-PERP',
  symbol: 'MATIC',
  icon: TOKEN_ICONS.matic,
  marketName: 'MATIC-PERP',
  marketDetails: MATIC_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const SOL_PERP_METADATA: PerpProductMetadata = {
  name: 'SOL-PERP',
  symbol: 'SOL',
  icon: TOKEN_ICONS.sol,
  marketName: 'SOL-PERP',
  marketDetails: SOL_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const XRP_PERP_METADATA: PerpProductMetadata = {
  name: 'XRP-PERP',
  symbol: 'XRP',
  icon: TOKEN_ICONS.xrp,
  marketName: 'XRP-PERP',
  marketDetails: XRP_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const SUI_PERP_METADATA: PerpProductMetadata = {
  name: 'SUI-PERP',
  symbol: 'SUI',
  icon: TOKEN_ICONS.sui,
  marketName: 'SUI-PERP',
  marketDetails: SUI_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const OP_PERP_METADATA: PerpProductMetadata = {
  name: 'OP-PERP',
  symbol: 'OP',
  icon: TOKEN_ICONS.op,
  marketName: 'OP-PERP',
  marketDetails: OP_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const LTC_PERP_METADATA: PerpProductMetadata = {
  name: 'LTC-PERP',
  symbol: 'LTC',
  icon: TOKEN_ICONS.ltc,
  marketName: 'LTC-PERP',
  marketDetails: LTC_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const BCH_PERP_METADATA: PerpProductMetadata = {
  name: 'BCH-PERP',
  symbol: 'BCH',
  icon: TOKEN_ICONS.bch,
  marketName: 'BCH-PERP',
  marketDetails: BCH_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const COMP_PERP_METADATA: PerpProductMetadata = {
  name: 'COMP-PERP',
  symbol: 'COMP',
  icon: TOKEN_ICONS.comp,
  marketName: 'COMP-PERP',
  marketDetails: COMP_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const APT_PERP_METADATA: PerpProductMetadata = {
  name: 'APT-PERP',
  symbol: 'APT',
  icon: TOKEN_ICONS.apt,
  marketName: 'APT-PERP',
  marketDetails: APT_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const MKR_PERP_METADATA: PerpProductMetadata = {
  name: 'MKR-PERP',
  symbol: 'MKR',
  icon: TOKEN_ICONS.mkr,
  marketName: 'MKR-PERP',
  marketDetails: MKR_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const MPEPE_PERP_METADATA: PerpProductMetadata = {
  name: 'mPEPE-PERP',
  symbol: 'mPEPE',
  icon: TOKEN_ICONS.pepe,
  marketName: 'mPEPE-PERP',
  marketDetails: MPEPE_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const DOGE_PERP_METADATA: PerpProductMetadata = {
  name: 'DOGE-PERP',
  symbol: 'DOGE',
  icon: TOKEN_ICONS.doge,
  marketName: 'DOGE-PERP',
  marketDetails: DOGE_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const LINK_PERP_METADATA: PerpProductMetadata = {
  name: 'LINK-PERP',
  symbol: 'LINK',
  icon: TOKEN_ICONS.link,
  marketName: 'LINK-PERP',
  marketDetails: LINK_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const DYDX_PERP_METADATA: PerpProductMetadata = {
  name: 'DYDX-PERP',
  symbol: 'DYDX',
  icon: TOKEN_ICONS.dydx,
  marketName: 'DYDX-PERP',
  marketDetails: DYDX_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const CRV_PERP_METADATA: PerpProductMetadata = {
  name: 'CRV-PERP',
  symbol: 'CRV',
  icon: TOKEN_ICONS.crv,
  marketName: 'CRV-PERP',
  marketDetails: CRV_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const TIA_PERP_METADATA: PerpProductMetadata = {
  name: 'TIA-PERP',
  symbol: 'TIA',
  icon: TOKEN_ICONS.tia,
  marketName: 'TIA-PERP',
  marketDetails: TIA_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const PYTH_PERP_METADATA: PerpProductMetadata = {
  name: 'PYTH-PERP',
  symbol: 'PYTH',
  icon: TOKEN_ICONS.pyth,
  marketName: 'PYTH-PERP',
  marketDetails: PYTH_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const JTO_PERP_METADATA: PerpProductMetadata = {
  name: 'JTO-PERP',
  symbol: 'JTO',
  icon: TOKEN_ICONS.jto,
  marketName: 'JTO-PERP',
  marketDetails: JTO_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const AVAX_PERP_METADATA: PerpProductMetadata = {
  name: 'AVAX-PERP',
  symbol: 'AVAX',
  icon: TOKEN_ICONS.avax,
  marketName: 'AVAX-PERP',
  marketDetails: AVAX_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const INJ_PERP_METADATA: PerpProductMetadata = {
  name: 'INJ-PERP',
  symbol: 'INJ',
  icon: TOKEN_ICONS.inj,
  marketName: 'INJ-PERP',
  marketDetails: INJ_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const SNX_PERP_METADATA: PerpProductMetadata = {
  name: 'SNX-PERP',
  symbol: 'SNX',
  icon: TOKEN_ICONS.snx,
  marketName: 'SNX-PERP',
  marketDetails: SNX_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ADA_PERP_METADATA: PerpProductMetadata = {
  name: 'ADA-PERP',
  symbol: 'ADA',
  icon: TOKEN_ICONS.ada,
  marketName: 'ADA-PERP',
  marketDetails: ADA_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const IMX_PERP_METADATA: PerpProductMetadata = {
  name: 'IMX-PERP',
  symbol: 'IMX',
  icon: TOKEN_ICONS.imx,
  marketName: 'IMX-PERP',
  marketDetails: IMX_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const MEME_PERP_METADATA: PerpProductMetadata = {
  name: 'MEME-PERP',
  symbol: 'MEME',
  icon: TOKEN_ICONS.meme,
  marketName: 'MEME-PERP',
  marketDetails: MEME_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const SEI_PERP_METADATA: PerpProductMetadata = {
  name: 'SEI-PERP',
  symbol: 'SEI',
  icon: TOKEN_ICONS.sei,
  marketName: 'SEI-PERP',
  marketDetails: SEI_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const STX_PERP_METADATA: PerpProductMetadata = {
  name: 'STX-PERP',
  symbol: 'STX',
  icon: TOKEN_ICONS.stx,
  marketName: 'STX-PERP',
  marketDetails: STX_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const NEAR_PERP_METADATA: PerpProductMetadata = {
  name: 'NEAR-PERP',
  symbol: 'NEAR',
  icon: TOKEN_ICONS.near,
  marketName: 'NEAR-PERP',
  marketDetails: NEAR_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const BLUR_PERP_METADATA: PerpProductMetadata = {
  name: 'BLUR-PERP',
  symbol: 'BLUR',
  icon: TOKEN_ICONS.blur,
  marketName: 'BLUR-PERP',
  marketDetails: BLUR_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const LDO_PERP_METADATA: PerpProductMetadata = {
  name: 'LDO-PERP',
  symbol: 'LDO',
  icon: TOKEN_ICONS.ldo,
  marketName: 'LDO-PERP',
  marketDetails: LDO_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const FIL_PERP_METADATA: PerpProductMetadata = {
  name: 'FIL-PERP',
  symbol: 'FIL',
  icon: TOKEN_ICONS.fil,
  marketName: 'FIL-PERP',
  marketDetails: FIL_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const WLD_PERP_METADATA: PerpProductMetadata = {
  name: 'WLD-PERP',
  symbol: 'WLD',
  icon: TOKEN_ICONS.wld,
  marketName: 'WLD-PERP',
  marketDetails: WLD_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ICP_PERP_METADATA: PerpProductMetadata = {
  name: 'ICP-PERP',
  symbol: 'ICP',
  icon: TOKEN_ICONS.icp,
  marketName: 'ICP-PERP',
  marketDetails: ICP_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const DOT_PERP_METADATA: PerpProductMetadata = {
  name: 'DOT-PERP',
  symbol: 'DOT',
  icon: TOKEN_ICONS.dot,
  marketName: 'DOT-PERP',
  marketDetails: DOT_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const TRX_PERP_METADATA: PerpProductMetadata = {
  name: 'TRX-PERP',
  symbol: 'TRX',
  icon: TOKEN_ICONS.trx,
  marketName: 'TRX-PERP',
  marketDetails: TRX_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const GALA_PERP_METADATA: PerpProductMetadata = {
  name: 'GALA-PERP',
  symbol: 'GALA',
  icon: TOKEN_ICONS.gala,
  marketName: 'GALA-PERP',
  marketDetails: GALA_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ATOM_PERP_METADATA: PerpProductMetadata = {
  name: 'ATOM-PERP',
  symbol: 'ATOM',
  icon: TOKEN_ICONS.atom,
  marketName: 'ATOM-PERP',
  marketDetails: ATOM_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const APE_PERP_METADATA: PerpProductMetadata = {
  name: 'APE-PERP',
  symbol: 'APE',
  icon: TOKEN_ICONS.ape,
  marketName: 'APE-PERP',
  marketDetails: APE_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const JUP_PERP_METADATA: PerpProductMetadata = {
  name: 'JUP-PERP',
  symbol: 'JUP',
  icon: TOKEN_ICONS.jup,
  marketName: 'JUP-PERP',
  marketDetails: JUP_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const GMCI30_PERP_METADATA: PerpProductMetadata = {
  name: 'GMCI30-PERP',
  symbol: 'GMCI30',
  icon: TOKEN_ICONS.gmci30,
  marketName: 'GMCI30-PERP',
  marketDetails: GM30_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const GMMEME_PERP_METADATA: PerpProductMetadata = {
  name: 'GMMEME-PERP',
  symbol: 'GMMEME',
  icon: TOKEN_ICONS.gmMeme,
  marketName: 'GMMEME-PERP',
  marketDetails: GMMEME_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const WIF_PERP_METADATA: PerpProductMetadata = {
  name: 'WIF-PERP',
  symbol: 'WIF',
  icon: TOKEN_ICONS.wif,
  marketName: 'WIF-PERP',
  marketDetails: WIF_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const MNT_PERP_METADATA: PerpProductMetadata = {
  name: 'MNT-PERP',
  symbol: 'MNT',
  icon: TOKEN_ICONS.mnt,
  marketName: 'MNT-PERP',
  marketDetails: MNT_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ENA_PERP_METADATA: PerpProductMetadata = {
  name: 'ENA-PERP',
  symbol: 'ENA',
  icon: TOKEN_ICONS.ena,
  marketName: 'ENA-PERP',
  marketDetails: ENA_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const FTM_PERP_METADATA: PerpProductMetadata = {
  name: 'FTM-PERP',
  symbol: 'FTM',
  icon: TOKEN_ICONS.ftm,
  marketName: 'FTM-PERP',
  marketDetails: FTM_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const TON_PERP_METADATA: PerpProductMetadata = {
  name: 'TON-PERP',
  symbol: 'TON',
  icon: TOKEN_ICONS.ton,
  marketName: 'TON-PERP',
  marketDetails: TON_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};

export const ONDO_PERP_METADATA: PerpProductMetadata = {
  name: 'ONDO-PERP',
  symbol: 'ONDO',
  icon: TOKEN_ICONS.ondo,
  marketName: 'ONDO-PERP',
  marketDetails: ONDO_PERP_MARKET_DETAILS,
  hasLpPool: false,
  quoteProductId: QUOTE_PRODUCT_ID,
};
