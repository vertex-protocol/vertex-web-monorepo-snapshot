import blastGoldIcon from 'client/assets/brand/blast-gold-icon.svg';
import blastIcon from 'client/assets/brand/blast-icon.svg';
import blitzBrandBg from 'client/assets/brand/blitz-brand-bg.png';
import blitzLogo from 'client/assets/brand/blitz-logo.svg';
import vertexLogo from 'client/assets/brand/vertex-logo.svg';
import { clientEnv } from 'common/environment/clientEnv';
import blitzIcon from 'public/blitz-icon.svg';
import vertexIcon from 'public/vertex-icon.svg';

export const IMAGES = {
  vertex: {
    // Square icon
    brandIcon: vertexIcon,
    // Full name logo
    brandLogo: vertexLogo,
  },
  blitz: {
    brandIcon: blitzIcon,
    brandLogo: blitzLogo,
  },
}[clientEnv.base.brandName];

export const BLITZ_SPECIFIC_IMAGES = {
  blastIcon,
  blastGoldIcon,
  blitzBrandBg,
};
