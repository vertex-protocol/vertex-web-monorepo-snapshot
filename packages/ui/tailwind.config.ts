import { Config } from 'tailwindcss';
import { BLITZ_TAILWIND_CONFIG, VERTEX_TAILWIND_CONFIG } from './tailwind';

// This is here for editor support
const config: Config = {
  content: [],
  presets: [VERTEX_TAILWIND_CONFIG, BLITZ_TAILWIND_CONFIG],
};

export default config;
