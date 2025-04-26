/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './client/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/consts/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/utils/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'radio-grotesk': ['var(--font-radio-grotesk)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        card: '#151317',
        'card-alt': '#151317',
        darkest: '#040505',
        dark: '#0B0B0C',
        tooltip: '#1E1C21',
        'dark-10': 'rgba(32, 29, 36, 0.10)',
        'dark-20': 'rgba(32, 29, 36, 0.20)',
        'light-03': 'rgba(245, 236, 255, 0.03)',
        'body-white': '#FEFEFE',
        white: '#FFFFFF',
        'body-gray': '#9B9A9B',
        'body-dark-gray': 'rgba(131, 127, 137, 0.70)',
        'transparency-white-5': 'rgba(255, 255, 255, 0.05)',
        'transparency-white-10': 'rgba(255, 255, 255, 0.10)',
        'header-linear': {
          DEFAULT: '#DED8E7',
          100: '#FFFFFF',
          60: '#DED8E7',
        },
        red: '#EA435C',
        green: '#4DE587',
      },
      fontSize: {
        'header-0': ['64px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'header-1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'header-2': ['42px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'header-3': ['32px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'header-4': ['24px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'body-16': ['16px', { lineHeight: '1.4', letterSpacing: '-0.1px' }],
        'body-14': ['14px', { lineHeight: '1.4', letterSpacing: '-0.1px' }],
        'body-13': ['13px', { lineHeight: '1.4', letterSpacing: '-0.2px' }],
        'body-12': ['12px', { lineHeight: '1.4', letterSpacing: '-0.1px' }],
        'body-9': ['9px', { lineHeight: '1', letterSpacing: '-0.1px' }],
      },
      backgroundImage: {
        'header-linear':
          'linear-gradient(90deg, rgba(222, 216, 231, 0.96) 0%, #FFF 54.97%, rgba(222, 216, 231, 0.60) 107.78%)',
        'text-gradient':
          'linear-gradient(90deg, rgba(222, 216, 231, 0.99) 0%, #DED8E7 43.62%, rgba(222, 216, 231, 0.50) 142.52%)',
        'button-gradient':
          'linear-gradient(172deg, rgba(94, 94, 94, 0.7) 25.7%, rgba(34, 34, 36, 0.7) 59.2%)',
        'card-gradient':
          'linear-gradient(90deg, #19171C 11.27%, #0C0C0D 115.64%)',
        'chain-gradient':
          'linear-gradient(272deg, #1E1D22 -113.07%, #111113 75.93%);',
        'table-gradient':
          'linear-gradient(164deg, #19171C -31.85%, #0C0C0D 72.16%);',
      },
      borderColor: {
        'new-website-overlay-8': 'rgba(222, 216, 231, 0.08)',
        table: '#1B1B22',
        glass: 'rgba(59,59,59,0.25)',
        button: '#1e1e1f',
      },
      borderRadius: {
        header: '10px 10px 0 0',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        glass: '0px 4px 10px 0px rgba(0, 0, 0, 0.20)',
        button:
          '0px -2px 7px 0px rgba(114, 116, 120, 0.25), 0px 2px 5px 0px rgba(0, 0, 0, 0.90)',
        table:
          '-172px 102px 56px 0px rgba(0, 0, 0, 0.01), -110px 65px 51px 0px rgba(0, 0, 0, 0.09), -62px 37px 43px 0px rgba(0, 0, 0, 0.32), -28px 16px 32px 0px rgba(0, 0, 0, 0.54), -7px 4px 18px 0px rgba(0, 0, 0, 0.62)',
        icon: '-3px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        gradient: 'gradient 3s linear infinite',
        'gradient-6s': 'gradient-6s 6s linear infinite',
      },
      keyframes: {
        gradient: {
          to: { 'background-position': '-200% center' },
        },
        'gradient-6s': {
          to: { 'background-position': '-400% center' },
        },
      },
    },
  },
};
