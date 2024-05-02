import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

import { COLORS } from './styles/colors';

const config: Config = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '375px',
      xs: '575px',
      sm: '834px',
      md: '1080px',
      lg: '1366px',
      xl: '1680px',
    },
    extend: {
      backdropBlur: {
        nav: '10.5px',
      },
      dropShadow: {
        heroShots: '0 -200px 200px rgba(0, 0, 0, 0.33)',
      },
      fontSize: {
        base: '1rem',
        '2xs': '.625rem',
        xs: '.75rem',
        sm: '.875rem',
        lg: '1.125rem',
        xl: '1.375rem',
        '2xl': '1.625rem',
        '3xl': '1.875rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
        '6xl': '3.125rem',
        '7xl': '3.75rem',
        '8xl': '4rem',
        '9xl': '5.75rem',
        '10xl': '6.25rem',
      },
      colors: COLORS,
      fontFamily: {
        dmSans: ['var(--font-dm-sans)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-pp-object-sans)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        // Gradients
        buttonGradient:
          'linear-gradient(89.16deg, #7D43E8 2.14%, #594DF8 100%)',
        grayGradient: 'linear-gradient(144.4deg, #1a191e 0%, #373044 50%)',
        pinkGradient: 'linear-gradient(294.4deg, #56376a 0%, #1a151a 120%)',
        purpleGradient: 'linear-gradient(294.4deg, #413278 0%, #1a151a 120%)',
        mainPurpleGradient: 'linear-gradient(90deg, #584DF8 0%, #7F42E7 100%)',
        gradientPill:
          'linear-gradient(90deg, rgba(88, 77, 248, 0.20) 0%, rgba(127, 66, 231, 0.20) 100%)',
        speedGradient: 'linear-gradient(90deg, #584DF8 0%, #7F42E7 100%)',
        headerTitleGradient:
          'linear-gradient(89.16deg, #7D43E8 2.14%, #594DF8 100%)',
        faqBorder:
          'linear-gradient(89.16deg, rgba(181, 113, 125, 0.216) 2.14%, rgba(125, 67, 232, 0.45) 42.41%, rgba(89, 77, 248, 0.45) 78.08%, rgba(89, 77, 248, 0.45) 100%)',

        // Images
        mobileLearnMore: "url('/img/mobile-learnmore-bg.png')",
        mobileInterface: "url('/img/mobile-interface-card-bg.png')",
        learnMore: "url('/img/desktop-learn-more.png')",
        interface1: "url('/img/interface-card-bg-1.svg')",
        interface2: "url('/img/interface-card-bg-2.svg')",
        interface3: "url('/img/interface-card-bg-3.svg')",
        interface4: "url('/img/interface-card-bg-4.svg')",
      },
    },
  },
};

export default config;
