import plugin from 'tailwindcss/plugin';

/**
 * TW plugin for common utilities.
 */
export const utilitiesPlugin = plugin(function utilitiesPlugin({
  addUtilities,
}) {
  addUtilities({
    // Hide scrollbar for Chrome, Safari and Opera
    '.no-scrollbar::-webkit-scrollbar': {
      '@apply hidden': {},
    },

    // Hide scrollbar for IE, Edge and Firefox
    '.no-scrollbar': {
      '-ms-overflow-style': 'none', // IE and Edge
      scrollbarWidth: 'none', // Firefox
    },

    // The following `scroll-shadow-*` plugins use `mask-image` to apply scroll shadows.
    // If you want to customize the size of the scroll shadow, add the css var
    // `--scroll-shadow-size` to either the scroll container or an ancestor.
    '.scroll-shadow-t': {
      maskImage: `linear-gradient(
        to top,
        black calc(100% - var(--scroll-shadow-size, 30px)),
        transparent 100%
      )`,
    },

    '.scroll-shadow-b': {
      maskImage: `linear-gradient(
        to bottom,
        black calc(100% - var(--scroll-shadow-size, 30px)),
        transparent 100%
      )`,
    },

    '.scroll-shadow-y': {
      maskImage: `linear-gradient(
        to bottom,
        transparent,
        black var(--scroll-shadow-size, 30px),
        black calc(100% - var(--scroll-shadow-size, 30px)),
        transparent
      )`,
    },

    '.scroll-shadow-l': {
      maskImage: `linear-gradient(
        to left,
        black calc(100% - var(--scroll-shadow-size, 30px)),
        transparent 100%
      )`,
    },

    '.scroll-shadow-r': {
      maskImage: `linear-gradient(
        to right,
        black calc(100% - var(--scroll-shadow-size, 30px)),
        transparent 100%
      )`,
    },

    '.scroll-shadow-x': {
      maskImage: `linear-gradient(
        to right,
        transparent,
        black var(--scroll-shadow-size, 30px),
        black calc(100% - var(--scroll-shadow-size, 30px)),
        transparent
      )`,
    },
  });
});
