import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Config } from 'tailwindcss';

export interface BoxShadows {
  elevation: string;
  'elevation-nav-dropdown': string;
  'elevation-risk-bar': string;
  'elevation-referrals-bar': string;
}

export interface Colors {
  background: {
    DEFAULT: string;
  };
  surface: {
    card: string;
    1: string;
    2: string;
    3: string;
  };
  stroke: {
    DEFAULT: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  disabled: {
    DEFAULT: string;
  };
  accent: {
    DEFAULT: string;
    // Extra properties currently used by Blitz
    [key: string]: string;
  };
  positive: {
    DEFAULT: string;
    muted: string;
  };
  primary: {
    DEFAULT: string;
  };
  negative: {
    DEFAULT: string;
    muted: string;
  };
  warning: {
    DEFAULT: string;
    muted: string;
  };
  overlay: {
    divider: string;
    accent: string;
    hover: string;
    disabled: string;
  };
  'grad-slider': {
    start: string;
    mid: string;
    end: string;
  };
  'grad-overlay-dialog': {
    start: string;
    end: string;
  };
  risk: {
    low: string;
    medium: string;
    high: string;
    extreme: string;
  };
}

export interface Fonts {
  title: NextFontWithVariable;
  default: NextFontWithVariable;
}

export type TailwindPreset = Omit<Config, 'content'>;
