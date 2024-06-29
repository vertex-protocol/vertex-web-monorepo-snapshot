import blastGoldIcon from 'client/assets/brand/blast-gold-icon.svg';
import blastIcon from 'client/assets/brand/blast-icon.svg';
import blitzBrandBg from 'client/assets/brand/blitz-brand-bg.png';
import blitzLogo from 'client/assets/brand/blitz-logo.svg';
import blitzMonochromeIcon from 'client/assets/brand/blitz-monochrome-icon.svg';
import vertexBrandBg from 'client/assets/brand/vertex-brand-bg.png';
import vertexLogo from 'client/assets/brand/vertex-logo.svg';
import vertexMonochromeIcon from 'client/assets/brand/vertex-monochrome-icon.svg';
import { clientEnv } from 'common/environment/clientEnv';
import blitzIcon from 'public/blitz-icon.svg';
import vertexIcon from 'public/vertex-icon.svg';

export const IMAGES = {
  vertex: {
    // Square black/white icon
    brandMonochromeIcon: vertexMonochromeIcon,
    // Square icon
    brandIcon: vertexIcon,
    // Full name logo
    brandLogo: vertexLogo,
    // Brand background image
    brandBg: vertexBrandBg,
  },
  blitz: {
    brandMonochromeIcon: blitzMonochromeIcon,
    brandIcon: blitzIcon,
    brandLogo: blitzLogo,
    brandBg: blitzBrandBg,
  },
}[clientEnv.base.brandName];

export const BLITZ_SPECIFIC_IMAGES = {
  blastIcon,
  blastGoldIcon,
  blitzBrandBg,
};
