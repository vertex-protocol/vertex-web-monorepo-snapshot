import {
  BLITZ_TAILWIND_CONFIG,
  VERTEX_TAILWIND_CONFIG,
} from '@vertex-protocol/web-ui/tailwind';
import { Config } from 'tailwindcss';

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import brandName from './common/environment/envBrandName';

const preset = {
  vertex: VERTEX_TAILWIND_CONFIG,
  blitz: BLITZ_TAILWIND_CONFIG,
}[brandName];

console.log(`Initializing TW Config for ${brandName}.`);

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './client/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/consts/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/utils/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      padding: {
        'mobile-bottom-sheet': '80px',
      },
      maxWidth: {
        'trade-sidebar': '320px',
      },
      width: {
        'market-orders': '260px',
        'trade-sidebar': '320px',
      },
      height: {
        navbar: '3.5rem',
        footer: '2rem',
        'desktop-navbar-item': '2.5rem',
        'trading-top-bar': '3rem',
      },
    },
  },
  presets: [preset],
};

export default config;
