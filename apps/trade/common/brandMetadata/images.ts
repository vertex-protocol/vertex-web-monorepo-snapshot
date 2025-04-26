import blastGoldIcon from 'client/assets/brand/blast-gold-icon.svg';
import blastIcon from 'client/assets/brand/blast-icon.svg';
import blastLogo from 'client/assets/brand/blast-logo.svg';
import blitzBrandBg from 'client/assets/brand/blitz-brand-bg.png';
import blitzBrandIcon from 'client/assets/brand/blitz-brand-icon.svg';
import blitzLogo from 'client/assets/brand/blitz-logo.svg';
import blitzMonochromeIcon from 'client/assets/brand/blitz-monochrome-icon.svg';
import vertexBrandBg from 'client/assets/brand/vertex-brand-bg.webp';
import vertexBrandIcon from 'client/assets/brand/vertex-brand-icon.svg';
import vertexLogo from 'client/assets/brand/vertex-logo.svg';
import vertexMonochromeIcon from 'client/assets/brand/vertex-monochrome-icon.svg';
import vertex3dLogo from 'client/assets/brand/vertex-3d-logo.png';
import axelarLogo from 'client/assets/partners/axelar-logo.svg';
import elixirLogo from 'client/assets/partners/elixir-logo.svg';
import skateLogo from 'client/assets/partners/skatefi-logo.svg';
import squidLogo from 'client/assets/partners/squid-logo.svg';
import vlpSquareIcon from 'client/assets/vlp/vlp-square-icon.svg';
import { clientEnv } from 'common/environment/clientEnv';

const BRAND_IMAGES = {
  vertex: {
    // Square black/white icon
    brandMonochromeIcon: vertexMonochromeIcon,
    // Square icon
    brandIcon: vertexBrandIcon,
    // Full name logo
    brandLogo: vertexLogo,
    // Brand background image
    brandBg: vertexBrandBg,
  },
  blitz: {
    brandMonochromeIcon: blitzMonochromeIcon,
    brandIcon: blitzBrandIcon,
    brandLogo: blitzLogo,
    brandBg: blitzBrandBg,
  },
}[clientEnv.base.brandName];

const PARTNERS_IMAGES = {
  partners: {
    skate: skateLogo,
    elixir: elixirLogo,
    axelar: axelarLogo,
    squid: squidLogo,
  },
};

export const IMAGES = {
  ...BRAND_IMAGES,
  ...PARTNERS_IMAGES,
};

export const BLITZ_SPECIFIC_IMAGES = {
  blastIcon,
  blastGoldIcon,
  blastLogo,
  blitzBrandBg,
};

export const VERTEX_SPECIFIC_IMAGES = {
  vlpSquareIcon,
  vertex3dLogo,
};
