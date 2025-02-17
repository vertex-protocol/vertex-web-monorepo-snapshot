import { Colors } from '../types';

export const VERTEX_COLORS = {
  background: {
    DEFAULT: '#0A0A0D',
  },
  surface: {
    card: '#16161D',
    1: '#1F1F29',
    2: '#272734',
    3: '#2B2B36',
  },
  stroke: {
    DEFAULT: '#1B1B22',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#D4D4D8',
    tertiary: '#9A9AA2',
  },
  disabled: {
    DEFAULT: '#424247',
  },
  accent: {
    DEFAULT: '#A39EFB',
  },
  positive: {
    DEFAULT: '#3DF57B',
    muted: '#1A2C26',
  },
  primary: {
    DEFAULT: '#8062F1',
  },
  negative: {
    DEFAULT: '#EA435C',
    muted: '#281A21',
  },
  warning: {
    DEFAULT: '#D1A816',
    muted: '#232015',
  },
  overlay: {
    divider: '#FFFFFF',
    accent: '#A39EFB',
    hover: '#FFFFFF',
    disabled: '#0D0D12',
  },
  'grad-slider': {
    start: '#1B1B22',
    mid: '#A39EFB',
    end: '#1B1B22',
  },
  'grad-overlay-dialog': {
    start: '#333342',
    end: '#1E1E28',
  },
  // Risk Bar
  risk: {
    low: '#00C287',
    medium: '#C7B653',
    high: '#E26D7E',
    extreme: '#CC113F',
  },
} satisfies Colors;
