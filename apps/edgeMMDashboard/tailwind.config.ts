import { VERTEX_TAILWIND_CONFIG } from '@vertex-protocol/web-ui/tailwind';
import { Config } from 'tailwindcss';

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
  presets: [VERTEX_TAILWIND_CONFIG],
};

export default config;
